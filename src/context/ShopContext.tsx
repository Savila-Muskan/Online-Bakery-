import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  OrderStatus, 
  PaymentMethod, 
  CustomerDetails, 
  CustomCakeRequest,
  GalleryItem
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOM_REQUESTS,
  INITIAL_GALLERY_ITEMS
} from '../data/mockData';

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setCakeImageFromGallery: (productId: string, imageUrl: string) => void;

  galleryItems: GalleryItem[];
  addGalleryPhoto: (photo: { url: string; title: string; caption: string; category?: string }) => GalleryItem;
  deleteGalleryPhoto: (id: string) => void;

  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  promoCode: string;
  discountAmount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  grandTotal: number;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  isCustomCakeOpen: boolean;
  setIsCustomCakeOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  trackingOrderNumber: string;
  setTrackingOrderNumber: (num: string) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  orders: Order[];
  createOrder: (details: CustomerDetails, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, riderUpdates?: { name: string; phone: string; vehicle: string }) => void;

  customRequests: CustomCakeRequest[];
  submitCustomRequest: (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>) => CustomCakeRequest;
  updateCustomRequestStatus: (reqId: string, status: CustomCakeRequest['status'], estimatedQuote?: number) => void;

  activeCategoryFilter: string | null;
  setActiveCategoryFilter: (cat: string | null) => void;
  activeOccasionFilter: string | null;
  setActiveOccasionFilter: (occ: string | null) => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;

  currentPath: string;
  navigateTo: (path: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lumiere_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Save products when updated
  useEffect(() => {
    localStorage.setItem('lumiere_products', JSON.stringify(products));
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumiere_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('lumiere_cart', JSON.stringify(cart));
  }, [cart]);

  // Promo code
  const [promoCode, setPromoCode] = useState<string>('MAISON10');
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumiere_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lumiere_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('lumiere_orders', JSON.stringify(orders));
  }, [orders]);

  // Custom cake requests
  const [customRequests, setCustomRequests] = useState<CustomCakeRequest[]>(() => {
    const saved = localStorage.getItem('lumiere_custom_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CUSTOM_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('lumiere_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  // Gallery items state (syncs admin uploads to public website gallery)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('cakeshop_gallery');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_GALLERY_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('cakeshop_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const addGalleryPhoto = (photo: { url: string; title: string; caption: string; category?: string }): GalleryItem => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      url: photo.url,
      title: photo.title || 'Artisanal Cake Creation',
      caption: photo.caption || '',
      category: photo.category || 'Customized Cakes',
      dateAdded: new Date().toISOString().split('T')[0],
      likes: Math.floor(Math.random() * 200) + 140
    };
    setGalleryItems(prev => [newItem, ...prev]);
    return newItem;
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  const setCakeImageFromGallery = (productId: string, imageUrl: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const remaining = p.images.filter(img => img !== imageUrl);
        return {
          ...p,
          images: [imageUrl, ...remaining]
        };
      }
      return p;
    }));
  };

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCustomCakeOpen, setIsCustomCakeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('LUM-84920');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Filters
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [activeOccasionFilter, setActiveOccasionFilter] = useState<string | null>(null);

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Free delivery for orders >= 4000 PKR, else 350 PKR
  const deliveryFee = cartSubtotal > 0 ? (cartSubtotal >= 4000 ? 0 : 350) : 0;
  const discountAmount = discountPercent > 0 ? Math.round((cartSubtotal * discountPercent) / 100) : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MAISON10' || clean === 'SWEET10' || clean === 'LUMIERE10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return { success: true, message: '10% celebratory discount applied!' };
    }
    if (clean === 'VIP20') {
      setPromoCode(clean);
      setDiscountPercent(20);
      return { success: true, message: '20% VIP connoisseur discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "MAISON10" for 10% off.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const addToCart = (item: Omit<CartItem, 'cartItemId' | 'totalPrice'>) => {
    const cartItemId = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const totalPrice = item.unitPrice * item.quantity;
    const newItem: CartItem = {
      ...item,
      cartItemId,
      totalPrice
    };
    setCart(prev => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty
        };
      }
      return item;
    }));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Orders
  const createOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `LUM-${randomNum}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customer,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      promoCode: discountAmount > 0 ? promoCode : undefined,
      total: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Cash On Delivery' : 'Pending',
      status: 'Order Confirmed',
      riderDetails: {
        name: 'Chilled Delivery Fleet Rider',
        phone: '+92 300 8472911',
        vehicle: 'Refrigerated Pâtisserie Unit'
      }
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setConfirmedOrder(newOrder);
    setTrackingOrderNumber(orderNumber);
    return newOrder;
  };

  // Routing state for /admin vs /
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.startsWith('/admin') || h === '#admin' || h.startsWith('#/admin')) {
        return '/admin';
      }
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window === 'undefined') return;
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.startsWith('/admin') || h === '#admin' || h.startsWith('#/admin')) {
        setCurrentPath('/admin');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      const isAdm = path.toLowerCase().startsWith('/admin') || path.toLowerCase() === '#admin';
      setCurrentPath(isAdm ? '/admin' : '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    riderUpdates?: { name: string; phone: string; vehicle: string }
  ) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { 
      ...o, 
      status, 
      riderDetails: riderUpdates ? riderUpdates : o.riderDetails 
    } : o));
    if (confirmedOrder && confirmedOrder.id === orderId) {
      setConfirmedOrder(prev => prev ? { 
        ...prev, 
        status, 
        riderDetails: riderUpdates ? riderUpdates : prev.riderDetails 
      } : null);
    }
  };

  // Custom cake requests
  const submitCustomRequest = (req: Omit<CustomCakeRequest, 'id' | 'createdAt' | 'status'>): CustomCakeRequest => {
    const newReq: CustomCakeRequest = {
      ...req,
      id: `cst-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Review'
    };
    setCustomRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const updateCustomRequestStatus = (reqId: string, status: CustomCakeRequest['status'], estimatedQuote?: number) => {
    setCustomRequests(prev => prev.map(r => r.id === reqId ? { 
      ...r, 
      status, 
      estimatedQuote: estimatedQuote !== undefined ? estimatedQuote : r.estimatedQuote 
    } : r));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee,
        promoCode,
        discountAmount,
        applyPromoCode,
        removePromoCode,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isCustomCakeOpen,
        setIsCustomCakeOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        trackingOrderNumber,
        setTrackingOrderNumber,
        isAdminOpen,
        setIsAdminOpen,
        orders,
        createOrder,
        updateOrderStatus,
        customRequests,
        submitCustomRequest,
        updateCustomRequestStatus,
        activeCategoryFilter,
        setActiveCategoryFilter,
        activeOccasionFilter,
        setActiveOccasionFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        confirmedOrder,
        setConfirmedOrder,
        currentPath,
        navigateTo,
        galleryItems,
        addGalleryPhoto,
        deleteGalleryPhoto,
        setCakeImageFromGallery
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
