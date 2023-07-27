import { z } from 'zod';
import { role } from './user.constant';

const userZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: `password is required`,
    }),

    role: z.enum([...role] as [string, ...string[]], {
      required_error: `role is required`,
    }),

    phoneNumber: z.string({
      required_error: `phone number is required`,
    }),

    address: z.string({
      required_error: `address is required`,
    }),

    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const userZodSchemaForUpdate = z.object({
  body: z.object({
    password: z.string().optional(),

    role: z.enum([...role] as [string, ...string[]]).optional(),

    phoneNumber: z.string().optional(),

    address: z.string().optional(),

    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const userValidation = {
  userZodSchema,
  userZodSchemaForUpdate,
};
