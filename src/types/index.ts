export type CakeCategory = 
  | 'Birthday Cakes'
  | 'Wedding Cakes'
  | 'Anniversary Cakes'
  | 'Photo Cakes'
  | 'Cupcakes'
  | 'Customized Cakes'
  | 'Brownies'
  | 'Desserts';

export type CakeOccasion =
  | 'Birthday'
  | 'Wedding'
  | 'Anniversary'
  | 'Engagement'
  | 'Baby Shower'
  | 'Graduation'
  | "Valentine's Day"
  | 'Eid'
  | 'Corporate Events';

export interface CakeSize {
  id: string;
  name: string;
  weightLabel: string;
  servings: string;
  priceMultiplier: number;
}

export interface CakeFlavor {
  id: string;
  name: string;
  description: string;
  extraPrice: number;
}

export interface CakeAddOn {
  id: string;
  name: string;
  price: number;
  description?: string;
  selected?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CakeCategory;
  occasion?: CakeOccasion[];
  shortDescription: string;
  fullDescription: string;
  basePrice: number; // Base price in PKR for standard size (e.g. 2 Lbs)
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isEgglessAvailable: boolean;
  preparationTime: string;
  availableSizes: CakeSize[];
  availableFlavors: CakeFlavor[];
  ingredients: string[];
}

export interface CartItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: CakeSize;
  selectedFlavor: CakeFlavor;
  isEggless: boolean;
  cakeMessage: string;
  topperText: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  selectedAddOns: CartItemAddOn[];
  quantity: number;
  unitPrice: number; // Computed with size multiplier + flavor + addons
  totalPrice: number;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Baking'
  | 'Ready for Delivery'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 
  | 'Cash on Delivery'
  | 'Easypaisa'
  | 'JazzCash'
  | 'Bank Transfer';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  deliveryAddress: string;
  landmark?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Paid' | 'Cash On Delivery';
  status: OrderStatus;
  riderDetails?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

export interface CustomCakeRequest {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  city: string;
  occasion: string;
  preferredFlavor: string;
  size: string;
  theme: string;
  colorPreference: string;
  messageOnCake: string;
  referenceImageUrl?: string;
  deliveryDate: string;
  additionalInstructions: string;
  status: 'Pending Review' | 'Quoted' | 'In Production' | 'Rejected' | 'Completed';
  estimatedQuote?: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  cakeOrdered: string;
  avatarUrl?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: string;
  dateAdded: string;
  likes?: number;
}
