// ADICIONADO: módulo V2 de questões; não altera arquivos ou regras da V1.
import express from "express";
import stableQuestionRoutes from "../../v1/routes/questionRoutes.js";
import authenticate from "../../../middlewares/auth.js";
import authorize, { isAdmin } from "../../../middlewares/authorize.js";

const router = express.Router();

// ADICIONADO: reaproveita integralmente o contrato estável de Question.
router.post("/", authenticate, authorize("PROFESSOR", "ADMIN"));
router.patch("/:id", authenticate, authorize("PROFESSOR", "ADMIN"));
router.delete("/:id", authenticate, isAdmin);
router.use("/", stableQuestionRoutes);


export default router;
