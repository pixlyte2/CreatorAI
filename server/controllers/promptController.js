const Prompt = require("../models/prompt");

const createPrompt = async (req, res) => {
  const prompt = await Prompt.create({
    ...req.body,
    companyId: req.user.companyId,
    createdBy: req.user.id
  });
  res.json(prompt);
};

const getPrompts = async (req, res) => {
  const prompts = await Prompt.find({
    companyId: req.user.companyId
  });
  res.json(prompts);
};

const updatePrompt = async (req, res) => {
  const updated = await Prompt.findOneAndUpdate(
    { _id: req.params.id, companyId: req.user.companyId },
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
