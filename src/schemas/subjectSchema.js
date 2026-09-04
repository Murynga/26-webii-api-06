import { z } from "zod";

/** Schema reutilizável para IDs de parâmetros de matérias. */
export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int("ID deve ser inteiro")
    .positive("ID deve ser positivo"),
});

/** Schema para POST /subjects. */
export const createSubjectSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    professorId: z.coerce
      .number()
      .int("professorId deve ser inteiro")
      .positive("professorId deve ser positivo"),
    ativa: z.boolean().optional(),
  })
  .strict();

/** Schema para PATCH /subjects/:id. */
export const updateSubjectSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres")
      .optional(),
    professorId: z.coerce
      .number()
      .int("professorId deve ser inteiro")
      .positive("professorId deve ser positivo")
      .optional(),
    ativa: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Envie pelo menos um campo para atualização",
  });
