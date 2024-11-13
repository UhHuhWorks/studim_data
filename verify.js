import axios from "axios";

export async function verify(question, answer) {
  const dataToVerify = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: ` Question: ${question}
Answer: ${answer}  **Prompt:**

> Convert the following text into a JSON format. The text outlines various methods of integration, including mathematical formulas. Ensure the formulas are properly formatted using LaTeX syntax within the JSON response. 

**EXAMPLE:**

> The different methods of integration include:
> 1. **Integration by Substitution:**
>    ∫f(g(x)) g'(x) dx = ∫f(u) du
> 2. **Integration by Parts:**
>    ∫u dv = uv - ∫v du
> 3. **Integration Using Trigonometric Identities:**
>    - sin²x = (1-cos2x)/2
>    - cos²x = (1+cos2x)/2
>    - sin³x = (3sinx-sin3x)/4
>    - cos³x = (3cosx+cos3x)/4 

**Expected EXAMPLE Output:**

json
{
  "question": "Methods of integration",
  "answer": "The different methods of integration include:\n\n1. **Integration by Substitution:**\n   $$\n   \\int f(g(x)) g'(x) dx = \\int f(u) du\n   $$\n\n2. **Integration by Parts:**\n   $$\n   \\int u dv = uv - \\int v du\n   $$\n\n3. **Integration Using Trigonometric Identities:**\n   - $$\n   \\sin^2 x = \\frac{1-\\cos 2x}{2}\n   $$\n   - $$\n   \\cos^2 x = \\frac{1+\\cos 2x}{2}\n   $$\n   - $$\n   \\sin^3 x = \\frac{3\\sin x - \\sin 3x}{4}\n   $$\n   - $$\n   \\cos^3 x = \\frac{3\\cos x + \\cos 3x}{4}\n   $$"
}


**Explanation:**

This prompt instructs the AI to:

1. **Identify the question and answer:** In this case, the question is "Methods of integration" and the answer is the subsequent text.
2. **Format the mathematical formulas:** The AI needs to recognize the mathematical expressions and enclose them in LaTeX syntax, which is denoted by double dollar signs ($$).
3. **Structure the JSON output:** The response should be in JSON format, with two key-value pairs: "question" and "answer". The "answer" should contain the formatted text, including the LaTeX-formatted formulas.

By providing this specific prompt, the AI can accurately process the text and generate the desired JSON output.
`,
          },
        ],
      },
    ],
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY_HERE",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(dataToVerify),
  };

  try {
    const response = await axios.request(config);

    const candidateContent = response.data.candidates[0]?.content;

    if (candidateContent) {
      console.log("Verified Content:", candidateContent);
    } else {
      console.log("No content generated in response.");
    }

    console.log("API Usage:", response.data.usageMetadata);
    console.log("Model Version:", response.data.modelVersion);
  } catch (error) {
    console.error("Error verifying data with Gemini API:", error);
  }
}
