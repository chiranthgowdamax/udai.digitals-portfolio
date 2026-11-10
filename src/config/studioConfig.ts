/**
 * Central Studio Configuration — UDai Digitals
 *
 * Edit this file to update studio copy, portfolio image paths, project verification status,
 * or contact channels.
 *
 * To add your portfolio images later:
 * Simply place your image files in the `/public` folder matching `image` below:
 * - `/public/brightpath.png`
 * - `/public/chill-cat-product.png`
 * - `/public/chill-cat-deepavali.png`
 * - `/public/sudhanya-biryani.png`
 * Until those files are placed in `/public`, clean editorial placeholders are shown.
 */

export interface PortfolioProject {
  id: string;
  fileName: string;
  /**
   * Path to your image inside `/public` (e.g. `/brightpath.png`).
   * Leave empty or keep the path—if the file isn't in `/public` yet,
   * the card automatically displays a clean editorial placeholder slot.
   */
  image: string;
  project: string;
  category: 'Education Campaign' | 'Product Advertising' | 'Seasonal Campaign' | 'Restaurant Advertising';
  label: string;
  aspectRatio: '3:4' | '4:3';
  dimensionsHint: string;
  alt: string;
  summary: string;
  creativeDirection: string;
  deliverables: string[];
  /**
   * Only display the fourth project (or any project) when its contact details,
   * website, and QR code have been verified or removed.
   */
  isVerified: boolean;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  businessValue: string;
  idealFor: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ContactConfig {
  /**
   * Full Instagram profile URL or handle (e.g., "https://instagram.com/yourhandle").
   * Leave empty ("") to hide the Instagram button.
   */
  instagram: string;
  /**
   * Full WhatsApp link or phone number in international format (e.g., "https://wa.me/919876543210").
   * Leave empty ("") to hide the WhatsApp button.
   */
  whatsapp: string;
  /**
   * Direct contact email address (e.g., "hello@example.com").
   * Leave empty ("") to hide the Email button.
   */
  email: string;
  /**
   * Studio location displayed in the Contact and Footer sections.
   */
  location: string;
}

export const STUDIO_CONFIG = {
  brand: {
    name: 'UDai Digitals',
    logo: '/assets/aistudio/Udai.digital_logo_699b6ec1.jpg',
    logoSubtext: 'Get Seen. Get Sales.',
    category: 'AI-Assisted Creative Studio',
    tagline: 'Creative thinking. Visual execution.',
    locationShort: 'HASSAN, INDIA',
    locationFull: 'Hassan, Karnataka, India',
    positioning:
      'We help businesses turn their ideas into compelling promotional visuals and digital content through creative direction and AI-assisted design.',
    targetCustomers: [
      'Restaurants and cafes',
      'Ice cream and food brands',
      'Clothing stores',
      'Education and coaching centres',
      'Local businesses and startups',
    ],
  },

  hero: {
    kicker: 'INDEPENDENT CREATIVE STUDIO · HASSAN, INDIA',
    headline: 'Make your brand impossible to ignore.',
    supportingText:
      'We transform business ideas into compelling visuals, creative campaigns and digital content using AI-assisted design and human creative direction.',
    primaryCta: 'Explore Our Work',
    secondaryCta: 'Start a Project',
  },

  portfolioDisclosure:
    'All works presented in this gallery are self-initiated independent concept projects created to demonstrate creative direction and visual execution. They are not commissioned, endorsed, or affiliated with any third-party institutions or brands.',

  projects: [
    {
      id: 'brightpath-academy',
      fileName: 'brightpath.png',
      image: '/brightpath.png',
      project: 'BrightPath Academy',
      category: 'Education Campaign',
      label: 'Independent Concept Project',
      aspectRatio: '3:4',
      dimensionsHint: '3:4 Portrait Poster · Drop brightpath.png in /public',
      alt: 'BrightPath Academy — Education Campaign (Independent Concept Project)',
      summary:
        'An aspirational admissions and brand awareness visual designed for coaching centres and modern educational academies.',
      creativeDirection:
        'Warm natural lighting and authentic collaborative composition replace stiff stock-photo clichés, communicating academic confidence and modern mentorship.',
      deliverables: ['Admissions Poster Visual', 'Social Media Announcement', 'Digital Display Key Art'],
      isVerified: true,
    },
    {
      id: 'chill-cat-product',
      fileName: 'chill-cat-product.png',
      image: '/chill-cat-product.png',
      project: 'The Chill Cat',
      category: 'Product Advertising',
      label: 'Independent Concept Project',
      aspectRatio: '3:4',
      dimensionsHint: '3:4 Portrait Ad · Drop chill-cat-product.png in /public',
      alt: 'The Chill Cat — Product Advertising (Independent Concept Project)',
      summary:
        'Tactile, appetite-first product advertising concept crafted for an independent artisanal ice cream and dessert label.',
      creativeDirection:
        'Close-up macro texture, natural stone staging, and warm directional studio light highlight ingredient quality and make the product the unmistakable hero.',
      deliverables: ['Hero Product Key Visual', 'Instagram Feed Post', 'In-Store Menu Board Graphic'],
      isVerified: true,
    },
    {
      id: 'chill-cat-deepavali',
      fileName: 'chill-cat-deepavali.png',
      image: '/chill-cat-deepavali.png',
      project: 'The Chill Cat',
      category: 'Seasonal Campaign',
      label: 'Independent Concept Project',
      aspectRatio: '3:4',
      dimensionsHint: '3:4 Seasonal Poster · Drop chill-cat-deepavali.png in /public',
      alt: 'The Chill Cat — Seasonal Campaign (Independent Concept Project)',
      summary:
        'A festive Deepavali edition campaign pairing traditional celebration warmth with contemporary dessert packaging.',
      creativeDirection:
        'Balances festive diyas, marigold florals, and warm lighting so the seasonal atmosphere elevates the product without overwhelming brand clarity.',
      deliverables: ['Festival Campaign Poster', 'Seasonal Gifting Promo', 'Instagram Story & Feed Suite'],
      isVerified: true,
    },
    {
      id: 'sudhanya-biryani-adda',
      fileName: 'sudhanya-biryani.png',
      image: '/sudhanya-biryani.png',
      project: 'Sudhanya Biryani Adda',
      category: 'Restaurant Advertising',
      label: 'Independent Concept Project',
      aspectRatio: '4:3',
      dimensionsHint: '4:3 Landscape Creative · Drop sudhanya-biryani.png in /public',
      alt: 'Sudhanya Biryani Adda — Restaurant Advertising (Independent Concept Project)',
      summary:
        'High-contrast culinary promotion designed to highlight authentic preparation, rich spices, and dining warmth for local restaurants.',
      creativeDirection:
        'Dramatic side lighting and traditional cookware create immediate culinary appeal. Only display after contact details, website, and QR code have been verified or removed.',
      deliverables: ['Signature Dish Promotion', 'Social Media Ad Creative', 'Delivery Banner Visual'],
      isVerified: true,
    },
  ] satisfies PortfolioProject[],

  services: [
    {
      id: 'promotional-design',
      index: '01',
      title: 'Promotional Design',
      shortDescription: 'Social media posters, advertisements and announcements.',
      businessValue:
        'Clear, well-structured visuals that communicate your offer, launch, or special event at a glance—helping your business stand out from generic template graphics.',
      idealFor: ['New store openings', 'Course admissions', 'Special menu announcements'],
    },
    {
      id: 'product-advertising',
      index: '02',
      title: 'Product Advertising',
      shortDescription: 'Attractive product visuals and promotional compositions.',
      businessValue:
        'Present your food items, garments, or retail products in refined visual settings with intentional lighting and composition—without the cost of complex studio set builds.',
      idealFor: ['Food & dessert menus', 'Apparel lookbooks', 'Packaged consumer goods'],
    },
    {
      id: 'social-media-creatives',
      index: '03',
      title: 'Social Media Creatives',
      shortDescription: 'Consistent visual content for Instagram and other platforms.',
      businessValue:
        'Maintain a cohesive, professional visual identity across your digital profiles with thoughtfully art-directed posts and stories tailored to your brand personality.',
      idealFor: ['Instagram feed posts', 'Story announcements', 'Digital catalog highlights'],
    },
    {
      id: 'festival-campaigns',
      index: '04',
      title: 'Festival Campaigns',
      shortDescription: 'Seasonal promotions and occasion-based creatives.',
      businessValue:
        'Celebrate regional festivals and seasonal moments with custom-crafted campaign visuals that connect culturally while keeping your product front and center.',
      idealFor: ['Deepavali & festive offers', 'Seasonal collections', 'Holiday dining specials'],
    },
  ] satisfies ServiceItem[],

  process: [
    {
      number: '01',
      title: 'Discover',
      description: 'Understand the business, target audience and requirements.',
      detail: 'We start by clarifying what you offer, who your customers are, and the exact message your visual needs to communicate.',
    },
    {
      number: '02',
      title: 'Conceptualize',
      description: 'Develop creative ideas and visual directions.',
      detail: 'We define the mood, composition, colour palette, and typographic direction before production begins.',
    },
    {
      number: '03',
      title: 'Create',
      description: 'Produce and refine content using AI-assisted workflows and human editing.',
      detail: 'Every visual is generated, curated, retouched, and art-directed by hand to ensure commercial quality and visual accuracy.',
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'Provide polished, ready-to-publish creative assets.',
      detail: 'You receive high-resolution, properly formatted files ready for Instagram, WhatsApp broadcasts, digital ads, or print.',
    },
  ] satisfies ProcessStep[],

  about: {
    headline: 'Small studio. Big creative thinking.',
    paragraphs: [
      "I'm Chiru, an independent creative building visual experiences for businesses through UDai Digitals. I combine AI-assisted production, design thinking and an interest in technology to create purposeful promotional content.",
      'Based in Hassan, Karnataka, I aim to help local businesses communicate their value through better digital content.',
    ],
    principles: [
      {
        title: 'Human Creative Direction',
        detail: 'Tools assist the workflow, but taste, composition, and brand clarity guide every decision.',
      },
      {
        title: 'Commercial Purpose',
        detail: 'Every visual is designed to communicate clearly with real customers—not just look abstractly artistic.',
      },
      {
        title: 'Direct Collaboration',
        detail: 'Work directly with the creator from initial idea to final asset delivery, with clear communication at every step.',
      },
    ],
  },

  contact: {
    headline: 'Have something worth showing the world?',
    supportingText: "Let's create something meaningful for your business.",
    /**
     * Central editable contact details.
     * Keep strings empty ("") until verified contact handles are ready.
     * Any empty channel is automatically hidden in the interface.
     */
    channels: {
      instagram: 'udai.digital',
      whatsapp: '6361055190',
      email: 'udai.digitals@gmail.com',
      location: 'Hassan, Karnataka, India',
    } satisfies ContactConfig,
  },
};
