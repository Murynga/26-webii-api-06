import { z } from "zod";
import { positiveIdSchema, numericInputSchema } from "./idSchema.js";

const difficultySchema = numericInputSchema.pipe(
  z.coerce
    .number()
    .int("Dificuldade deve ser inteira")
    .min(1, "Dificuldade deve ser apenas 1, 2 ou 3")
    .max(3, "Dificuldade deve ser apenas 1, 2 ou 3"),
);

/** Schema para POST /questions. */
export const createQuestionSchema = z
  .object({
    enunciado: z
      .string()
      .trim()
      .min(3, "Enunciado deve ter pelo menos 3 caracteres")
      .max(500, "Enunciado deve ter no máximo 500 caracteres"),
    dificuldade: difficultySchema,
    respostaCorreta: z
      .string()
      .trim()
      .min(1, "Resposta deve ter pelo menos 1 caractere")
      .max(500, "Resposta deve ter no máximo 500 caracteres")
      .nullable()
      .optional(),
    authorId: positiveIdSchema,
    subjectId: positiveIdSchema,
    ativa: z.boolean().default(true),
  })
  .strict();

/** Schema para PATCH /questions. */
export const updateQuestionSchema = z
  .object({
    enunciado: z
      .string()
      .trim()
      .min(3, "Enunciado deve ter pelo menos 3 caracteres")
      .max(500, "Enunciado deve ter no máximo 500 caracteres")
      .optional(),
    dificuldade: difficultySchema.optional(),
    respostaCorreta: z
      .string()
      .trim()
      .min(1, "Resposta deve ter pelo menos 1 caractere")
      .max(500, "Resposta deve ter no máximo 500 caracteres")
      .nullable()
      .optional(),
    authorId: positiveIdSchema.optional(),
    subjectId: positiveIdSchema.optional(),
    ativa: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualização",
  });

/** Schema para parâmetros :id numéricos adequados. */
export const numericParamSchema = z.object({
  id: numericInputSchema,
});

/** Schema para parâmetros :id positivos. */
export const idParamSchema = z.object({
  id: positiveIdSchema,
});
