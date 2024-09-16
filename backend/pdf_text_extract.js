// main_script.js
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { generateContent } from './gemini_api.js'; // Adjust the path as needed

// Load your PDF file
const dataBuffer = fs.readFileSync("C:/Users/sreer/Documents/AI_Tutor_App/backend/ARTIFICIAL INTELLIGENCE.pdf");

// Extract text from pdf
pdf(dataBuffer).then(async function(data) {
    // The extracted text is in data.text
    //console.log(data.text);
    const prompt=`I have a syllabus PDF with the following content: ${data.text}

Please extract the syllabus information from this text and format it according to the following schema:

{
  "type": "object",
  "properties": {
    "Module": {
      "type": "string",
      "description": "Identifier or name of the module"
    },
    "Title": {
      "type": "string",
      "description": "Title of the module"
    },
    "Content": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "SubTopic": {
            "type": "string",
            "description": "Name of the subtopic"
          },
          "Hours": {
            "type": "number",
            "description": "Hours allocated for the subtopic"
          }
        },
        "required": ["SubTopic", "Hours"],
        "description": "List of subtopics within the module"
      }
    },
    "TotalHours": {
      "type": "number",
      "description": "Total hours allocated for the module"
    }
  },
  "required": ["Module", "Title", "Content", "TotalHours"],
  "description": "Schema representing a module with its title, an array of subtopics each with a name and hours allocated, and the total hours for the module"
}

Please ensure the output JSON follows this schema strictly.`;
    try {
        // Generate content using the extracted text as the prompt
        const generatedContent = await generateContent(prompt);
        processGeneratedContent(generatedContent);
        //console.log("Generated Content:", generatedContent);
    } catch (error) {
        console.error("Error generating content:", error);
    }
});

// Syllabus JSON data
const processGeneratedContent = (generatedContent) => {
  //console.log("Generated Content:", generatedContent);

  // You can now access the generatedContent and convert it into markdown or any further processing
  // For example:
  // Clean the content by removing everything before and after the JSON part
  const startIndex = generatedContent.indexOf('['); // Assume JSON starts with [
  const endIndex = generatedContent.lastIndexOf(']') + 1; // Assume JSON ends with ]
  const jsonContent = generatedContent.slice(startIndex, endIndex).trim();
  
  const syllabus = JSON.parse(jsonContent);  // Now you can use syllabus as needed
  //console.log("Syllabus JSON data:", syllabus);
  console.log(syllabus);
  console.log(typeof(syllabus));
  let completeMarkdown = '';
  syllabus.forEach((module) => {
    completeMarkdown += generateMarkdownForModule(module);
  });
  fs.writeFileSync('syllabus_markdown.md', completeMarkdown, 'utf8');
  console.log("Markdown content saved to 'syllabus_markdown.md'");
};

// Function to convert each module to markdown format
const generateMarkdownForModule = (module) => {
  let markdown = `## ${module.Module}: ${module.Title}\n\n`;
  module.Content.forEach(subtopic => {
    markdown += `- **${subtopic.SubTopic}**: ${subtopic.Hours} hours\n`;
  });
  markdown += `\n**Total Hours**: ${module.TotalHours}\n\n`;
  return markdown;
};


