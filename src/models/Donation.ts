import { model, models, Schema, Document, Types } from "mongoose";

// Define the Donation interface that extends mongoose's Document
export interface Donation extends Document {
  _id: Types.ObjectId;  // Explicitly define _id type
  amount: number;
  name: string;
  message?: string;
  crypto: 'btc' | 'eth' | 'ltc';
  paid: boolean;
  email: string;
}

const donationSchema = new Schema<Donation>({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  crypto: {
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return ['btc', 'eth', 'ltc'].includes(v);
      },
    },
  },
  paid: { type: Boolean, default: false },
});

// The Donation model is now typed correctly with the Donation interface
export const DonationModel = models?.Donation || model<Donation>('Donation', donationSchema);
