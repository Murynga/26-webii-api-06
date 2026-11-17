// ADICIONADO: módulo V2 de matérias; reutiliza contrato estável sem editar a V1.
import express from "express";
import stableSubjectRoutes from "../../v1/routes/subjectRoutes.js";
import authenticate from "../../../middlewares/auth.js";
import authorize, { isAdmin } from "../../../middlewares/authorize.js";

const router = express.Router();

// ADICIONADO: compõe validação, controller e service existentes de Subject.
router.post("/", authenticate, authorize("PROFESSOR", "ADMIN"));
router.patch("/:id", authenticate, authorize("PROFESSOR", "ADMIN"));
router.delete("/:id", authenticate, isAdmin);
router.use("/", stableSubjectRoutes);

export default router;
