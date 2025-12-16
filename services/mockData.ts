import { Property, PropertyType, Category, Furnishing, ListingStatus } from '../types';

export const CITIES = [
  "Agra", "Ahmedabad", "Ajmer", "Akola", "Aligarh", "Allahabad", "Ambala", "Amravati", "Amritsar", "Anand", "Asansol", "Aurangabad", 
  "Bangalore", "Bareilly", "Baroda", "Belgaum", "Bhavnagar", "Bhilai", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bikaner", "Bilaspur", "Bokaro", 
  "Chandigarh", "Chennai", "Coimbatore", "Cuttack", 
  "Dehradun", "Delhi", "Dhanbad", "Durgapur", 
  "Erode", 
  "Faridabad", "Firozabad", 
  "Gandhinagar", "Ghaziabad", "Goa", "Gorakhpur", "Gulbarga", "Guntur", "Gurgaon", "Guwahati", "Gwalior", 
  "Haridwar", "Howrah", "Hubli-Dharwad", "Hyderabad", 
  "Indore", 
  "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamnagar", "Jamshedpur", "Jhansi", "Jodhpur", 
  "Kakinada", "Kalyan-Dombivli", "Kannur", "Kanpur", "Kochi", "Kolhapur", "Kolkata", "Kollam", "Kota", "Kozhikode", "Kurnool", 
  "Lucknow", "Ludhiana", 
  "Madurai", "Malappuram", "Malegaon", "Mangalore", "Meerut", "Mira-Bhayandar", "Moradabad", "Mumbai", "Muzaffarnagar", "Mysore", 
  "Nagpur", "Nanded", "Nashik", "Navi Mumbai", "Nellore", "Noida", 
  "Panipat", "Patiala", "Patna", "Pimpri-Chinchwad", "Pondicherry", "Pune", 
  "Raipur", "Rajahmundry", "Rajkot", "Ranchi", "Rohtak", "Rourkela", 
  "Saharanpur", "Salem", "Sangli", "Shimla", "Siliguri", "Solapur", "Srinagar", "Surat", 
  "Thane", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli", "Tirunelveli", "Tiruppur", 
  "Udaipur", "Ujjain", 
  "Vadodara", "Varanasi", "Vasai-Virar", "Vellore", "Vijayawada", "Visakhapatnam", 
  "Warangal"
].sort();

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern 2 BHK Apartment in Alkapuri',
    type: PropertyType.Apartment,
    category: Category.Residential,
    bhk: 2,
    areaSqFt: 1200,
    rent: 22000,
    maintenance: 2000,
    deposit: 50000,
    furnishing: Furnishing.SemiFurnished,
    availableDate: '2023-11-01',
    petsAllowed: false,
    bachelorAllowed: true,
    address: {
      city: 'Vadodara',
      locality: 'Alkapuri',
      state: 'Gujarat',
      pin: '390007'
    },
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3'
    ],
    description: 'Spacious 2 BHK with modular kitchen and balcony facing the park. 24/7 water supply and security.',
    amenities: ['Parking', 'Lift', 'Security', 'Power Backup'],
    ownerName: 'Kiran Patel',
    ownerPhone: '9909563256',
    status: ListingStatus.Active,
    postedDate: '2023-10-15',
    verified: true,
    listedBy: 'Owner'
  },
  {
    id: '2',
    title: 'Luxury 3 BHK Villa with Garden',
    type: PropertyType.Villa,
    category: Category.Residential,
    bhk: 3,
    areaSqFt: 2500,
    rent: 65000,
    maintenance: 5000,
    deposit: 200000,
    furnishing: Furnishing.Furnished,
    availableDate: '2023-10-25',
    petsAllowed: true,
    bachelorAllowed: false,
    address: {
      city: 'Ahmedabad',
      locality: 'Bopal',
      state: 'Gujarat',
      pin: '380058'
    },
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6'
    ],
    description: 'Independent villa in a gated society. Fully furnished with ACs, beds, and sofa. Ideal for families.',
    amenities: ['Garden', 'Club House', 'Swimming Pool', 'Gym'],
    ownerName: 'Rajesh Shah',
    ownerPhone: '9876543210',
    status: ListingStatus.Active,
    postedDate: '2023-10-18',
    verified: true,
    listedBy: 'Broker'
  },
  {
    id: '3',
    title: 'Commercial Office Space in BKC',
    type: PropertyType.Office,
    category: Category.Commercial,
    areaSqFt: 1500,
    rent: 150000,
    maintenance: 12000,
    deposit: 600000,
    furnishing: Furnishing.Furnished,
    availableDate: '2023-11-10',
    petsAllowed: false,
    bachelorAllowed: true,
    address: {
      city: 'Mumbai',
      locality: 'Bandra Kurla Complex',
      state: 'Maharashtra',
      pin: '400051'
    },
    images: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=8'
    ],
    description: 'Premium office space with 20 workstations, 1 cabin, and a conference room.',
    amenities: ['Central AC', 'Cafeteria', 'Parking', 'Fire Safety'],
    ownerName: 'Vikram Malhotra',
    ownerPhone: '9988776655',
    status: ListingStatus.Active,
    postedDate: '2023-10-20',
    verified: true,
    listedBy: 'Broker'
  },
  {
    id: '4',
    title: '1 BHK for Students/Bachelors',
    type: PropertyType.Apartment,
    category: Category.Residential,
    bhk: 1,
    areaSqFt: 600,
    rent: 15000,
    maintenance: 1000,
    deposit: 30000,
    furnishing: Furnishing.Unfurnished,
    availableDate: '2023-10-22',
    petsAllowed: false,
    bachelorAllowed: true,
    address: {
      city: 'Pune',
      locality: 'Viman Nagar',
      state: 'Maharashtra',
      pin: '411014'
    },
    images: [
      'https://picsum.photos/800/600?random=9',
      'https://picsum.photos/800/600?random=10'
    ],
    description: 'Close to colleges and IT park. Simple apartment with good ventilation.',
    amenities: ['Water Supply', 'Security'],
    ownerName: 'Suresh Patil',
    ownerPhone: '9123456789',
    status: ListingStatus.Active,
    postedDate: '2023-10-21',
    verified: false,
    listedBy: 'Owner'
  }
];