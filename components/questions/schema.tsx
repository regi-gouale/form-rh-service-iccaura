import { z } from "zod";

export const QIdFormSchema = z.object({
  qFirstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  qLastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  qEmail: z.string().email({ message: "L'email doit être valide" }),
  qChurch: z.string({ required_error: "L'église est requise" }),
});
