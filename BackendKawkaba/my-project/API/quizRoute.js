const express = require("express");
const Joi = require("joi"); /* Validating req.body */
const recommendationService = require("../services/quizService");

const router = express.Router();

const quizSchema = Joi.object({
  gender: Joi.string().valid("men", "women").required(),
  seasons: Joi.array()
    .items(Joi.string().valid("spring", "summer", "autumn", "winter"))
    .required(),
  accords: Joi.array().items(Joi.string()).required(),
});

router.post("/quiz", (req, res) => {
  const { error } = quizSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }
  const { gender, seasons, accords } = req.body;
  console.log("Received Request Body:", req.body); // Log the received data

  // if (!gender || !Array.isArray(seasons) || !Array.isArray(accords)) {
  //   return res.status(400).json({
  //     status: "error",
  //     message: "Invalid input data format",
  //   });
  // }

  try {
    const recommendations = recommendationService.getRecommendations(
      gender,
      seasons,
      accords,
    );

    if (recommendations.length === 0) {
      return res.status(200).json({
        status: "success",
        data: {
          message: "No matching products found. Please try different options.",
        },
      });
    }

    console.log("Generated Recommendations:", recommendations);
    res.status(200).json({
      status: "success",
      data: {
        recommendations,
      },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
