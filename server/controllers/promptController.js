const Prompt = require("../models/prompt");
const PromptType = require("../models/promptType");
const Channel = require("../models/channel");

const createPrompt = async (req, res) => {
  const { channelId, promptTypeId, promptText, aiModel } = req.body;

  // 🔒 validate channel
  const channel = await Channel.findOne({
    _id: channelId,
    companyId: req.user.companyId
  });
  if (!channel) {
    return res.status(400).json({ message: "Invalid channel" });
  }

  // 🔒 validate prompt type
  const type = await PromptType.findOne({
    _id: promptTypeId,
    channelId,
    companyId: req.user.companyId
  });
  if (!type) {
    return res.status(400).json({ message: "Invalid prompt type" });
  }

  const prompt = await Prompt.create({
    channelId,
    promptTypeId,
    promptText,
    aiModel,
    companyId: req.user.companyId,
    createdBy: req.user.id
  });

  res.json(prompt);
};

const getPrompts = async (req, res) => {
  const prompts = await Prompt.find({
    companyId: req.user.companyId
  })
    .populate("channelId", "name")
    .populate("promptTypeId", "name");

  res.json(prompts);
};

const updatePrompt = async (req, res) => {
  const updated = await Prompt.findOneAndUpdate(
    {
      _id: req.params.id,
      companyId: req.user.companyId
    },
    req.body,
    { new: true }
  );

  res.json(updated);
};

const deletePrompt = async (req, res) => {
  await Prompt.findOneAndDelete({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  res.json({ message: "Prompt deleted" });
};

module.exports = {
  createPrompt,
  getPrompts,
  updatePrompt,
  deletePrompt
};
