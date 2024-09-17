import { z } from "zod";

export const QIdFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "L'email doit être valide" }),
  church: z.string({ required_error: "L'église est requise" }),
});
