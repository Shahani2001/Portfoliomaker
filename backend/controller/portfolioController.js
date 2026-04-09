import UserPortfolio from "../models/portfoliomodel.js";
import validator from "validator";

const validatePortfolioPayload = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate && !data.username) errors.push("Username is required.");
  if (!isUpdate && !data.fullName) errors.push("Full name is required.");
  if (data.profileImage && !validator.isURL(data.profileImage)) {
    errors.push("Profile image must be a valid URL.");
  }
  if (data.contact?.linkedin && !validator.isURL(data.contact.linkedin)) {
    errors.push("LinkedIn must be a valid URL.");
  }
  if (data.contact?.github && !validator.isURL(data.contact.github)) {
    errors.push("GitHub must be a valid URL.");
  }
  if (data.contact?.website && !validator.isURL(data.contact.website)) {
    errors.push("Website must be a valid URL.");
  }

  return errors;
};

export async function createPortfolio(req, res) {
  try {
    const payload = req.body;
    const errors = validatePortfolioPayload(payload);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const username = payload.username.toLowerCase();
    const existing = await UserPortfolio.findOne({ username });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    const portfolio = new UserPortfolio({
      ...payload,
      username,
    });

    await portfolio.save();

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating portfolio",
    });
  }
}

export async function getPortfolioByUsername(req, res) {
  try {
    const username = req.params.username.toLowerCase();
    const portfolio = await UserPortfolio.findOne({ username });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching portfolio",
    });
  }
}

export async function updatePortfolio(req, res) {
  try {
    const username = req.params.username.toLowerCase();
    const updates = req.body;

    // Validate update payload
    const errors = validatePortfolioPayload(updates, true);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const portfolio = await UserPortfolio.findOneAndUpdate(
      { username },
      updates,
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating portfolio",
    });
  }
}

export async function deletePortfolio(req, res) {
  try {
    const username = req.params.username.toLowerCase();
    const portfolio = await UserPortfolio.findOneAndDelete({ username });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting portfolio",
    });
  }
}