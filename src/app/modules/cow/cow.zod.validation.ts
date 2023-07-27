import { z } from 'zod';
import { breed, location } from './cow.constant';

const cowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: `name is required`,
    }),
    age: z.number({
      required_error: `age is required`,
    }),
    price: z.number({
      required_error: `price is required`,
    }),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: `location is required`,
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: `breed is required`,
    }),
    weight: z.number({
      required_error: `weight is required`,
    }),
    seller: z.string({
      required_error: `seller is required`,
    }),
  }),
});

const cowZodSchemaForUpdate = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...location] as [string, ...string[]]).optional(),
    breed: z.enum([...breed] as [string, ...string[]]).optional(),
    weight: z.number().optional(),
    seller: z.string().optional(),
  }),
});

export const cowValidation = {
  cowZodSchema,
  cowZodSchemaForUpdate,
};
