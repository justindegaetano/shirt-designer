import express from "express";
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const controller = new AbortController();

// Initialize the OpenAI instance with your API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define a route for handling HTTP GET requests at the root endpoint "/"
router.route('/').get((req, res) => {
  // Respond with a simple JSON message for testing purposes
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// Define a route for handling HTTP POST requests at the root endpoint "/"
router.route('/').post(async (req, res) => {
  try {
    // Extract the "prompt" property from the request body
    const { prompt } = req.body;

    // Use the OpenAI API to generate images based on the provided prompt
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    // Extract the base64 image data from the API response
    const image = response.data[0].b64_json;

    // Respond with the generated image data in a JSON format
    res.status(200).json({ photo: image });
  } catch (e) {
    // If an error occurs during processing, log the error and respond with an error message
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Export the Express router for use in other parts of the application
export default router;
