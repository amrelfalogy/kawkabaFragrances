const express = require("express");
const recommendationService = require("../services/recommendationService");

const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { perfumeName } = req.body;
  if (!perfumeName) {
    return res
      .status(400)
      .json({ status: "error", message: "Perfume name is required." });
  }

  try {
    const recommendations =
      await recommendationService.getRecommendations(perfumeName);
    res.status(200).json({ status: "success", data: { recommendations } });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
