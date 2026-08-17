import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2).max(200),
  brand: z.string().min(2).max(100),
  concentration: z.string().min(2).max(50),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  description: z.string().optional(),
  notes: z.string().optional(),
  images: z.array(z.string().url()).optional(),
});

export const orderSchema = z.object({
  fullName: z.string().min(3).max(200),
  phone: z.string().regex(/^01[0-9]{9}$/),
  altPhone: z.string().optional(),
  governorate: z.string().min(2).max(100),
  address: z.string().min(10).max(500),
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive().max(10),
  })),
});