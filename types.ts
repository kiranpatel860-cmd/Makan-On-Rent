export enum PropertyType {
  Apartment = 'Apartment',
  Villa = 'Villa',
  Duplex = 'Duplex',
  Tenement = 'Tenement',
  Shop = 'Shop',
  Office = 'Office',
  Showroom = 'Showroom',
  Other = 'Other'
}

export enum Category {
  Residential = 'Residential',
  Commercial = 'Commercial'
}

export enum Furnishing {
  Furnished = 'Furnished',
  SemiFurnished = 'Semi-Furnished',
  Unfurnished = 'Unfurnished'
}

export enum ListingStatus {
  Active = 'Active',
  Rented = 'Rented',
  Archived = 'Archived'
}

export interface Address {
  city: string;
  locality: string;
  state: string;
  pin: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  category: Category;
  bhk?: number;
  areaSqFt: number;
  rent: number;
  maintenance?: number;
  deposit: number;
  furnishing: Furnishing;
  availableDate: string;
  petsAllowed: boolean;
  bachelorAllowed: boolean;
  address: Address;
  images: string[];
  description: string;
  amenities: string[];
  ownerName: string;
  ownerPhone: string; // In real app, hidden until interest shown
  status: ListingStatus;
  postedDate: string;
  verified: boolean;
  listedBy: 'Owner' | 'Broker';
}

export interface FilterState {
  city: string;
  category: string;
  type: string;
  minRent: number;
  maxRent: number;
  bhk: string;
}