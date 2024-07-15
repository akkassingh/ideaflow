import { Router } from "express";
const router = Router();

import {
  addProposal,
  getAllProposals,
  updatePropsal,
  deleteProposal,
  getProposals,
  getProposal,
  showStats
} from "../controllers/proposalController.js";

import {
  validateIdParam,
  validateProposal,
} from "../middleware/validationMiddleware.js";

import { checkForTestUser, authorizePermissions, authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(authenticateUser, getAllProposals)
  .get(getProposals)
  .post(checkForTestUser, validateProposal, addProposal);
router
  .route("/stats")
  .get(authenticateUser, showStats)
router
  .route("/:id")
  .get(authenticateUser, getProposal)
  .delete(checkForTestUser, validateIdParam, deleteProposal)
  .put(validateIdParam, updatePropsal);

export default router;
