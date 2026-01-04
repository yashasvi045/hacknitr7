export interface Landmark {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  images: string[];
  funFacts: string[];
  country: string;
  category: string;
}

export const landmarks: Landmark[] = [
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    description: "The iconic iron lattice tower on the Champ de Mars in Paris, France. Built in 1889 as the entrance arch for the World's Fair, it has become a global cultural icon of France.",
    coordinates: {
      lat: 48.8584,
      lng: 2.2945,
    },
    imageUrl: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "The tower was supposed to be dismantled after 20 years",
      "It grows about 6 inches taller in summer due to heat expansion",
      "Over 7 million people visit each year",
      "The tower has 1,665 steps to the top"
    ],
    country: "France",
    category: "Monument"
  },
  {
    id: "colosseum",
    name: "Colosseum",
    description: "An ancient amphitheater in the center of Rome, Italy. The largest ancient amphitheater ever built, it could hold up to 80,000 spectators for gladiatorial contests and public spectacles.",
    coordinates: {
      lat: 41.8902,
      lng: 12.4922,
    },
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548585744-465e96324a94?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "Construction took only 8 years (72-80 AD)",
      "It had a retractable awning system called velarium",
      "Free admission was provided to all Roman citizens",
      "Naval battles were sometimes staged inside"
    ],
    country: "Italy",
    category: "Historical Site"
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    description: "An ivory-white marble mausoleum in Agra, India. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, it's considered the jewel of Muslim art in India.",
    coordinates: {
      lat: 27.1751,
      lng: 78.0421,
    },
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "It took 22 years and 20,000 workers to complete",
      "The minarets are slightly tilted outward for safety",
      "It changes color throughout the day",
      "The calligraphy gets larger as it goes higher"
    ],
    country: "India",
    category: "Monument"
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    description: "A 15th-century Incan citadel set high in the Andes Mountains in Peru. This UNESCO World Heritage site is often referred to as the 'Lost City of the Incas'.",
    coordinates: {
      lat: -13.1631,
      lng: -72.545,
    },
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591197172062-c718f82aba20?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "It was never discovered by Spanish conquistadors",
      "Over 60% of the construction is underground",
      "The site has over 150 buildings",
      "No wheels were used in its construction"
    ],
    country: "Peru",
    category: "Archaeological Site"
  },
  {
    id: "great-wall",
    name: "Great Wall of China",
    description: "A series of fortifications made of stone, brick, tamped earth, and other materials. Built along the historical northern borders of China to protect against various nomadic groups.",
    coordinates: {
      lat: 40.4319,
      lng: 116.5704,
    },
    imageUrl: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1529921879218-f99546d03a9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517623220883-92744f539184?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "It spans over 13,000 miles in total length",
      "It's not visible from space with the naked eye",
      "Construction began over 2,000 years ago",
      "Sticky rice was used in the mortar"
    ],
    country: "China",
    category: "Historical Site"
  },
  {
    id: "statue-of-liberty",
    name: "Statue of Liberty",
    description: "A colossal neoclassical sculpture on Liberty Island in New York Harbor. A gift from France to the United States, it represents freedom and democracy.",
    coordinates: {
      lat: 40.6892,
      lng: -74.0445,
    },
    imageUrl: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503572165950-741ab5e9d5e3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&h=600&fit=crop"
    ],
    funFacts: [
      "The statue's full name is 'Liberty Enlightening the World'",
      "She wears a size 879 sandal",
      "The crown has 7 rays representing the 7 continents",
      "Lightning strikes her about 600 times per year"
    ],
    country: "USA",
    category: "Monument"
  }
];

export const getLandmarkById = (id: string): Landmark | undefined => {
  return landmarks.find((landmark) => landmark.id === id);
};
