// export API_KEY="AIzaSyDR_7cFY9oGvFD9KdFqpdNLdUd8qKCGL-s";
// gemini_api.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content using the provided prompt
export async function generateContent(prompt) {
    if (!prompt) {
        throw new Error("No prompt provided");
    }
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        throw new Error(`Error generating content: ${error.message}`);
    }
}
