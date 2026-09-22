import express from "express";
import * as questionController from "../controllers/questionController.js";
import validate from "../middlewares/validate.js";
import {
  updateQuestionSchema,
  createQuestionSchema,
  idParamSchema,
  numericParamSchema,
} from "../schemas/questionSchema.js";

const router = express.Router();

router.post("/", validate(createQuestionSchema), questionController.create);
router.get("/", questionController.getAll);
router.get(
  "/:id",
  validate(idParamSchema, "params"),
  validate(numericParamSchema, "params"), 
  questionController.getById);
router.patch("/:id", 
  validate(idParamSchema, "params"),
  validate(numericParamSchema, "params"),
  validate(updateQuestionSchema),
  questionController.update);
router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  validate(numericParamSchema, "params"),
  questionController.remove);

export default router;
