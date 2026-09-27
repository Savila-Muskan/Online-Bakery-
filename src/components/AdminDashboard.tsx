import React, { useState, useRef } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Sparkles, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Printer, 
  MessageCircle, 
  Search,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  Truck,
  ChefHat,
  Home,
  PackageCheck,
  ShieldCheck,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ArrowLeft,
  Lock,
  Unlock,
  AlertCircle,
  Filter,
  Eye,
  RefreshCw,
  Upload,
  Camera,
  Check,
  Layers,
  Tag,
  Copy,
  FileText,
  X,
  Download,
  FileDown,
  Loader2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useShop } from '../context/ShopContext';
import { Product, CakeCategory, OrderStatus, CustomCakeRequest, Order, GalleryItem } from '../types';
import { STANDARD_SIZES, STANDARD_FLAVORS, CHOCOLATE_CAKE_IMAGE, HERO_IMAGE } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    orders,
    updateOrderStatus,
    customRequests,
    updateCustomRequestStatus,
    navigateTo,
    galleryItems,
    addGalleryPhoto,
    deleteGalleryPhoto,
    setCakeImageFromGallery
  } = useShop();

  // Authentication state for /admin
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('cakeshop_admin_auth') === 'true';
  });
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tabs: 'orders' | 'gallery' | 'products' | 'custom' | 'analytics'
  const [activeTab, setActiveTab] = useState<'orders' | 'gallery' | 'products' | 'custom' | 'analytics'>('orders');

  // Order filters and search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [selectedOrderForRider, setSelectedOrderForRider] = useState<Order | null>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [isGeneratingSlip, setIsGeneratingSlip] = useState(false);
  const [riderForm, setRiderForm] = useState({
    name: '',
    phone: '',
    vehicle: ''
  });

  // Gallery state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Birthday Cakes');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [galleryFilter, setGalleryFilter] = useState('All');

  // "Set as Cake Picture" Modal state
  const [selectedPhotoForCake, setSelectedPhotoForCake] = useState<GalleryItem | null>(null);
  const [targetCakeId, setTargetCakeId] = useState<string>('');

  // Gallery picker for Product Edit form
  const [galleryPickerForProduct, setGalleryPickerForProduct] = useState(false);

  // Success Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Product Edit / Create state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Birthday Cakes' as CakeCategory,
    shortDescription: '',
    fullDescription: '',
    basePrice: 4000,
    originalPrice: 4500,
    discountPercentage: 10,
    imageUrl: CHOCOLATE_CAKE_IMAGE,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true
  });

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPin === 'admin123' || adminPin === 'admin' || adminPin === '1234' || adminPin === '') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cakeshop_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cakeshop_admin_auth');
  };

  // Analytics Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const bakingOrdersCount = orders.filter(o => o.status === 'Baking').length;
  const outForDeliveryCount = orders.filter(o => o.status === 'Out for Delivery').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    const matchesFilter = orderStatusFilter === 'All' || o.status === orderStatusFilter;
    const q = orderSearchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      o.orderNumber.toLowerCase().includes(q) ||
      o.customer.fullName.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.customer.city.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const stages: { label: OrderStatus; icon: any }[] = [
    { label: 'Order Placed', icon: Clock },
    { label: 'Order Confirmed', icon: CheckCircle2 },
    { label: 'Baking', icon: ChefHat },
    { label: 'Ready for Delivery', icon: PackageCheck },
    { label: 'Out for Delivery', icon: Truck },
    { label: 'Delivered', icon: Home }
  ];

  // Gallery file upload handler
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setPhotoUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = photoPreview || photoUrl;
    if (!finalUrl) return;

    addGalleryPhoto({
      url: finalUrl,
      title: photoTitle || 'Fresh Artisanal Cake',
      caption: photoCaption || 'Freshly baked creation from our kitchen atelier.',
      category: photoCategory
    });

    showToast('Photo added to Gallery! It is now live on the website.');
    setUploadModalOpen(false);
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
    setPhotoPreview('');
  };

  const handleApplyPhotoToCake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhotoForCake || !targetCakeId) return;

    const targetProduct = products.find(p => p.id === targetCakeId);
    setCakeImageFromGallery(targetCakeId, selectedPhotoForCake.url);

    showToast(`Picture for "${targetProduct?.name || 'Cake'}" updated successfully!`);
    setSelectedPhotoForCake(null);
    setTargetCakeId('');
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Birthday Cakes',
      shortDescription: '',
      fullDescription: '',
      basePrice: 4200,
      originalPrice: 4800,
      discountPercentage: 12,
      imageUrl: CHOCOLATE_CAKE_IMAGE,
      isBestseller: false,
      isNewArrival: true,
      isEgglessAvailable: true
    });
    setIsEditingProduct(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      shortDescription: prod.shortDescription,
      fullDescription: prod.fullDescription,
      basePrice: prod.basePrice,
      originalPrice: prod.originalPrice || prod.basePrice,
      discountPercentage: prod.discountPercentage || 0,
      imageUrl: prod.images[0] || CHOCOLATE_CAKE_IMAGE,
      isBestseller: !!prod.isBestseller,
      isNewArrival: !!prod.isNewArrival,
      isEgglessAvailable: prod.isEgglessAvailable
    });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: productForm.name,
        category: productForm.category,
        shortDescription: productForm.shortDescription,
        fullDescription: productForm.fullDescription,
        basePrice: Number(productForm.basePrice),
        originalPrice: Number(productForm.originalPrice),
        discountPercentage: Number(productForm.discountPercentage),
        images: [productForm.imageUrl, HERO_IMAGE],
        isBestseller: productForm.isBestseller,
        isNewArrival: productForm.isNewArrival,
        isEgglessAvailable: productForm.isEgglessAvailable
      });
      showToast(`Updated "${productForm.name}" details!`);
    } else {
      addProduct({
        name: productForm.name,
        slug: productForm.name.toLowerCase().replace(/\s+/g, '-'),
        category: productForm.category,
        shortDescription: productForm.shortDescription,
        fullDescription: productForm.fullDescription,
        basePrice: Number(productForm.basePrice),
        originalPrice: Number(productForm.originalPrice),
        discountPercentage: Number(productForm.discountPercentage),
        images: [productForm.imageUrl, HERO_IMAGE],
        rating: 5.0,
        reviewCount: 1,
        isBestseller: productForm.isBestseller,
        isNewArrival: productForm.isNewArrival,
        isEgglessAvailable: productForm.isEgglessAvailable,
        preparationTime: 'Same Day (4 Hours Lead Time)',
        availableSizes: STANDARD_SIZES,
        availableFlavors: STANDARD_FLAVORS,
        ingredients: ['Imported Callebaut Chocolate', 'Fresh Dairy Cream', 'Bourbon Vanilla']
      });
      showToast(`Added new cake "${productForm.name}"!`);
    }

    setIsEditingProduct(false);
  };

  const handleSaveRider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForRider) return;
    updateOrderStatus(selectedOrderForRider.id, selectedOrderForRider.status, {
      name: riderForm.name,
      phone: riderForm.phone,
      vehicle: riderForm.vehicle
    });
    showToast(`Rider assigned to Order #${selectedOrderForRider.orderNumber}`);
    setSelectedOrderForRider(null);
  };

  // High-precision native HTML5 Canvas receipt generator (Zero CSS parsing errors, 100% reliable)
  const createSlipCanvas = (order: Order): HTMLCanvasElement => {
    const width = 760;
    const itemsHeight = order.items.reduce((acc, it) => {
      let h = 56;
      if (it.cakeMessage) h += 22;
      if (it.selectedAddOns && it.selectedAddOns.length > 0) h += 20;
      return acc + h;
    }, 0);

    const height = 680 + itemsHeight;
    const scale = 2; // High-res 2x retina sharpness

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');

    ctx.scale(scale, scale);

    // Clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Outer decorative border
    ctx.strokeStyle = '#FAD4DB';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    // Inner crisp frame
    ctx.strokeStyle = '#241F1E';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    let y = 52;

    // Header Logo & Branding
    ctx.fillStyle = '#FF4B72';
    ctx.beginPath();
    ctx.arc(width / 2 - 90, y - 5, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('C', width / 2 - 90, y + 1);

    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 26px Georgia, serif';
    ctx.fillText('CakeShop', width / 2 + 10, y);

    y += 24;
    ctx.fillStyle = '#7A6D72';
    ctx.font = 'italic 12px sans-serif';
    ctx.fillText('Artisanal Bakery & Fresh Cake Confectionery', width / 2, y);

    y += 18;
    ctx.font = '11px sans-serif';
    ctx.fillText('UAN Hotline: +92 349 3438060 • savilamuskan26@gmail.com • Pakistan', width / 2, y);

    y += 22;
    // Official Dispatch Slip Badge
    ctx.fillStyle = '#241F1E';
    const badgeW = 310;
    ctx.fillRect((width - badgeW) / 2, y - 16, badgeW, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('OFFICIAL KITCHEN & DELIVERY DISPATCH SLIP', width / 2, y);

    y += 20;
    // Dashed separator
    ctx.strokeStyle = '#FAD4DB';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(width - 35, y);
    ctx.stroke();
    ctx.setLineDash([]);

    y += 20;
    // Two boxes: Order info (left) & Customer info (right)
    const boxW = (width - 70 - 16) / 2;
    const boxH = 135;

    // Left Box - Order Meta
    ctx.fillStyle = '#FFF9FA';
    ctx.fillRect(35, y, boxW, boxH);
    ctx.strokeStyle = '#FAD4DB';
    ctx.strokeRect(35, y, boxW, boxH);

    ctx.fillStyle = '#FF4B72';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ORDER IDENTIFICATION', 45, y + 20);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Order #:', 45, y + 46);
    ctx.fillStyle = '#FF4B72';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(order.orderNumber, 125, y + 46);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Order Date:', 45, y + 72);
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 12px sans-serif';
    const orderDateStr = new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
    ctx.fillText(orderDateStr, 125, y + 72);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Kitchen Status:', 45, y + 98);
    // Status pill
    ctx.fillStyle = '#FF4B72';
    ctx.fillRect(135, y + 84, 115, 20);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(order.status, 192, y + 98);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Payment:', 45, y + 122);
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`${order.paymentMethod} (${order.paymentStatus})`, 125, y + 122);

    // Right Box - Customer Meta
    const rightX = 35 + boxW + 16;
    ctx.fillStyle = '#FFF9FA';
    ctx.fillRect(rightX, y, boxW, boxH);
    ctx.strokeStyle = '#FAD4DB';
    ctx.strokeRect(rightX, y, boxW, boxH);

    ctx.fillStyle = '#FF4B72';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('CUSTOMER & DELIVERY SCHEDULE', rightX + 12, y + 20);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Recipient:', rightX + 12, y + 46);
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(order.customer.fullName, rightX + 85, y + 46);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Contact:', rightX + 12, y + 72);
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(order.customer.phone, rightX + 85, y + 72);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Delivery:', rightX + 12, y + 98);
    ctx.fillStyle = '#E03A60';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`${order.customer.deliveryDate} (${order.customer.deliveryTimeSlot})`, rightX + 85, y + 98);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Destination:', rightX + 12, y + 122);
    ctx.fillStyle = '#241F1E';
    ctx.font = '11px sans-serif';
    const destText = `${order.customer.deliveryAddress}, ${order.customer.city}`;
    ctx.fillText(destText.length > 38 ? destText.substring(0, 38) + '...' : destText, rightX + 85, y + 122);

    y += boxH + 16;

    // Rider Banner
    ctx.fillStyle = '#FFF5F7';
    ctx.fillRect(35, y, width - 70, 40);
    ctx.strokeStyle = '#FAD4DB';
    ctx.strokeRect(35, y, width - 70, 40);

    ctx.fillStyle = '#FF4B72';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('ASSIGNED DISPATCH RIDER:', 46, y + 17);
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(order.riderDetails?.name || 'In-House Cake Courier', 210, y + 17);

    ctx.fillStyle = '#7A6D72';
    ctx.font = '11px sans-serif';
    ctx.fillText(`Phone: ${order.riderDetails?.phone || '+92 349 3438060'}   •   Vehicle: ${order.riderDetails?.vehicle || 'Refrigerated Cake Van'}`, 46, y + 33);

    y += 54;

    // Items Table Header
    ctx.fillStyle = '#FFF0F3';
    ctx.fillRect(35, y, width - 70, 28);
    ctx.strokeStyle = '#FAD4DB';
    ctx.strokeRect(35, y, width - 70, 28);

    ctx.fillStyle = '#52454A';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('#', 46, y + 18);
    ctx.fillText('CAKE SELECTION & CUSTOM SPECIFICATIONS', 80, y + 18);
    ctx.textAlign = 'center';
    ctx.fillText('QTY', width - 150, y + 18);
    ctx.textAlign = 'right';
    ctx.fillText('AMOUNT (PKR)', width - 50, y + 18);
    ctx.textAlign = 'left';

    y += 28;

    // Items Rows
    order.items.forEach((item, index) => {
      let rowH = 52;
      if (item.cakeMessage) rowH += 20;
      if (item.selectedAddOns && item.selectedAddOns.length > 0) rowH += 18;

      ctx.fillStyle = index % 2 === 0 ? '#FFFFFF' : '#FFFCFD';
      ctx.fillRect(35, y, width - 70, rowH);
      ctx.strokeStyle = '#FAD4DB';
      ctx.strokeRect(35, y, width - 70, rowH);

      ctx.fillStyle = '#7A6D72';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${index + 1}`, 46, y + 20);

      ctx.fillStyle = '#241F1E';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(item.product.name, 80, y + 20);

      ctx.fillStyle = '#7A6D72';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${item.selectedSize.name} · ${item.selectedFlavor.name} ${item.isEggless ? '· (Eggless)' : ''}`, 80, y + 36);

      let curY = y + 36;
      if (item.cakeMessage) {
        curY += 18;
        ctx.fillStyle = '#FF4B72';
        ctx.font = 'italic 11px sans-serif';
        ctx.fillText(`🎂 Inscription: "${item.cakeMessage}"`, 80, curY);
      }

      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        curY += 16;
        ctx.fillStyle = '#7A6D72';
        ctx.font = '10px sans-serif';
        ctx.fillText(`+ Add-ons: ${item.selectedAddOns.map(a => a.name).join(', ')}`, 80, curY);
      }

      ctx.textAlign = 'center';
      ctx.fillStyle = '#241F1E';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`${item.quantity}`, width - 150, y + 26);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FF4B72';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`₨ ${item.totalPrice.toLocaleString()}`, width - 50, y + 26);
      ctx.textAlign = 'left';

      y += rowH;
    });

    y += 16;

    // Totals Section
    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Items Subtotal:', width - 320, y);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`₨ ${order.subtotal.toLocaleString()}`, width - 50, y);
    ctx.textAlign = 'left';

    y += 22;
    ctx.fillStyle = '#7A6D72';
    ctx.font = '12px sans-serif';
    ctx.fillText('Standard Chilled Delivery:', width - 320, y);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(order.deliveryFee === 0 ? 'Free Shipping' : `₨ ${order.deliveryFee.toLocaleString()}`, width - 50, y);
    ctx.textAlign = 'left';

    y += 10;
    ctx.strokeStyle = '#241F1E';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width - 320, y);
    ctx.lineTo(width - 45, y);
    ctx.stroke();

    y += 24;
    ctx.fillStyle = '#241F1E';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.fillText('Grand Total to Collect / Paid:', width - 320, y);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#FF4B72';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`₨ ${order.total.toLocaleString()}`, width - 50, y);
    ctx.textAlign = 'left';

    y += 26;

    // Freshness & Courier Guidelines Box
    ctx.fillStyle = '#FFFBE6';
    ctx.fillRect(35, y, width - 70, 36);
    ctx.strokeStyle = '#FFE58F';
    ctx.lineWidth = 1;
    ctx.strokeRect(35, y, width - 70, 36);

    ctx.fillStyle = '#8C6B00';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('⚠️ Baker & Rider Freshness Instructions:', 46, y + 15);
    ctx.font = '11px sans-serif';
    ctx.fillText('Keep horizontal during transit. Must remain chilled below 4°C. Best consumed within 48 hours.', 46, y + 30);

    y += 50;

    // Footer
    ctx.strokeStyle = '#FAD4DB';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(width - 35, y);
    ctx.stroke();

    y += 18;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7A6D72';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Baked with passion & love at CakeShop Pakistan', width / 2, y);

    y += 15;
    ctx.font = '10px sans-serif';
    const printTimeStr = new Date().toLocaleString('en-PK');
    ctx.fillText(`Generated for kitchen fulfillment on ${printTimeStr} • www.cakeshop.pk`, width / 2, y);

    return canvas;
  };

  // Download slip as High-Resolution Picture (PNG)
  const downloadSlipAsImage = async (order: Order) => {
    try {
      setIsGeneratingSlip(true);
      showToast(`Generating picture for Order #${order.orderNumber}...`);
      
      const canvas = createSlipCanvas(order);
      const dataUrl = canvas.toDataURL('image/png');
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `CakeShop_Slip_${order.orderNumber}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      showToast(`✅ Picture downloaded: CakeShop_Slip_${order.orderNumber}.png`);
    } catch (err) {
      console.error('Error generating image:', err);
      showToast('Could not generate picture. Please try again.');
    } finally {
      setIsGeneratingSlip(false);
    }
  };

  // Download slip as Official Document (PDF)
  const downloadSlipAsPdf = async (order: Order) => {
    try {
      setIsGeneratingSlip(true);
      showToast(`Converting slip to PDF for Order #${order.orderNumber}...`);
      
      const canvas = createSlipCanvas(order);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = 210;
      const margin = 10;
      const imgWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, Math.min(imgHeight, 277));
      pdf.save(`CakeShop_Slip_${order.orderNumber}.pdf`);

      showToast(`✅ PDF downloaded: CakeShop_Slip_${order.orderNumber}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      showToast('Could not generate PDF. Please try again.');
    } finally {
      setIsGeneratingSlip(false);
    }
  };

  // Full Print Slip: generates PDF, downloads Picture, and attempts print dialog
  const executePrintSlip = async (order: Order) => {
    try {
      setIsGeneratingSlip(true);
      showToast(`Processing print slip & PDF for Order #${order.orderNumber}...`);
      
      const canvas = createSlipCanvas(order);
      const imgData = canvas.toDataURL('image/png');

      // 1. Save PDF file
      try {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        const pageWidth = 210;
        const margin = 10;
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, Math.min(imgHeight, 277));
        pdf.save(`CakeShop_Slip_${order.orderNumber}.pdf`);
      } catch (e) {
        console.warn('PDF save error:', e);
      }

      // 2. Save Picture PNG
      try {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = `CakeShop_Slip_${order.orderNumber}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (e) {
        console.warn('Image download error:', e);
      }

      // 3. Try to trigger printer dialog via popup window with image
      try {
        const printWin = window.open('', '_blank');
        if (printWin) {
          printWin.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Print Slip - ${order.orderNumber}</title>
                <style>
                  @page { size: auto; margin: 10mm; }
                  body { margin: 0; padding: 20px; display: flex; justify-content: center; background: #fff; }
                  img { max-width: 100%; height: auto; }
                </style>
              </head>
              <body>
                <img src="${imgData}" onload="setTimeout(function(){ window.focus(); window.print(); }, 250);" />
              </body>
            </html>
          `);
          printWin.document.close();
        }
      } catch {
        // Fallback already satisfied by PDF & PNG downloads
      }

      showToast(`✅ Slip converted to PDF & Picture successfully!`);
    } catch (err) {
      console.error('Print execution error:', err);
      showToast('Error processing slip.');
    } finally {
      setIsGeneratingSlip(false);
    }
  };

  const handleCopySlipDetails = (order: Order) => {
    const text = `🍰 *CAKESHOP KITCHEN & DELIVERY SLIP*
Order #: ${order.orderNumber}
Status: ${order.status}
Customer: ${order.customer.fullName}
Phone: ${order.customer.phone}
Address: ${order.customer.deliveryAddress}, ${order.customer.city} ${order.customer.landmark ? `(Near: ${order.customer.landmark})` : ''}
Delivery: ${order.customer.deliveryDate} (${order.customer.deliveryTimeSlot})
Payment: ${order.paymentMethod} - ${order.paymentStatus}
Rider: ${order.riderDetails?.name || 'Not assigned'} (${order.riderDetails?.phone || 'N/A'})

*ITEMS ORDERED:*
${order.items.map((it, i) => `${i + 1}. ${it.quantity}x ${it.product.name} [${it.selectedSize.name}, ${it.selectedFlavor.name}]${it.cakeMessage ? ` (Message: "${it.cakeMessage}")` : ''} - ₨ ${it.totalPrice.toLocaleString()}`).join('\n')}

*TOTAL AMOUNT:* ₨ ${order.total.toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    showToast('Order slip details copied to clipboard!');
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  // If not authenticated, show password gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#FAD4DB] p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] border border-[#FAD4DB] flex items-center justify-center mx-auto text-[#FF4B72]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#241F1E]">
              CakeShop Admin Portal
            </h1>
            <p className="text-xs text-[#7A6D72]">
              Enter your manager credentials to manage kitchen dispatch, photo gallery & cake prices.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#52454A] block mb-1">
                Admin Password / PIN
              </label>
              <input
                type="password"
                placeholder="Default: admin123"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full text-sm p-3 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4B72]"
              />
              {authError && (
                <p className="text-xs text-rose-600 mt-1 font-medium">
                  Invalid PIN. Try "admin123" or click the demo button below.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF4B72]/20 cursor-pointer"
            >
              Sign In to Admin Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-[#FAD4DB] flex flex-col gap-2">
            <button
              onClick={() => {
                setAdminPin('admin123');
                setIsAuthenticated(true);
                sessionStorage.setItem('cakeshop_admin_auth', 'true');
              }}
              className="w-full py-2.5 bg-[#FFF0F3] hover:bg-[#FFE3E9] text-[#FF4B72] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" />
              <span>One-Click Quick Access (Demo)</span>
            </button>

            <button
              onClick={() => navigateTo('/')}
              className="w-full py-2 text-[#7A6D72] hover:text-[#241F1E] text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Back to Customer Website</span>
            </button>
          </div>

          {/* Admin Direct Hotline */}
          <div className="p-3 bg-[#FFF5F7] border border-[#FAD4DB] rounded-2xl text-center space-y-2">
            <p className="text-[11px] font-bold text-[#FF4B72] uppercase tracking-wider">Direct Admin & Support Helpline</p>
            <div className="flex items-center justify-center gap-3 text-xs font-bold text-[#241F1E]">
              <a href="tel:+923493438060" className="hover:text-[#FF4B72] flex items-center gap-1 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#FF4B72]" />
                +92 349 3438060
              </a>
              <span className="text-[#FAD4DB]">•</span>
              <a href="https://wa.me/923493438060" target="_blank" rel="noopener noreferrer" className="text-[#128C7E] hover:underline flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
            <p className="text-[10px] text-[#7A6D72]">
              <a href="mailto:savilamuskan26@gmail.com" className="hover:underline hover:text-[#FF4B72]">
                savilamuskan26@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filtered gallery items
  const filteredGallery = galleryFilter === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === galleryFilter);

  return (
    <div className="min-h-screen bg-[#FDF9FA] text-[#241F1E] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#241F1E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-2.5 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#FF4B72]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#241F1E] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF4B72] flex items-center justify-center text-white shadow-sm font-serif font-bold text-lg">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight">CakeShop</span>
                <span className="bg-[#FF4B72] text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                  Admin Dispatch
                </span>
              </div>
              <p className="text-[10px] text-stone-400">Order Tracking & Gallery Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View store link */}
            <button
              onClick={() => navigateTo('/')}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Go to customer shop"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Customer Website (/)</span>
              <span className="sm:hidden">Store</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 text-stone-300 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Log out from admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Manager & Admin Direct Helpline Strip */}
        <div className="bg-[#FFF0F3] border-t border-b border-[#FAD4DB] px-4 py-2 text-stone-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-bold text-[#FF4B72] uppercase tracking-wider text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#FAD4DB]">
                Admin & Hotline
              </span>
              <span className="text-[#241F1E] font-bold text-xs flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#FF4B72]" />
                +92 349 3438060
              </span>
              <span className="text-[#FAD4DB] hidden sm:inline">•</span>
              <span className="text-[#52454A] font-medium text-xs flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#FF4B72]" />
                savilamuskan26@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:+923493438060"
                className="px-2.5 py-1 bg-white hover:bg-[#FFE3E9] text-[#FF4B72] border border-[#FAD4DB] rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
              >
                <Phone className="w-3 h-3" />
                Call Direct
              </a>
              <a
                href="https://wa.me/923493438060?text=Hello%20CakeShop%20Admin,%20I%20have%20an%20urgent%20inquiry%20regarding%20orders."
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </a>
              <a
                href="mailto:savilamuskan26@gmail.com"
                className="px-2.5 py-1 bg-white hover:bg-stone-50 text-[#52454A] border border-[#FAD4DB] rounded-lg font-medium text-[11px] flex items-center gap-1 transition-colors"
              >
                <Mail className="w-3 h-3 text-[#FF4B72]" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#1C1819] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto scrollbar-none">
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#FF4B72] text-[#FF4B72] bg-white/5'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Live Order Tracking ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'gallery'
                  ? 'border-[#FF4B72] text-[#FF4B72] bg-white/5'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Cake Photo Gallery ({galleryItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'border-[#FF4B72] text-[#FF4B72] bg-white/5'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products & Prices ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'custom'
                  ? 'border-[#FF4B72] text-[#FF4B72] bg-white/5'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Custom Inquiries ({customRequests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'analytics'
                  ? 'border-[#FF4B72] text-[#FF4B72] bg-white/5'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Revenue & Analytics</span>
            </button>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Verified Store Contact & Dispatch Profile */}
        <div className="bg-gradient-to-r from-[#FFF5F7] via-white to-[#FFF9FA] border border-[#FAD4DB] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4B72] text-white flex items-center justify-center font-serif font-bold text-xl shadow-sm shrink-0">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-[#241F1E] text-base">CakeShop Official Store Profile</h3>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Contact
                </span>
              </div>
              <div className="text-xs text-[#7A6D72] flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span>Phone / Hotline: <strong className="text-[#241F1E]">+92 349 3438060</strong></span>
                <span className="text-[#FAD4DB]">•</span>
                <span>Email: <strong className="text-[#241F1E]">savilamuskan26@gmail.com</strong></span>
                <span className="text-[#FAD4DB] hidden sm:inline">•</span>
                <span className="hidden sm:inline">JazzCash / Easypaisa: <strong className="text-[#241F1E]">0349-3438060 (Savila Muskan)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <a
              href="tel:+923493438060"
              className="px-3 py-2 bg-[#FF4B72] hover:bg-[#E03A60] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +92 349 3438060</span>
            </a>
            <a
              href="https://wa.me/923493438060"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="mailto:savilamuskan26@gmail.com"
              className="px-3 py-2 bg-white border border-[#FAD4DB] hover:bg-[#FFF5F7] text-[#52454A] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF4B72]" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6D72] block">Total Orders</span>
            <p className="font-serif text-2xl font-bold text-[#241F1E] mt-1 tabular-nums">{totalOrdersCount}</p>
            <span className="text-[10px] text-stone-500">Live client bookings</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">In Kitchen / Baking</span>
            <p className="font-serif text-2xl font-bold text-amber-600 mt-1 tabular-nums">{bakingOrdersCount}</p>
            <span className="text-[10px] text-amber-600 font-medium">Active ovens</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">Out for Delivery</span>
            <p className="font-serif text-2xl font-bold text-purple-600 mt-1 tabular-nums">{outForDeliveryCount}</p>
            <span className="text-[10px] text-purple-600 font-medium">Transit riders dispatched</span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B72] block">Gallery Photos</span>
            <p className="font-serif text-2xl font-bold text-[#FF4B72] mt-1 tabular-nums">{galleryItems.length}</p>
            <span className="text-[10px] text-[#7A6D72]">Live on public site</span>
          </div>
        </div>

        {/* TAB 1: ORDER TRACKING & STATUS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Header & Search / Filters */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#FAD4DB] shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#241F1E]">
                    Order Tracking & Kitchen Status Controller
                  </h2>
                  <p className="text-xs text-[#7A6D72] mt-0.5">
                    Click any stage button below to update the live tracking status visible to customers in real-time.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search by Order #, Customer, Phone..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full text-xs p-3 pl-9 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Status Filter Badges */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
                <span className="text-xs font-bold text-[#52454A] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {['All', 'Order Placed', 'Order Confirmed', 'Baking', 'Ready for Delivery', 'Out for Delivery', 'Delivered'].map((status) => {
                  const count = status === 'All' ? orders.length : orders.filter(o => o.status === status).length;
                  const isActive = orderStatusFilter === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#FF4B72] text-white shadow-sm'
                          : 'bg-[#FFF0F3] text-[#52454A] hover:bg-[#FFE3E9]'
                      }`}
                    >
                      <span>{status}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white text-[#7A6D72]'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orders List Cards */}
            <div className="space-y-5">
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#FAD4DB] space-y-3">
                  <AlertCircle className="w-8 h-8 text-[#FF4B72] mx-auto opacity-40" />
                  <p className="text-sm font-semibold text-[#241F1E]">No orders match your filter.</p>
                  <button
                    onClick={() => { setOrderStatusFilter('All'); setOrderSearchQuery(''); }}
                    className="text-xs text-[#FF4B72] font-bold underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const currentStatus = order.status;
                  return (
                    <div 
                      key={order.id} 
                      className="bg-white rounded-2xl border border-[#FAD4DB] shadow-sm overflow-hidden transition-all hover:border-[#FF4B72]/40"
                    >
                      {/* Top Header of Card */}
                      <div className="px-5 py-4 bg-[#FFF9FA] border-b border-[#FAD4DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-[#FF4B72] bg-white px-2.5 py-1 rounded-lg border border-[#FAD4DB]">
                            {order.orderNumber}
                          </span>
                          <div>
                            <h3 className="font-serif text-base font-bold text-[#241F1E]">
                              {order.customer.fullName}
                            </h3>
                            <p className="text-xs text-[#7A6D72] flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-[#FF4B72]" />
                              <span>{order.customer.phone}</span>
                              <span>•</span>
                              <MapPin className="w-3 h-3 text-[#FF4B72]" />
                              <span>{order.customer.city}</span>
                            </p>
                          </div>
                        </div>

                        {/* Current Status Badge + Quick Action WhatsApp */}
                        <div className="flex items-center gap-2.5">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            currentStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : currentStatus === 'Out for Delivery'
                              ? 'bg-purple-100 text-purple-800'
                              : currentStatus === 'Baking'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-[#FFF0F3] text-[#FF4B72]'
                          }`}>
                            ● {currentStatus}
                          </span>

                          {/* WhatsApp Customer Update */}
                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Assalam-o-Alaikum%20${encodeURIComponent(order.customer.fullName)}!%20CakeShop%20update%20on%20Order%20%23${order.orderNumber}:%20Your%20cake%20status%20is%20now%20'${encodeURIComponent(currentStatus)}'.%20Scheduled%20delivery:%20${encodeURIComponent(order.customer.deliveryDate)}%20(${encodeURIComponent(order.customer.deliveryTimeSlot)}).%20Thank%20you%20for%20ordering%20with%20CakeShop!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                            title="Send WhatsApp tracking update to customer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Status</span>
                          </a>

                          {/* Print Invoice & Kitchen Slip */}
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForPrint(order)}
                            className="px-3 py-1.5 border border-[#FAD4DB] bg-white hover:bg-[#FFF0F3] text-[#241F1E] hover:text-[#FF4B72] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                            title="Print Kitchen Slip & Customer Invoice"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#FF4B72]" />
                            <span>Print Slip</span>
                          </button>
                        </div>
                      </div>

                      {/* Main Order Body */}
                      <div className="p-5 space-y-5">
                        
                        {/* 1. INTERACTIVE TRACKING STATUS SELECTOR */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#52454A] block">
                            Change Live Kitchen & Delivery Status:
                          </span>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                            {stages.map((stage, idx) => {
                              const isCurrent = order.status === stage.label;
                              const Icon = stage.icon;
                              return (
                                <button
                                  key={stage.label}
                                  onClick={() => {
                                    updateOrderStatus(order.id, stage.label);
                                    showToast(`Order #${order.orderNumber} status changed to "${stage.label}"`);
                                  }}
                                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                                    isCurrent
                                      ? 'bg-[#FF4B72] border-[#FF4B72] text-white shadow-md shadow-[#FF4B72]/20 font-bold scale-[1.02]'
                                      : 'bg-[#FFF9FA] border-[#FAD4DB] text-[#52454A] hover:border-[#FF4B72] hover:bg-white'
                                  }`}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <span className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-[#7A6D72]'}`}>
                                      Step {idx + 1}
                                    </span>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span className="text-xs leading-tight line-clamp-2">
                                    {stage.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* 2. Customer & Delivery Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#FFF9FA] rounded-xl border border-[#FAD4DB] text-xs">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6D72] block">Delivery Schedule</span>
                            <p className="font-bold text-[#241F1E] mt-0.5">{order.customer.deliveryDate}</p>
                            <p className="text-[#52454A]">{order.customer.deliveryTimeSlot}</p>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6D72] block">Delivery Destination</span>
                            <p className="font-semibold text-[#241F1E] mt-0.5">{order.customer.deliveryAddress}</p>
                            <p className="text-[#7A6D72]">{order.customer.city} {order.customer.landmark ? `(Near: ${order.customer.landmark})` : ''}</p>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6D72] block">Payment Info</span>
                            <p className="font-bold text-[#241F1E] mt-0.5">{order.paymentMethod}</p>
                            <p className="text-emerald-700 font-semibold">{order.paymentStatus}</p>
                          </div>
                        </div>

                        {/* 3. Ordered Cakes breakdown */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#52454A] block">
                            Cake Items Ordered:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {order.items.map(item => (
                              <div key={item.cartItemId} className="p-3 bg-white rounded-xl border border-[#FAD4DB] flex items-center justify-between text-xs">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-[#241F1E]">
                                    {item.quantity}× {item.product.name}
                                  </p>
                                  <p className="text-[11px] text-[#7A6D72]">
                                    {item.selectedSize.name} · {item.selectedFlavor.name} {item.isEggless ? '· (Eggless)' : ''}
                                  </p>
                                  {item.cakeMessage && (
                                    <p className="text-[11px] text-[#FF4B72] italic font-medium">
                                      Message: "{item.cakeMessage}"
                                    </p>
                                  )}
                                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                    <p className="text-[10px] text-stone-500">
                                      Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
                                    </p>
                                  )}
                                </div>
                                <span className="font-serif font-bold text-sm text-[#FF4B72] tabular-nums shrink-0">
                                  ₨ {item.totalPrice.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 4. Rider Info Strip & Edit */}
                        <div className="p-3 bg-white rounded-xl border border-[#FAD4DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#FFF0F3] text-[#FF4B72] flex items-center justify-center shrink-0">
                              <Truck className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-[#241F1E]">
                                Assigned Rider: {order.riderDetails?.name || 'Not assigned yet'}
                              </p>
                              <p className="text-[11px] text-[#7A6D72]">
                                {order.riderDetails?.phone ? `Phone: ${order.riderDetails.phone} • Vehicle: ${order.riderDetails.vehicle}` : 'Assign a rider for real-time dispatch'}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedOrderForRider(order);
                              setRiderForm({
                                name: order.riderDetails?.name || 'Muhammad Rizwan',
                                phone: order.riderDetails?.phone || '+92 349 3438060',
                                vehicle: order.riderDetails?.vehicle || 'Refrigerated Cake Van (LED-4192)'
                              });
                            }}
                            className="px-3 py-1.5 bg-[#FFF0F3] hover:bg-[#FFE0E6] text-[#FF4B72] font-bold text-xs rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                          >
                            {order.riderDetails?.name ? 'Edit Rider Details' : 'Assign Rider'}
                          </button>
                        </div>

                        {/* Order Total */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#FAD4DB] text-xs">
                          <span className="text-[#7A6D72]">
                            Subtotal: ₨ {order.subtotal.toLocaleString()} · Delivery: {order.deliveryFee === 0 ? 'Free' : `₨ ${order.deliveryFee}`}
                          </span>
                          <span className="font-serif text-base font-bold text-[#FF4B72] tabular-nums">
                            Total: ₨ {order.total.toLocaleString()}
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* TAB 2: GALLERY & PHOTO MANAGER (NEW FEATURE) */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#FAD4DB] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#241F1E]">
                  Cake Photo Gallery & Media Manager
                </h2>
                <p className="text-xs text-[#7A6D72] mt-0.5">
                  Upload fresh cake photography directly from your phone/PC. Uploaded photos are displayed live in the website gallery and can be assigned as the main picture for any cake!
                </p>
              </div>

              <button
                onClick={() => {
                  setPhotoPreview('');
                  setPhotoUrl('');
                  setUploadModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FF4B72]/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {['All', 'Birthday Cakes', 'Wedding Cakes', 'Chocolate', 'Cupcakes', 'Photo Cakes', 'Desserts', 'Customized Cakes'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                    galleryFilter === cat
                      ? 'bg-[#FF4B72] text-white shadow-sm'
                      : 'bg-white border border-[#FAD4DB] text-[#52454A] hover:bg-[#FFF0F3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredGallery.map((item) => {
                // Find if any product is currently using this image
                const cakesUsingThisPhoto = products.filter(p => p.images[0] === item.url);

                return (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#FAD4DB] shadow-sm overflow-hidden flex flex-col group hover:border-[#FF4B72] transition-all"
                  >
                    <div className="relative aspect-square bg-[#FAF7F5] overflow-hidden">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white rounded-full text-[10px] font-bold">
                          {item.category}
                        </span>
                      </div>

                      {/* If in use by cake */}
                      {cakesUsingThisPhoto.length > 0 && (
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                            <Check className="w-3 h-3" />
                            <span>Active Picture: {cakesUsingThisPhoto.map(p => p.name).join(', ')}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#241F1E] line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-[#7A6D72] line-clamp-2 mt-0.5">
                          {item.caption}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-[#FAD4DB] flex items-center justify-between gap-2">
                        {/* Set as Cake Pic */}
                        <button
                          onClick={() => {
                            setSelectedPhotoForCake(item);
                            setTargetCakeId(products[0]?.id || '');
                          }}
                          className="flex-1 px-3 py-1.5 bg-[#FFF0F3] hover:bg-[#FFE0E6] text-[#FF4B72] text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Assign this photo to a cake in shop"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Apply to Cake</span>
                        </button>

                        {/* Delete photo */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete photo "${item.title}" from gallery?`)) {
                              deleteGalleryPhoto(item.id);
                              showToast('Photo removed from gallery.');
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#FAD4DB] shadow-sm flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#241F1E]">Cake Catalog & Prices</h2>
                <p className="text-xs text-[#7A6D72]">
                  Add new bakery products, change prices, pick photos from gallery, or toggle bestsellers.
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-[#FF4B72]/20"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Add New Cake</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-[#FAD4DB] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF5F7] border-b border-[#FAD4DB] text-[#7A6D72] uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Cake</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Base Price (PKR)</th>
                      <th className="p-3.5">Badges</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAD4DB]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FFF9FA]">
                        <td className="p-3.5 flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#FAD4DB]" />
                          <div>
                            <p className="font-bold text-[#241F1E]">{p.name}</p>
                            <p className="text-[11px] text-[#7A6D72] line-clamp-1">{p.shortDescription}</p>
                          </div>
                        </td>
                        <td className="p-3.5 font-semibold text-[#52454A]">{p.category}</td>
                        <td className="p-3.5 font-serif font-bold text-[#FF4B72] text-sm tabular-nums">
                          ₨ {p.basePrice.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          {p.isBestseller && (
                            <span className="text-[9px] bg-[#FF4B72] text-white px-2 py-0.5 rounded-full font-bold uppercase mr-1">
                              Bestseller
                            </span>
                          )}
                          {p.isEgglessAvailable && (
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase">
                              Eggless
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-2 rounded-lg hover:bg-[#FFF0F3] text-[#FF4B72] transition-colors cursor-pointer"
                            title="Edit Cake"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${p.name}?`)) {
                                deleteProduct(p.id);
                                showToast(`Deleted ${p.name}`);
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Cake"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Edit Modal */}
            {isEditingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#FAD4DB] shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
                    <h3 className="font-serif text-lg font-bold text-[#241F1E]">
                      {editingProductId ? 'Edit Cake Details' : 'Add New Cake to Shop'}
                    </h3>
                    <button 
                      onClick={() => setIsEditingProduct(false)}
                      className="text-stone-400 hover:text-[#241F1E]"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-[#52454A] block mb-1">Cake Name *</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g. Lotus Biscoff Dream Cake"
                        className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-[#52454A] block mb-1">Category</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                          className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                        >
                          {['Birthday Cakes', 'Wedding Cakes', 'Anniversary Cakes', 'Photo Cakes', 'Cupcakes', 'Customized Cakes', 'Brownies', 'Desserts'].map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-[#52454A] block mb-1">Base Price (PKR) *</label>
                        <input
                          type="number"
                          required
                          value={productForm.basePrice}
                          onChange={(e) => setProductForm({ ...productForm, basePrice: Number(e.target.value) })}
                          className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-[#52454A] block mb-1">Short Description</label>
                      <input
                        type="text"
                        value={productForm.shortDescription}
                        onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                        placeholder="Delicious handmade sponge..."
                        className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                      />
                    </div>

                    {/* Cake Image with Gallery Picker */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-[#52454A]">Cake Picture</label>
                        <button
                          type="button"
                          onClick={() => setGalleryPickerForProduct(true)}
                          className="text-[11px] text-[#FF4B72] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Pick from Gallery</span>
                        </button>
                      </div>

                      <div className="flex gap-2.5 items-center">
                        <img
                          src={productForm.imageUrl}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-[#FAD4DB] shrink-0"
                        />
                        <input
                          type="text"
                          value={productForm.imageUrl}
                          onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                          placeholder="Image URL or choose from gallery"
                          className="flex-1 p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.isBestseller}
                          onChange={(e) => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                          className="rounded text-[#FF4B72]"
                        />
                        <span className="font-medium text-[#241F1E]">Bestseller Badge</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.isEgglessAvailable}
                          onChange={(e) => setProductForm({ ...productForm, isEgglessAvailable: e.target.checked })}
                          className="rounded text-[#FF4B72]"
                        />
                        <span className="font-medium text-[#241F1E]">Eggless Option</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-[#FAD4DB]">
                      <button
                        type="button"
                        onClick={() => setIsEditingProduct(false)}
                        className="px-4 py-2 border border-[#FAD4DB] rounded-xl hover:bg-stone-50 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#FF4B72] hover:bg-[#E03A60] text-white font-bold rounded-xl shadow cursor-pointer"
                      >
                        Save Cake
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 4: CUSTOM INQUIRIES */}
        {activeTab === 'custom' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#FAD4DB] shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#241F1E]">Custom Cake Design Inquiries</h2>
              <p className="text-xs text-[#7A6D72]">
                Client mood boards submitted through the custom cake builder with WhatsApp follow-ups.
              </p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div key={req.id} className="bg-white rounded-2xl p-5 border border-[#FAD4DB] shadow-sm space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex gap-4">
                      {req.referenceImageUrl && (
                        <img
                          src={req.referenceImageUrl}
                          alt=""
                          className="w-20 h-20 rounded-xl object-cover bg-stone-50 border border-[#FAD4DB] shrink-0"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#FF4B72]">{req.id}</span>
                          <span className="text-[#7A6D72]">· {new Date(req.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#241F1E] mt-0.5">
                          {req.customerName} ({req.city})
                        </h4>
                        <p className="text-[#7A6D72]">Phone: <strong className="text-[#241F1E]">{req.phone}</strong></p>
                        <p className="text-[#52454A] mt-1">Occasion: <strong>{req.occasion}</strong> · Size: {req.size}</p>
                        <p className="text-[#52454A]">Theme: {req.theme} · Palette: {req.colorPreference}</p>
                        {req.messageOnCake && <p className="italic text-[#FF4B72]">Message: "{req.messageOnCake}"</p>}
                      </div>
                    </div>

                    <div className="space-y-2 text-right">
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomRequestStatus(req.id, e.target.value as any)}
                        className="bg-[#FFF9FA] border border-[#FAD4DB] text-xs font-bold rounded-xl p-2 text-[#241F1E]"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="In Production">In Production</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>

                      {req.estimatedQuote && (
                        <p className="font-serif text-sm font-bold text-[#FF4B72] tabular-nums">
                          Quote: ₨ {req.estimatedQuote.toLocaleString()}
                        </p>
                      )}

                      <div className="flex justify-end gap-2 pt-1">
                        <a
                          href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(req.customerName)}!%20CakeShop%20regarding%20your%20custom%20cake%20request%20(${req.occasion}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#25D366] text-white font-bold rounded-xl flex items-center gap-1 text-[11px]"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Client</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {req.additionalInstructions && (
                    <p className="p-3 bg-[#FFF9FA] rounded-xl border border-[#FAD4DB] text-[#6B5D63] italic">
                      "{req.additionalInstructions}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REVENUE & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#FAD4DB] shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#241F1E]">Sales Overview</h2>
              <p className="text-xs text-[#7A6D72]">Bakery revenue metrics and best-selling cakes across Pakistan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
                <span className="text-xs font-bold text-[#7A6D72] uppercase tracking-wider">Gross Sales</span>
                <p className="font-serif text-3xl font-bold text-[#FF4B72] mt-2 tabular-nums">
                  ₨ {totalSales.toLocaleString()}
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold">100% Verified checkout volume</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
                <span className="text-xs font-bold text-[#7A6D72] uppercase tracking-wider">Total Orders</span>
                <p className="font-serif text-3xl font-bold text-[#241F1E] mt-2 tabular-nums">
                  {totalOrdersCount}
                </p>
                <span className="text-[11px] text-[#7A6D72]">Average: ₨ {totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount).toLocaleString() : 0} / order</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-[#FAD4DB] shadow-sm">
                <span className="text-xs font-bold text-[#7A6D72] uppercase tracking-wider">Delivery Fleet</span>
                <p className="font-serif text-3xl font-bold text-emerald-700 mt-2 tabular-nums">
                  99.4%
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold">Chilled van on-time rate</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: UPLOAD PHOTO TO GALLERY */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-[#FAD4DB] shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#241F1E]">Upload Photo to Gallery</h3>
                <p className="text-xs text-[#7A6D72]">Shows on the website gallery & can be assigned to any cake</p>
              </div>
              <button 
                onClick={() => setUploadModalOpen(false)}
                className="text-stone-400 hover:text-[#241F1E]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadPhotoSubmit} className="space-y-4 text-xs">
              
              {/* File Upload Box */}
              <div>
                <label className="font-bold text-[#52454A] block mb-1.5">Select Image from Device</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 border-2 border-dashed border-[#FAD4DB] hover:border-[#FF4B72] rounded-2xl bg-[#FFF9FA] text-center cursor-pointer transition-colors space-y-2"
                >
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="h-36 mx-auto object-cover rounded-xl border border-[#FAD4DB]"
                      />
                      <p className="text-xs text-[#FF4B72] font-bold">Click to change selected photo</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#FFF0F3] text-[#FF4B72] flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-[#241F1E]">Click to browse image from your device</p>
                      <p className="text-[11px] text-[#7A6D72]">Supports JPEG, PNG, WebP</p>
                    </>
                  )}
                </div>
              </div>

              {/* Or Paste URL */}
              <div>
                <label className="font-bold text-[#52454A] block mb-1">Or Paste Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    if (!photoPreview) setPhotoPreview(e.target.value);
                  }}
                  className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                />
              </div>

              <div>
                <label className="font-bold text-[#52454A] block mb-1">Cake Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Pistachio Rose Tier"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#52454A] block mb-1">Category Tag</label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                  >
                    {['Birthday Cakes', 'Wedding Cakes', 'Chocolate', 'Cupcakes', 'Photo Cakes', 'Desserts', 'Customized Cakes'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#52454A] block mb-1">Short Caption / Story</label>
                  <input
                    type="text"
                    placeholder="Freshly decorated..."
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAD4DB]">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 border border-[#FAD4DB] rounded-xl hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!photoPreview && !photoUrl}
                  className="px-5 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] disabled:opacity-50 text-white font-bold rounded-xl shadow cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish to Gallery</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: "SET AS CAKE PICTURE" FROM GALLERY */}
      {selectedPhotoForCake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#FAD4DB] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241F1E]">Set Photo as Cake Picture</h3>
                <p className="text-xs text-[#7A6D72]">Update a cake's display image using this gallery photo</p>
              </div>
              <button 
                onClick={() => setSelectedPhotoForCake(null)}
                className="text-stone-400 hover:text-[#241F1E]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyPhotoToCake} className="space-y-4 text-xs">
              <div className="flex items-center gap-3 p-3 bg-[#FFF9FA] rounded-2xl border border-[#FAD4DB]">
                <img 
                  src={selectedPhotoForCake.url} 
                  alt="" 
                  className="w-16 h-16 rounded-xl object-cover border border-[#FAD4DB]"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#FF4B72]">Selected Photo</span>
                  <p className="font-bold text-[#241F1E]">{selectedPhotoForCake.title}</p>
                  <p className="text-[11px] text-[#7A6D72]">{selectedPhotoForCake.category}</p>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#52454A] block mb-1">
                  Choose which cake should use this photo: *
                </label>
                <select
                  required
                  value={targetCakeId}
                  onChange={(e) => setTargetCakeId(e.target.value)}
                  className="w-full p-3 bg-white border border-[#FAD4DB] rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                >
                  <option value="">-- Select a Cake from Catalog --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Currently ₨ {p.basePrice.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAD4DB]">
                <button
                  type="button"
                  onClick={() => setSelectedPhotoForCake(null)}
                  className="px-4 py-2 border border-[#FAD4DB] rounded-xl hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!targetCakeId}
                  className="px-5 py-2.5 bg-[#FF4B72] hover:bg-[#E03A60] disabled:opacity-50 text-white font-bold rounded-xl shadow cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Update Cake Picture</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: GALLERY PICKER (INSIDE PRODUCT EDIT FORM) */}
      {galleryPickerForProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 border border-[#FAD4DB] shadow-2xl max-h-[88vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241F1E]">Choose Picture from Gallery</h3>
                <p className="text-xs text-[#7A6D72]">Click any photo to select it for this cake</p>
              </div>
              <button 
                onClick={() => setGalleryPickerForProduct(false)}
                className="text-stone-400 hover:text-[#241F1E]"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setProductForm({ ...productForm, imageUrl: item.url });
                    setGalleryPickerForProduct(false);
                    showToast(`Photo "${item.title}" selected!`);
                  }}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-[#FAD4DB] hover:border-[#FF4B72] cursor-pointer shadow-sm hover:shadow-md transition-all"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                    <p className="font-bold text-xs truncate">{item.title}</p>
                    <p className="text-[10px] text-white/80">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#FAD4DB]">
              <button
                onClick={() => setGalleryPickerForProduct(false)}
                className="px-4 py-2 border border-[#FAD4DB] rounded-xl hover:bg-stone-50 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER PRINT / KITCHEN DISPATCH SLIP MODAL */}
      {selectedOrderForPrint && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto"
          onClick={() => setSelectedOrderForPrint(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full my-6 border border-[#FAD4DB] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Actions (hidden during print) */}
            <div className="no-print px-6 py-4 bg-[#241F1E] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF4B72] flex items-center justify-center text-white font-bold">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold">Kitchen Slip & Customer Receipt</h3>
                  <p className="text-[11px] text-stone-300">Order #{selectedOrderForPrint.orderNumber} • {selectedOrderForPrint.status}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleCopySlipDetails(selectedOrderForPrint)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy formatted slip text"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedReceipt ? 'Copied!' : 'Copy Text'}</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => downloadSlipAsImage(selectedOrderForPrint)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Download slip as high-res Picture / PNG image"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>Save Picture (PNG)</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => downloadSlipAsPdf(selectedOrderForPrint)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Download slip as official PDF document"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                  <span>Save as PDF</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => executePrintSlip(selectedOrderForPrint)}
                  className="px-4 py-1.5 bg-[#FF4B72] hover:bg-[#E03A60] disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#FF4B72]/20 cursor-pointer"
                  title="Convert to PDF & Picture and open print dialog"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Printer className="w-3.5 h-3.5" />}
                  <span>Print Slip Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOrderForPrint(null)}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="Close receipt preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Receipt Body (Target for printing) */}
            <div className="overflow-y-auto p-6 sm:p-8 bg-[#FAF6F7] flex-1">
              <div 
                id="printable-receipt-area"
                className="printable-receipt-container bg-white p-6 sm:p-8 rounded-2xl border border-[#FAD4DB] shadow-sm space-y-6 text-[#241F1E]"
              >
                {/* Bakery Branding Header */}
                <div className="text-center border-b-2 border-dashed border-[#FAD4DB] pb-5 space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#FF4B72] text-white flex items-center justify-center font-serif font-bold text-base">
                      C
                    </span>
                    <h2 className="font-serif text-2xl font-bold tracking-tight text-[#241F1E]">CakeShop</h2>
                  </div>
                  <p className="text-xs text-[#7A6D72] italic font-medium">Artisanal Bakery & Fresh Cake Confectionery</p>
                  <p className="text-[11px] text-[#7A6D72]">UAN: +92 349 3438060 • savilamuskan26@gmail.com • Pakistan</p>
                  <div className="pt-2">
                    <span className="inline-block bg-[#241F1E] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-md tracking-wider">
                      Official Kitchen & Delivery Dispatch Slip
                    </span>
                  </div>
                </div>

                {/* Order Information & Customer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Order Meta */}
                  <div className="bg-[#FFF9FA] p-3.5 rounded-xl border border-[#FAD4DB] space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B72] border-b border-[#FAD4DB] pb-1">
                      Order Identification
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Order #:</span>
                      <span className="font-mono font-bold text-[#FF4B72] text-sm">{selectedOrderForPrint.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Order Date:</span>
                      <span className="font-medium text-[#241F1E]">
                        {new Date(selectedOrderForPrint.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#7A6D72]">Kitchen Status:</span>
                      <span className="font-bold text-[11px] bg-[#FF4B72] text-white px-2 py-0.5 rounded-full">
                        {selectedOrderForPrint.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Payment:</span>
                      <span className="font-semibold text-[#241F1E]">
                        {selectedOrderForPrint.paymentMethod} ({selectedOrderForPrint.paymentStatus})
                      </span>
                    </div>
                  </div>

                  {/* Customer Meta */}
                  <div className="bg-[#FFF9FA] p-3.5 rounded-xl border border-[#FAD4DB] space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B72] border-b border-[#FAD4DB] pb-1">
                      Customer & Delivery Schedule
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Recipient:</span>
                      <span className="font-bold text-[#241F1E]">{selectedOrderForPrint.customer.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Contact:</span>
                      <span className="font-semibold text-[#241F1E]">{selectedOrderForPrint.customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Delivery Date:</span>
                      <span className="font-bold text-rose-600">{selectedOrderForPrint.customer.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A6D72]">Time Slot:</span>
                      <span className="font-medium text-[#241F1E]">{selectedOrderForPrint.customer.deliveryTimeSlot}</span>
                    </div>
                    <div className="pt-1 border-t border-[#FAD4DB] text-[11px]">
                      <span className="text-[#7A6D72] block">Destination:</span>
                      <span className="font-medium text-[#241F1E] block">
                        {selectedOrderForPrint.customer.deliveryAddress}, {selectedOrderForPrint.customer.city}
                      </span>
                      {selectedOrderForPrint.customer.landmark && (
                        <span className="text-[#7A6D72] italic text-[10px] block">
                          Near: {selectedOrderForPrint.customer.landmark}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rider Dispatch Strip */}
                <div className="bg-[#FFF5F7] border border-[#FAD4DB] rounded-xl p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4B72] block">
                      Assigned Delivery Rider
                    </span>
                    <p className="font-bold text-[#241F1E] mt-0.5">
                      {selectedOrderForPrint.riderDetails?.name || 'In-House Cake Courier'}
                    </p>
                    <p className="text-[11px] text-[#7A6D72]">
                      Phone: {selectedOrderForPrint.riderDetails?.phone || '+92 349 3438060'} • Vehicle: {selectedOrderForPrint.riderDetails?.vehicle || 'Refrigerated Cake Van'}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-white border border-[#FAD4DB] text-[#FF4B72] px-2.5 py-1 rounded-lg">
                    Chilled Transit
                  </span>
                </div>

                {/* Itemized Cakes Table */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#52454A]">
                    Order Items & Special Inscriptions:
                  </div>
                  <div className="border border-[#FAD4DB] rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#FFF0F3] border-b border-[#FAD4DB] text-[10px] uppercase font-bold text-[#52454A]">
                        <tr>
                          <th className="p-2.5 w-8 text-center">#</th>
                          <th className="p-2.5">Cake Description</th>
                          <th className="p-2.5 text-center w-16">Qty</th>
                          <th className="p-2.5 text-right w-28">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#FAD4DB]">
                        {selectedOrderForPrint.items.map((item, idx) => (
                          <tr key={item.cartItemId} className="bg-white">
                            <td className="p-2.5 text-center font-bold text-[#7A6D72]">{idx + 1}</td>
                            <td className="p-2.5 space-y-1">
                              <p className="font-bold text-[#241F1E] text-xs">{item.product.name}</p>
                              <p className="text-[11px] text-[#7A6D72]">
                                {item.selectedSize.name} · {item.selectedFlavor.name} {item.isEggless ? '· (Eggless)' : ''}
                              </p>
                              {item.cakeMessage && (
                                <p className="text-[11px] text-[#FF4B72] italic font-semibold bg-[#FFF5F7] px-2 py-0.5 rounded inline-block">
                                  🎂 Inscription: "{item.cakeMessage}"
                                </p>
                              )}
                              {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                <p className="text-[10px] text-stone-500">
                                  Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
                                </p>
                              )}
                            </td>
                            <td className="p-2.5 text-center font-bold text-[#241F1E]">{item.quantity}</td>
                            <td className="p-2.5 text-right font-serif font-bold text-sm text-[#FF4B72] tabular-nums">
                              ₨ {item.totalPrice.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals Section */}
                <div className="space-y-1.5 pt-2 border-t border-[#FAD4DB] text-xs">
                  <div className="flex justify-between text-[#7A6D72]">
                    <span>Items Subtotal:</span>
                    <span className="font-mono font-semibold">₨ {selectedOrderForPrint.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#7A6D72]">
                    <span>Standard Chilled Delivery:</span>
                    <span className="font-mono font-semibold">
                      {selectedOrderForPrint.deliveryFee === 0 ? 'Free Shipping' : `₨ ${selectedOrderForPrint.deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t-2 border-dashed border-[#FAD4DB] text-base font-bold text-[#241F1E]">
                    <span className="font-serif">Grand Total to Collect / Paid:</span>
                    <span className="font-serif text-lg text-[#FF4B72] tabular-nums">
                      ₨ {selectedOrderForPrint.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Baker & Quality Notice */}
                <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded-xl p-3 text-[11px] text-[#8C6B00] space-y-1">
                  <p className="font-bold">⚠️ Baker & Rider Freshness Instructions:</p>
                  <p>Must remain chilled below 4°C during transit. Keep horizontal at all times. Best consumed within 48 hours of baking.</p>
                </div>

                {/* Footer Stamp */}
                <div className="text-center pt-3 border-t border-[#FAD4DB] text-[10px] text-[#7A6D72] space-y-0.5">
                  <p className="font-semibold">Baked with passion & love at CakeShop Pakistan</p>
                  <p>Generated for kitchen fulfillment on {new Date().toLocaleString('en-PK')}</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="no-print px-6 py-4 bg-white border-t border-[#FAD4DB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-[#7A6D72]">
                Tip: Direct "Save Picture (PNG)" ya "Save as PDF" par click kar ke file hasil karein.
              </span>
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForPrint(null)}
                  className="px-4 py-2 border border-[#FAD4DB] hover:bg-stone-50 text-[#52454A] font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => downloadSlipAsImage(selectedOrderForPrint)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  <span>Save Picture (PNG)</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => downloadSlipAsPdf(selectedOrderForPrint)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                  <span>Save PDF</span>
                </button>

                <button
                  type="button"
                  disabled={isGeneratingSlip}
                  onClick={() => executePrintSlip(selectedOrderForPrint)}
                  className="px-5 py-2 bg-[#FF4B72] hover:bg-[#E03A60] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isGeneratingSlip ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Printer className="w-3.5 h-3.5" />}
                  <span>Print Slip Now</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* RIDER ASSIGNMENT MODAL */}
      {selectedOrderForRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#FAD4DB] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#FAD4DB]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#241F1E]">Assign / Edit Delivery Rider</h3>
                <p className="text-xs text-[#7A6D72]">Order #{selectedOrderForRider.orderNumber}</p>
              </div>
              <button 
                onClick={() => setSelectedOrderForRider(null)}
                className="text-stone-400 hover:text-[#241F1E]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRider} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#52454A] block mb-1">Rider Full Name *</label>
                <input
                  type="text"
                  required
                  value={riderForm.name}
                  onChange={(e) => setRiderForm({ ...riderForm, name: e.target.value })}
                  placeholder="e.g. Muhammad Rizwan"
                  className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                />
              </div>

              <div>
                <label className="font-bold text-[#52454A] block mb-1">Rider Phone (for customer to call) *</label>
                <input
                  type="text"
                  required
                  value={riderForm.phone}
                  onChange={(e) => setRiderForm({ ...riderForm, phone: e.target.value })}
                  placeholder="+92 349 3438060"
                  className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                />
              </div>

              <div>
                <label className="font-bold text-[#52454A] block mb-1">Vehicle Details / Plate *</label>
                <input
                  type="text"
                  required
                  value={riderForm.vehicle}
                  onChange={(e) => setRiderForm({ ...riderForm, vehicle: e.target.value })}
                  placeholder="e.g. Chilled Cake Van (LED-4192) or Honda 125 Box Unit"
                  className="w-full p-2.5 bg-[#FFF9FA] border border-[#FAD4DB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#FF4B72]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#FAD4DB]">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForRider(null)}
                  className="px-4 py-2 border border-[#FAD4DB] rounded-xl hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF4B72] hover:bg-[#E03A60] text-white font-bold rounded-xl shadow cursor-pointer"
                >
                  Save Rider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
