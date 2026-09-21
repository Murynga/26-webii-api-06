import { z } from "zod";
import { positiveIdSchema, numericInputSchema } from "./idSchema.js";


/** Schema para POST /questions. */
export const createQuestionSchema = z
  .object({
    enunciado: z
      .string()
      .trim()
      .min(3, "Enunciado deve ter pelo menos 3 caracteres")
      .max(500, "Enunciado deve ter no máximo 500 caracteres"),
    dificuldade: z.int()
      .numericParamSchema()
      .min(1, "Dificuldade deve ser apenas 1, 2 ou 3")
      .max(3, "Dificuldade deve ser apenas 1, 2 ou 3"),
    respostaCorreta: z
      .string()
      .trim()
      .min(3, "Resposta deve ter pelo menos 3 caracteres")
      .max(500, "Resposta deve ter no máximo 500 caracteres")
      .default(null)
      .optional(),
    authorId: z.int().numericParamSchema().idParamSchema(),
    subjectId: z.int().numericParamSchema().idParamSchema(),
    ativa: z.boolean().default(true)
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
    dificuldade: z.int()
      .numericParamSchema()
      .min(1, "Dificuldade deve ser apenas 1, 2 ou 3")
      .max(3, "Dificuldade deve ser apenas 1, 2 ou 3")
      .optional(),
    respostaCorreta: z
      .string()
      .trim()
      .min(3, "Resposta deve ter pelo menos 3 caracteres")
      .max(500, "Resposta deve ter no máximo 500 caracteres")
      .default(null)
      .optional(),
    ativa: z.boolean().optional()
  })
  .strict();




/** Schema para parâmetros :id numéricos adequados. */
export const numericParamSchema = z.object({
  authorId: numericInputSchema,
  subjectId: numericInputSchema,
});

/** Schema para parâmetros :id positivos. */
export const idParamSchema = z.object({
  authorId: positiveIdSchema,
  subjectId: positiveIdSchema,
});