export interface Animal {
  id: number;
  name: string;
  scientificName: string;
  image: string;
  habitat: string;
  funFact: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  discovered: boolean;
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
  type: 'boost' | 'hint' | 'skin' | 'badge';
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export const ANIMALS: Animal[] = [
  {
    id: 1,
    name: 'Peacock',
    scientificName: 'Pavo cristatus',
    image: 'https://images.unsplash.com/photo-1709486814061-f1be5598910f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY3ODY5OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Forests and grasslands in South Asia',
    funFact: 'Male peacocks can have up to 200 colorful feathers in their tail!',
    rarity: 'uncommon',
    discovered: true,
  },
  {
    id: 2,
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    image: 'https://images.unsplash.com/photo-1545906786-f1276396255d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwYW5kYXxlbnwxfHx8fDE3Njc4MTY3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Himalayan forests',
    funFact: 'Red pandas are excellent climbers and spend most of their time in trees!',
    rarity: 'rare',
    discovered: true,
  },
  {
    id: 3,
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    image: 'https://images.unsplash.com/photo-1730194297033-701d97fdc389?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHdpbGRsaWZlfGVufDF8fHx8MTc2Nzg1MTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'African savannas and forests',
    funFact: 'Elephants can communicate using sounds too low for humans to hear!',
    rarity: 'uncommon',
    discovered: true,
  },
  {
    id: 4,
    name: 'Bengal Tiger',
    scientificName: 'Panthera tigris tigris',
    image: 'https://images.unsplash.com/photo-1747680008347-1044a19b5bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWdlciUyMHdpbGR8ZW58MXx8fHwxNzY3ODY5OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Indian subcontinent forests',
    funFact: 'Each tiger has a unique pattern of stripes, like a fingerprint!',
    rarity: 'rare',
    discovered: false,
  },
  {
    id: 5,
    name: 'Dolphin',
    scientificName: 'Delphinus delphis',
    image: 'https://images.unsplash.com/photo-1511220413245-032551094262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2xwaGluJTIwb2NlYW58ZW58MXx8fHwxNzY3ODY5OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Oceans worldwide',
    funFact: 'Dolphins sleep with one eye open to watch for predators!',
    rarity: 'common',
    discovered: true,
  },
  {
    id: 6,
    name: 'Great Horned Owl',
    scientificName: 'Bubo virginianus',
    image: 'https://images.unsplash.com/photo-1627000541127-260ecb511119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvd2wlMjBiaXJkfGVufDF8fHx8MTc2Nzg2OTk0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Americas forests',
    funFact: 'Owls can rotate their heads up to 270 degrees!',
    rarity: 'uncommon',
    discovered: false,
  },
  {
    id: 7,
    name: 'Emperor Penguin',
    scientificName: 'Aptenodytes forsteri',
    image: 'https://images.unsplash.com/photo-1638641569078-bc67cfbcc972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ndWluJTIwY3V0ZXxlbnwxfHx8fDE3Njc4Njk5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Antarctic ice',
    funFact: 'Emperor penguins can dive deeper than any other bird!',
    rarity: 'rare',
    discovered: true,
  },
  {
    id: 8,
    name: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    image: 'https://images.unsplash.com/photo-1650627851849-f81e6853b093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJmbHklMjBjb2xvcmZ1bHxlbnwxfHx8fDE3Njc3NDE3OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'North America',
    funFact: 'Monarch butterflies migrate up to 3,000 miles each year!',
    rarity: 'common',
    discovered: true,
  },
  {
    id: 9,
    name: 'African Lion',
    scientificName: 'Panthera leo',
    image: 'https://images.unsplash.com/photo-1686420724802-87fa967a2eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwd2lsZGxpZmV8ZW58MXx8fHwxNzY3ODY5OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'African grasslands',
    funFact: 'A lion\'s roar can be heard from up to 5 miles away!',
    rarity: 'uncommon',
    discovered: false,
  },
  {
    id: 10,
    name: 'Scarlet Macaw',
    scientificName: 'Ara macao',
    image: 'https://images.unsplash.com/photo-1706611723603-08b59efc309e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjB0cm9waWNhbHxlbnwxfHx8fDE3Njc4Njk5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Central and South American rainforests',
    funFact: 'Macaws can live up to 50 years in the wild!',
    rarity: 'uncommon',
    discovered: true,
  },
  {
    id: 11,
    name: 'Koala',
    scientificName: 'Phascolarctos cinereus',
    image: 'https://images.unsplash.com/photo-1610616649366-93774a4ee9d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2FsYSUyMGF1c3RyYWxpYXxlbnwxfHx8fDE3Njc4Njk5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Australian eucalyptus forests',
    funFact: 'Koalas sleep up to 22 hours a day!',
    rarity: 'rare',
    discovered: false,
  },
  {
    id: 12,
    name: 'Red Fox',
    scientificName: 'Vulpes vulpes',
    image: 'https://images.unsplash.com/photo-1726335849092-a9870a096165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3glMjB3aWxkbGlmZXxlbnwxfHx8fDE3Njc4Njk5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    habitat: 'Forests, grasslands, and urban areas',
    funFact: 'Foxes use Earth\'s magnetic field to hunt prey under snow!',
    rarity: 'common',
    discovered: true,
  },
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 1,
    name: 'Camera Boost',
    description: 'Increase scan accuracy by 25%',
    price: 150,
    icon: 'camera',
    type: 'boost',
  },
  {
    id: 2,
    name: 'Rare Animal Hint',
    description: 'Get a hint about where to find rare animals',
    price: 200,
    icon: 'map-pin',
    type: 'hint',
  },
  {
    id: 3,
    name: 'Safari Theme',
    description: 'Change your UI to a safari adventure theme',
    price: 300,
    icon: 'palette',
    type: 'skin',
  },
  {
    id: 4,
    name: 'Explorer Badge',
    description: 'Show off your discovery skills',
    price: 100,
    icon: 'award',
    type: 'badge',
  },
  {
    id: 5,
    name: 'Double XP',
    description: 'Earn 2x experience points for 24 hours',
    price: 250,
    icon: 'zap',
    type: 'boost',
  },
  {
    id: 6,
    name: 'Ocean Theme',
    description: 'Deep blue ocean-themed UI',
    price: 300,
    icon: 'waves',
    type: 'skin',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: 'First Discovery',
    description: 'Discover your first animal',
    unlocked: true,
    icon: 'star',
  },
  {
    id: 2,
    name: 'Bird Watcher',
    description: 'Discover 5 different bird species',
    unlocked: true,
    icon: 'eye',
  },
  {
    id: 3,
    name: 'Ocean Explorer',
    description: 'Discover 3 marine animals',
    unlocked: false,
    icon: 'anchor',
  },
  {
    id: 4,
    name: 'Rare Hunter',
    description: 'Discover a rare animal',
    unlocked: true,
    icon: 'trophy',
  },
  {
    id: 5,
    name: 'Completionist',
    description: 'Discover all animals',
    unlocked: false,
    icon: 'crown',
  },
];
