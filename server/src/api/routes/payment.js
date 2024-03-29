import { Router } from "express";
import { auth } from "../middlewares/index.js";
import User from "../../models/user.js";
import { errorHelper } from "../../utils/index.js";

const router = Router();

router.post("/add", auth, async (req, res) => {
  const { amount } = req.body;

  const user = await User.findOne({ _id: req.user._id }).catch((err) => {
    return res.status(500).json(errorHelper("00064", req, err.message));
  });

  await User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        wallet: +amount + user?.wallet,
      },
    },
  ).catch((err) => {
    return res.status(500).json(errorHelper("00064", req, err.message));
  });

  return res.status(200).json({
    resultMessage: `${amount} has been added`,
    code: "00050",
  });
});

router.post("/deduct", auth, async (req, res) => {
  const { amount } = req.body;
  // console.log(req.user._id);

  const user = await User.findOne({ _id: req.user._id }).catch((err) => {
    return res.status(500).json(errorHelper("00064", req, err.message));
  });

  // console.log(amount, "now user: ", user);

  const userWallet = user?.wallet;
  const updatedAmount = userWallet - +amount;

  if (updatedAmount < 0) {
    return res
      .status(402)
      .json(errorHelper("00098", req, "Amount can't exceed wallet amount"));
  }

  const data = await User.updateOne(
    { _id: req.user._id },
    {
      $set: {
        wallet: updatedAmount,
      },
    }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00064", req, err.message));
  });

  return res.status(200).json({
    resultMessage: data,
    code: "00050",
  });
});

export default router;
