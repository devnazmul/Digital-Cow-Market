import { Schema, model } from 'mongoose';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      required: true,
    },
    breed: {
      type: String,
      enum: [
        'Brahman',
        'Nellore',
        'Sahiwal',
        'Gir',
        'Indigenous',
        'Tharparkar',
        'Kankrej',
      ],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: ['for sale', 'sold out'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Dairy', 'Beef', 'Dual Purpose'],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cow = model<ICow, CowModel>('Cow', cowSchema);
