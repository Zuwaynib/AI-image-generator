// const express = require('express');
// const axios = require('axios');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// const app = express();
// const PORT = 3000;

// app.use(express.json()); // Parse JSON request bodies

// // Endpoint to handle image generation requests
// app.post('/api/generate-images', async (req, res) => {
//   const { prompt, n, size, response_format } = req.body;

//   try {
//     // Make a request to the OpenAI API
//     const response = await axios.post(
//       'https://api.openai.com/v1/images/generations',
//       {
//         prompt,
//         n,
//         size,
//         response_format,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from environment variables
//         },
//       }
//     );

//     // Send the response back to the frontend
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error generating images:', error.message);
//     res.status(500).json({ message: 'Failed to generate images.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies

// GET route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the AI Image Generator API! Use POST /api/generate-images to generate images.');
});

// Endpoint to handle image generation requests
app.post('/api/generate-images', async (req, res) => {
  const { prompt, n, size, response_format } = req.body;

  // Validate request data
  if (!prompt || !n || !size || !response_format) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Make a request to the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      { prompt, n, size, response_format },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Secure API Key
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error generating images:', error.message);
    res.status(500).json({ message: error.response?.data || 'Failed to generate images.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

