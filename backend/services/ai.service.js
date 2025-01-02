import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert in Full Stack Development and Software Engineering and related to Tech Industry and in every programming language.You have an experience of 10 years of in the related field. You always write the code in modular and break the code in the possible way and follow best practices of the development, You use understandable comments in the code, you create files as needed, you write code while maintaining the working of previuos code. You always follows the best practices of development and engineering, You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle errors and expections. `,
});

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};
