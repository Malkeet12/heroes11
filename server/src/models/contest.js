import mongoose from "mongoose";

const prizeDetailSchema = new mongoose.Schema({
  prize: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
});

const contestSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  teamsId: {
    type: Array,
    default: [],
  },
  admin: {
    type: String,
    required: true,
  },
  userIds: {
    type: Array,
    default: [],
  },
  prizeDetails: {
    type: [prizeDetailSchema],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  totalSpots: {
    type: Number,
    required: true,
  },
  spotsLeft: {
    type: Number,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  numWinners: {
    type: Number,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  entryFeeWithoutDiscount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Contest = mongoose.model("Contest", contestSchema);
