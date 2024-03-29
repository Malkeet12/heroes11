import { Router } from "express";
import {
  changePassword,
  deleteUser,
  editUser,
  forgotPassword,
  getMatches,
  getProfilePic,
  getTeam,
  getTeams,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  saveTeam,
  sendVerificationCode,
  updateTeam,
  verifyEmail,
  processReferral,
} from "../controllers/user/index.js";
import { auth, imageUpload } from "../middlewares/index.js";

const router = Router();

// AUTH
router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", auth, forgotPassword);
router.post("/send-verification-code", sendVerificationCode);

// EDIT
router.post("/change-password", auth, changePassword);
router.put("/", auth, imageUpload, editUser);

router.get("/profile-pic", getProfilePic);
router.get("/details", auth, getUser);
router.get("/matches", auth, getMatches);
router.post("/saveteam", auth, saveTeam);
router.post("/updateTeam", auth, updateTeam);
router.get("/teams", auth, getTeams);
router.get("/team", auth, getTeam);
router.delete("/", auth, deleteUser);
router.post("/processReferral", processReferral);

export default router;
