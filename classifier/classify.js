const SYSTEM_PROMPT = `
You are a task difficulty classifier.

Classify the user request into exactly one category:

SIMPLE:
- grammar correction
- summarization
- formatting
- short explanations
- basic coding help
- writing small functions

MEDIUM:
- debugging
- writing multi-file code
- API design
- explaining technical concepts
- moderate reasoning

CRITICAL:
- security sensitive logic
- production architecture
- system design
- complex algorithms
- privacy related logic

Respond with ONLY one word:
SIMPLE
MEDIUM
CRITICAL
`;

export async function classifyTask(messages) {
    const userMessage = messages[messages.length-1]?.content || "";
    
    const response = await fetch(
        "http://localhost:11434/api/generate", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                model: "smollm2",
                prompt:`${SYSTEM_PROMPT}
                
                User message:
                ${userMessage}
                `,
                stream: false
            })
        }
    );

    const data = await response.json();
    const rawOutput = data.response.trim().toUpperCase();

    const match = rawOutput.match(/SIMPLE|MEDIUM|CRITICAL/);
    return match ? match[0] : "MEDIUM";
}