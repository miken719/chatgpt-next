import { useState } from "react";

export default function Home() {
  const [prompts, setPrompts] = useState({
    question: "Who is Aarshdeep Chadha in IndianNIC",
    answer: "",
    model: "davinci",
    temperature: 0.2,
  });

  const [loading, setIsLoading] = useState(false);
  const fetchAnswer = async () => {
    setIsLoading(true);
    const response = await fetch(`api/askgpt`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: prompts.model,
        prompt: prompts.question,
        temperature: parseFloat(prompts.temperature),
      }),
    });
    const answer = await response.json();
    setIsLoading(false);
    setPrompts({ ...prompts, answer: answer?.data?.choices[0]?.text });
  };

  const handleOnChange = (name, value) => {
    setPrompts({ ...prompts, [name]: value });
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "120px" }}>AskAI</h1>
        {/* <div className="logo-container">
          <img src="https://lilgreenland.github.io/images/BMO.jpg" />
        </div> */}
        <div className="container mt-4">
          <div className="form-group">
            <label htmlFor="prompt">Enter your question:</label>
            <input
              type="text"
              className="form-control"
              id="prompt"
              value={prompts.question}
              onChange={(e) => handleOnChange("question", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Select a model:</label>
            <select
              className="form-control"
              id="model"
              value={prompts.model}
              onChange={(e) => handleOnChange("model", e.target.value)}
            >
              <option id="model" value="davinci" selected>
                Davinci
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Enter the temperature:</label>
            <input
              type="text"
              className="form-control"
              id="temperature"
              defaultValue="0.5"
              value={prompts.temperature}
              onChange={(e) => handleOnChange("temperature", e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              id="submit"
              className="custom-btn btn-13"
              onClick={() => fetchAnswer()}
            >
              Ask AI
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="answer">Answer:</label>
            <textarea
              className="form-control"
              id="answer"
              defaultValue={""}
              value={loading ? "Wait for response..." : prompts.answer}
              readOnly
            />
          </div>
        </div>
      </div>
    </>
  );
}
