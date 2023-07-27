import { Model, Schema } from 'mongoose';

enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Schema.Types.ObjectId;
};

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
