import { Product, CakeCategory, CakeOccasion, CakeSize, CakeFlavor, CakeAddOn, Review, Order, CustomCakeRequest, GalleryItem } from '../types';

export const HERO_PINK_ROSE_CAKE = '/src/assets/images/cake_shop_hero_rose_1790417479675.jpg';
export const HERO_IMAGE = HERO_PINK_ROSE_CAKE;
export const CHOCOLATE_CAKE_IMAGE = '/src/assets/images/cake_chocolate_truffle_1790416770704.jpg';
export const RED_VELVET_IMAGE = '/src/assets/images/cake_red_velvet_1790416794246.jpg';
export const MANGO_CAKE_IMAGE = '/src/assets/images/cake_mango_tropical_1790417496175.jpg';
export const CUPCAKES_IMAGE = '/src/assets/images/cake_cupcakes_trio_1790417512414.jpg';
export const PHOTO_CAKE_IMAGE = '/src/assets/images/cake_photo_edible_1790417526433.jpg';
export const WEDDING_CAKE_IMAGE = '/src/assets/images/hero_luxury_cake_1790416757744.jpg';
export const LOTUS_CAKE_IMAGE = '/src/assets/images/cake_lotus_biscoff_1790416782758.jpg';
export const ATELIER_IMAGE = '/src/assets/images/bakery_atelier_story_1790416805910.jpg';

export const STANDARD_SIZES: CakeSize[] = [
  { id: 'size-1.5', name: '1.5 Lbs (Standard)', weightLabel: '1.5 Lb', servings: '4 - 6 Slices', priceMultiplier: 0.85 },
  { id: 'size-2', name: '2 Lbs (Classic)', weightLabel: '2.0 Lbs', servings: '8 - 10 Slices', priceMultiplier: 1.0 },
  { id: 'size-3', name: '3 Lbs (Family)', weightLabel: '3.0 Lbs', servings: '12 - 16 Slices', priceMultiplier: 1.45 },
  { id: 'size-5', name: '5 Lbs (Grand Celebration)', weightLabel: '5.0 Lbs', servings: '20 - 25 Slices', priceMultiplier: 2.3 }
];

export const STANDARD_FLAVORS: CakeFlavor[] = [
  { id: 'flv-signature', name: 'Signature Baker’s Blend', description: 'Rich moist sponge with delicate whipped cream and light syrup', extraPrice: 0 },
  { id: 'flv-chocolate', name: 'Rich Belgian Chocolate Fudge', description: 'Silky dark chocolate ganache and chocolate curls', extraPrice: 200 },
  { id: 'flv-red-velvet', name: 'Velvet Cocoa & Cream Cheese', description: 'Crimson cocoa crumb with tangy cream cheese frosting', extraPrice: 250 },
  { id: 'flv-fresh-vanilla', name: 'French Madagascar Vanilla', description: 'Fragrant vanilla sponge with Swiss meringue buttercream', extraPrice: 0 },
  { id: 'flv-mango', name: 'Pakistani Chaunsa & Alphonso Mango', description: 'Seasonal mango compote with velvety white chocolate cream', extraPrice: 300 },
  { id: 'flv-lotus', name: 'Lotus Biscoff Crunch Speculoos', description: 'Caramelized speculoos cookie butter with biscuit crunch', extraPrice: 350 }
];

export const STANDARD_ADDONS: CakeAddOn[] = [
  { id: 'add-candle', name: 'Birthday Candle & Matchbox Set', price: 150, description: 'Golden celebration candle set' },
  { id: 'add-topper', name: 'Acrylic "Happy Birthday" / "Forever" Topper', price: 350, description: 'Gold mirror acrylic keepsake topper' },
  { id: 'add-card', name: 'Handwritten Greeting Note', price: 180, description: 'Custom printed card with your warm message' },
  { id: 'add-sparkler', name: 'Celebration Sparkler Candle', price: 250, description: 'Safe indoor celebration sparkler' },
  { id: 'add-extra-chocolate', name: 'Extra Molten Chocolate Drip Sauce', price: 300, description: 'Warm Belgian fudge dipping cup' },
  { id: 'add-gift-bag', name: 'Pink Ribbon Luxury Gift Bag', price: 400, description: 'Beautiful insulated presentation bag' }
];

// Circular Category Section as seen in reference image
export const CATEGORIES_LIST: { id: CakeCategory; name: string; image: string; tag: string }[] = [
  { id: 'Birthday Cakes', name: 'Birthday Cakes', image: CHOCOLATE_CAKE_IMAGE, tag: 'Celebrations' },
  { id: 'Wedding Cakes', name: 'Wedding Cakes', image: WEDDING_CAKE_IMAGE, tag: 'Tiered Confections' },
  { id: 'Anniversary Cakes', name: 'Anniversary Cakes', image: HERO_PINK_ROSE_CAKE, tag: 'Romantic' },
  { id: 'Photo Cakes', name: 'Photo Cakes', image: PHOTO_CAKE_IMAGE, tag: 'Edible Prints' },
  { id: 'Cupcakes', name: 'Cupcakes', image: CUPCAKES_IMAGE, tag: 'Petite Delights' },
  { id: 'Customized Cakes', name: 'Customized Cakes', image: HERO_PINK_ROSE_CAKE, tag: 'Bespoke Dreams' },
  { id: 'Brownies', name: 'Brownies', image: CHOCOLATE_CAKE_IMAGE, tag: 'Fudgy Squares' },
  { id: 'Desserts', name: 'Desserts', image: MANGO_CAKE_IMAGE, tag: 'Sweet Treats' }
];

export const OCCASIONS_LIST: { id: CakeOccasion; name: string; subtitle: string; image: string }[] = [
  { id: 'Birthday', name: 'Birthday Splendor', subtitle: 'Show-stopping centerpieces for loved ones', image: CHOCOLATE_CAKE_IMAGE },
  { id: 'Wedding', name: 'Wedding Tiers', subtitle: 'Multi-tiered bridal confections', image: WEDDING_CAKE_IMAGE },
  { id: 'Anniversary', name: 'Anniversary Romance', subtitle: 'Blush florals and golden accents', image: HERO_PINK_ROSE_CAKE },
  { id: 'Engagement', name: 'Engagement Elegance', subtitle: 'Celebratory rings & intimate gatherings', image: WEDDING_CAKE_IMAGE },
  { id: 'Baby Shower', name: 'Baby Shower Pastels', subtitle: 'Delicate clouds & sweet teddy themes', image: HERO_PINK_ROSE_CAKE },
  { id: 'Graduation', name: 'Graduation Milestones', subtitle: 'Celebrate scholastic triumph', image: CHOCOLATE_CAKE_IMAGE },
  { id: "Valentine's Day", name: "Valentine's Passion", subtitle: 'Velvet hearts and sweet berries', image: RED_VELVET_IMAGE },
  { id: 'Eid', name: 'Eid Mubarak Grandeur', subtitle: 'Pistachios, rose and sweet festive joy', image: WEDDING_CAKE_IMAGE },
  { id: 'Corporate Events', name: 'Corporate Events', subtitle: 'Professional branded cake centerpieces', image: CHOCOLATE_CAKE_IMAGE }
];

// Products matching the exact reference image bestsellers cards
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-chocolate-delight',
    name: 'Chocolate Delight',
    slug: 'chocolate-delight',
    category: 'Birthday Cakes',
    occasion: ['Birthday', 'Anniversary', 'Corporate Events'],
    shortDescription: 'Decadent rich dark chocolate sponge with molten chocolate rosettes and chocolate wafer sticks.',
    fullDescription: 'Our #1 bestseller. Baked using rich Dutch cocoa and premium chocolate ganache, decorated with piped rosettes, milk chocolate curls, and crunchy wafer rolls. Perfectly moist, rich, and balanced.',
    basePrice: 2499,
    originalPrice: 2899,
    discountPercentage: 14,
    images: [CHOCOLATE_CAKE_IMAGE, HERO_PINK_ROSE_CAKE, RED_VELVET_IMAGE],
    rating: 5.0,
    reviewCount: 120,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (3-4 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Imported Dark Chocolate', 'Dairy Butter', 'Dutch Cocoa', 'Fresh Cream', 'Pure Vanilla']
  },
  {
    id: 'prod-red-velvet-cake',
    name: 'Red Velvet Cake',
    slug: 'red-velvet-cake',
    category: 'Anniversary Cakes',
    occasion: ['Anniversary', "Valentine's Day", 'Birthday'],
    shortDescription: 'Velvety crimson sponge layered with fluffy cream cheese rosettes and ruby red velvet crumbs.',
    fullDescription: 'A classic romantic confection. Soft, tender ruby red cocoa sponge layered with delicate Philadelphia cream cheese frosting, finished with intricate piped rosettes and fresh berry accents.',
    basePrice: 2699,
    originalPrice: 2999,
    discountPercentage: 10,
    images: [RED_VELVET_IMAGE, HERO_PINK_ROSE_CAKE],
    rating: 5.0,
    reviewCount: 99,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (3-4 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Red Cocoa Sponge', 'Whipped Cream Cheese', 'Buttermilk', 'Fresh Cream', 'Vanilla Bean']
  },
  {
    id: 'prod-black-forest-cake',
    name: 'Black Forest Cake',
    slug: 'black-forest-cake',
    category: 'Birthday Cakes',
    occasion: ['Birthday', 'Anniversary', 'Graduation'],
    shortDescription: 'Traditional German chocolate sponge layered with tart cherries and fresh dairy whipped cream.',
    fullDescription: 'Timeless European favorite. Light dark chocolate sponge infused with sweet cherry syrup, generous layers of fresh Chantilly cream, juicy Morello cherries, and covered in dark chocolate shavings.',
    basePrice: 2399,
    originalPrice: 2650,
    discountPercentage: 10,
    images: [CHOCOLATE_CAKE_IMAGE, RED_VELVET_IMAGE],
    rating: 5.0,
    reviewCount: 110,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (3-4 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Dark Chocolate Sponge', 'Morello Cherries', 'Dairy Whipped Cream', 'Chocolate Shavings']
  },
  {
    id: 'prod-mango-cake',
    name: 'Mango Cake',
    slug: 'mango-cake',
    category: 'Desserts',
    occasion: ['Birthday', 'Eid', 'Anniversary'],
    shortDescription: 'Golden tropical delight with fresh Pakistani mango slices, whipped cream rosettes and rich mango glaze.',
    fullDescription: 'Fresh and fruity. Soft vanilla sponge soaked in sweet mango nectar, layered with real Chaunsa mango puree and whipped cream, crowned with luscious fresh mango rosettes and white chocolate drops.',
    basePrice: 2299,
    originalPrice: 2599,
    discountPercentage: 12,
    images: [MANGO_CAKE_IMAGE, HERO_PINK_ROSE_CAKE],
    rating: 5.0,
    reviewCount: 85,
    isBestseller: true,
    isNewArrival: true,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (3-4 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Fresh Pakistani Mango Pulp', 'Whipped Cream', 'Chiffon Sponge', 'White Chocolate Glaze']
  },
  {
    id: 'prod-pink-rose-celebration',
    name: 'Blush Rose Celebration Cake',
    slug: 'blush-rose-celebration-cake',
    category: 'Anniversary Cakes',
    occasion: ['Birthday', 'Anniversary', 'Wedding'],
    shortDescription: 'Signature soft pink buttercream celebration cake crowned with fresh pink roses and sugar pearls.',
    fullDescription: 'As seen in our flagship collection. Delicate vanilla and strawberry cream sponge frosted in smooth blush pink buttercream, topped with hand-arranged fresh pink roses, edible pearls, and elegant piping.',
    basePrice: 2899,
    originalPrice: 3200,
    discountPercentage: 10,
    images: [HERO_PINK_ROSE_CAKE, RED_VELVET_IMAGE],
    rating: 5.0,
    reviewCount: 142,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (4 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Strawberry Puree', 'French Buttercream', 'Organic Rose Petals', 'Madagascar Vanilla']
  },
  {
    id: 'prod-edible-photo-cake',
    name: 'Bespoke Photo Cake',
    slug: 'bespoke-photo-cake',
    category: 'Photo Cakes',
    occasion: ['Birthday', 'Anniversary', 'Graduation'],
    shortDescription: 'High-definition edible sugar print of your chosen photograph bordered by piped rosettes.',
    fullDescription: 'Create memories that last. High-definition edible sugar print using food-grade FDA approved colors, bordered by sweet hand-piped pink and white buttercream rosettes.',
    basePrice: 2999,
    originalPrice: 3400,
    discountPercentage: 12,
    images: [PHOTO_CAKE_IMAGE, HERO_PINK_ROSE_CAKE],
    rating: 4.95,
    reviewCount: 94,
    isBestseller: false,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (5 Hours Lead Time)',
    availableSizes: STANDARD_SIZES,
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Edible Fondant Paper', 'Food Safe Colors', 'Moist Sponge', 'Buttercream Frosting']
  },
  {
    id: 'prod-gourmet-cupcakes-pack',
    name: 'Artisan Cupcakes (Box of 6)',
    slug: 'artisan-cupcakes-box-of-6',
    category: 'Cupcakes',
    occasion: ['Birthday', 'Baby Shower', 'Corporate Events'],
    shortDescription: 'Assorted cupcakes: Double Chocolate, Red Velvet, Vanilla Rose and Salted Caramel.',
    fullDescription: 'Box of six freshly baked artisan cupcakes beautifully presented in our signature window gift box with pink satin ribbon.',
    basePrice: 1850,
    images: [CUPCAKES_IMAGE, CHOCOLATE_CAKE_IMAGE],
    rating: 4.92,
    reviewCount: 77,
    isBestseller: false,
    isNewArrival: true,
    isEgglessAvailable: true,
    preparationTime: 'Same Day (2 Hours Lead Time)',
    availableSizes: [
      { id: 'size-cup-6', name: 'Box of 6 Cupcakes', weightLabel: '6 Pcs', servings: '6 Servings', priceMultiplier: 1.0 },
      { id: 'size-cup-12', name: 'Box of 12 Cupcakes', weightLabel: '12 Pcs', servings: '12 Servings', priceMultiplier: 1.85 }
    ],
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['Assorted Flavors', 'Pure Butter', 'Cocoa Powder', 'Vanilla']
  },
  {
    id: 'prod-wedding-tiers-grand',
    name: 'Royal Multi-Tier Wedding Cake',
    slug: 'royal-multi-tier-wedding-cake',
    category: 'Wedding Cakes',
    occasion: ['Wedding', 'Engagement'],
    shortDescription: 'Three-tiered architectural bridal cake accented with fresh pastel blooms and edible pearls.',
    fullDescription: 'Designed for memorable Pakistan wedding celebrations. Three tiers of moist sponge, smooth white meringue buttercream, and fresh cascading floral clusters.',
    basePrice: 9500,
    originalPrice: 11000,
    discountPercentage: 14,
    images: [WEDDING_CAKE_IMAGE, HERO_PINK_ROSE_CAKE],
    rating: 5.0,
    reviewCount: 68,
    isBestseller: true,
    isNewArrival: false,
    isEgglessAvailable: true,
    preparationTime: '24 Hours Advance Notice Required',
    availableSizes: [
      { id: 'size-tier-2', name: '2 Tiers (5 Lbs)', weightLabel: '5.0 Lbs', servings: '20 - 25 Slices', priceMultiplier: 1.0 },
      { id: 'size-tier-3', name: '3 Tiers (8 Lbs)', weightLabel: '8.0 Lbs', servings: '35 - 45 Slices', priceMultiplier: 1.6 }
    ],
    availableFlavors: STANDARD_FLAVORS,
    ingredients: ['European Buttercream', 'Fluffy Vanilla & Chocolate Tiers', 'Fresh Flowers']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Ayesha Khan',
    city: 'DHA Phase 5, Lahore',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Chocolate Delight was completely divine! Arrived on time with sparkler candles and the presentation was exactly like the photos. Will definitely order for all our birthdays.',
    cakeOrdered: 'Chocolate Delight'
  },
  {
    id: 'rev-2',
    author: 'Omer Farooq',
    city: 'Clifton Block 2, Karachi',
    rating: 5,
    date: '3 days ago',
    comment: 'Ordered the Red Velvet Cake for our 5th anniversary. Super soft sponge and the cream cheese frosting was perfection. Paid via JazzCash with instant confirmation on WhatsApp.',
    cakeOrdered: 'Red Velvet Cake'
  },
  {
    id: 'rev-3',
    author: 'Zainab Tariq',
    city: 'F-8/3, Islamabad',
    rating: 5,
    date: '1 week ago',
    comment: 'The Mango Cake was refreshing and full of authentic Chaunsa mango flavor. Fast delivery and courteous rider. Highly recommend CakeShop!',
    cakeOrdered: 'Mango Cake'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10291',
    orderNumber: 'CS-10291',
    createdAt: '2026-09-26T09:40:00.000Z',
    items: [
      {
        cartItemId: 'item-101',
        product: INITIAL_PRODUCTS[0],
        selectedSize: STANDARD_SIZES[1],
        selectedFlavor: STANDARD_FLAVORS[0],
        isEggless: false,
        cakeMessage: 'Happy 25th Birthday Zainab!',
        topperText: 'Happy Birthday',
        deliveryDate: '2026-09-26',
        deliveryTimeSlot: 'Evening (6:00 PM - 9:00 PM)',
        selectedAddOns: [
          { id: 'add-topper', name: 'Acrylic "Happy Birthday" Topper', price: 350 },
          { id: 'add-sparkler', name: 'Celebration Sparkler Candle', price: 250 }
        ],
        quantity: 1,
        unitPrice: 3099,
        totalPrice: 3099
      }
    ],
    customer: {
      fullName: 'Bilal Ahmad',
      phone: '+92 300 1234567',
      email: 'bilal.ahmad@gmail.com',
      city: 'Lahore',
      deliveryAddress: 'House 54, Street 12, Sector W, DHA Phase 3, Lahore',
      landmark: 'Near Y-Block Market',
      deliveryDate: '2026-09-26',
      deliveryTimeSlot: 'Evening (6:00 PM - 9:00 PM)',
      orderNotes: 'Please ring bell twice, surprise cake for sister!'
    },
    subtotal: 3099,
    deliveryFee: 0,
    discount: 310,
    promoCode: 'LOVE10',
    total: 2789,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Cash On Delivery',
    status: 'Baking',
    riderDetails: {
      name: 'Muhammad Imran',
      phone: '+92 302 9845123',
      vehicle: 'Refrigerated Delivery Van # LEA-7821'
    }
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomCakeRequest[] = [
  {
    id: 'cst-301',
    createdAt: '2026-09-26T08:15:00.000Z',
    customerName: 'Sana Sheikh',
    phone: '+92 321 7894561',
    city: 'Karachi',
    occasion: 'Engagement Ceremony',
    preferredFlavor: 'Chocolate Fudge & Red Velvet',
    size: '2 Tiers (5 Lbs)',
    theme: 'Blush Pink Roses with White Pearl Trim',
    colorPreference: 'Soft baby pink and pure white cream',
    messageOnCake: 'Together Forever • Sana & Hamza',
    referenceImageUrl: HERO_PINK_ROSE_CAKE,
    deliveryDate: '2026-10-02',
    additionalInstructions: 'Need delivered to Carlton Hotel Karachi at 5 PM sharp.',
    status: 'Quoted',
    estimatedQuote: 7500
  }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala'
];

export const TIME_SLOTS = [
  'Morning (10:00 AM - 1:00 PM)',
  'Afternoon (2:00 PM - 5:00 PM)',
  'Evening (6:00 PM - 9:00 PM)',
  'Midnight Surprise (11:30 PM - 12:15 AM)'
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    url: HERO_PINK_ROSE_CAKE,
    title: 'Signature Rose Celebration Cake',
    caption: 'Soft pastel pink strawberry sponge crowned with fresh organic roses and piped rosettes.',
    category: 'Birthday Cakes',
    dateAdded: '2026-09-20',
    likes: 842
  },
  {
    id: 'gal-2',
    url: CHOCOLATE_CAKE_IMAGE,
    title: 'Belgian Molten Ganache Truffle',
    caption: 'Rich triple-layer chocolate fudge with artisanal couverture drip and golden sugar balls.',
    category: 'Chocolate',
    dateAdded: '2026-09-21',
    likes: 915
  },
  {
    id: 'gal-3',
    url: LOTUS_CAKE_IMAGE,
    title: 'Lotus Biscoff Crunch Speculoos',
    caption: 'Crunchy caramelized Biscoff drip with fresh Speculoos buttercream rosettes.',
    category: 'Desserts',
    dateAdded: '2026-09-22',
    likes: 720
  },
  {
    id: 'gal-4',
    url: RED_VELVET_IMAGE,
    title: 'Crimson Velvet Cream Cheese',
    caption: 'Velvet cocoa layers paired with tangy Philadelphia cream cheese frosting.',
    category: 'Birthday Cakes',
    dateAdded: '2026-09-23',
    likes: 654
  },
  {
    id: 'gal-5',
    url: WEDDING_CAKE_IMAGE,
    title: 'Grand Royal 3-Tier Wedding Tier',
    caption: 'Opulent white and blush wedding masterpiece adorned with edible 24k gold leaf.',
    category: 'Wedding Cakes',
    dateAdded: '2026-09-24',
    likes: 1240
  },
  {
    id: 'gal-6',
    url: MANGO_CAKE_IMAGE,
    title: 'Chaunsa Mango Tropical Blossom',
    caption: 'Fresh Pakistani mango compote layered with light vanilla cream and mint leaves.',
    category: 'Desserts',
    dateAdded: '2026-09-24',
    likes: 588
  },
  {
    id: 'gal-7',
    url: CUPCAKES_IMAGE,
    title: 'Artisanal Frosted Cupcake Trio',
    caption: 'Handcrafted cupcakes featuring chocolate ganache, red velvet and pink vanilla swirl.',
    category: 'Cupcakes',
    dateAdded: '2026-09-25',
    likes: 472
  },
  {
    id: 'gal-8',
    url: PHOTO_CAKE_IMAGE,
    title: 'Custom Edible Photo Cake',
    caption: 'Personalized edible sugar print framed in delicate pink buttercream pearls.',
    category: 'Photo Cakes',
    dateAdded: '2026-09-25',
    likes: 610
  }
];
