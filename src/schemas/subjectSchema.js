import { z } from "zod";
import { positiveIdSchema, numericInputSchema } from "./idSchema.js";

/** Schema para POST /subjects. */
export const createSubjectSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    professorId: z.int().numericParamSchema().idParamSchema(),
    ativa: z.boolean().default(true),
  })
  .strict();

/** Schema para PATCH /subjects/:id. */
export const updateUserSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .optional(),
    ativa: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualização",
  });


/** Schema para parâmetros :id numéricos adequados. */
export const numericParamSchema = z.object({
  professorId: numericInputSchema,
});

/** Schema para parâmetros :id positivos. */
export const idParamSchema = z.object({
  professorId: positiveIdSchema,
});