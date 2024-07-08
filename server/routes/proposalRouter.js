import { Router } from "express";
const router = Router();

import {
  addProposal,
  getAllProposals,
  updatePropsal,
  deleteProposal,
  getProposals,
} from "../controllers/proposalController.js";

import {
  validateIdParam,
  validateProposal,
} from "../middleware/validationMiddleware.js";

import { checkForTestUser, authorizePermissions } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(authorizePermissions("admin"), getAllProposals)
  .get(getProposals)
  .post(checkForTestUser, validateProposal, addProposal);
router
  .route("/:id")
  .delete(checkForTestUser, validateIdParam, deleteProposal)
  .put(validateIdParam, updatePropsal);

export default router;
