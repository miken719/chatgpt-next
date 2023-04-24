import { useState } from "react";

export default function Home() {
  const [prompts, setPrompts] = useState({
    context: "",
    question: "",
    answer: "",
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const [loading, setIsLoading] = useState(false);
  const fetchAnswer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`api/askgpt`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        context: prompts.context,
        model: prompts.model,
        prompt: prompts.question,
        temperature: parseFloat(prompts.temperature),
      }),
    });
    const answer = await response.json();
    console.log(answer);
    setIsLoading(false);
    setPrompts({ ...prompts, answer: answer?.data });
  };

  const handleOnChange = (name, value) => {
    setPrompts({ ...prompts, [name]: value });
  };

  return (
    <div className="container mt-4 ">
      <div className="text-center">
        <h1>AskMe! ChatBot</h1>
        <hr className="bg-danger" />
      </div>
      <form onSubmit={(e) => fetchAnswer(e)}>
        <div className="form-group ">
          <label htmlFor="prompt">Enter your context:</label>
          <textarea
            className="form-control bg-transparent text-white"
            id="prompt"
            value={prompts.context}
            onChange={(e) => handleOnChange("context", e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prompt">Enter your question:</label>
          <input
            type="text"
            className="form-control bg-transparent text-white"
            id="prompt"
            value={prompts.question}
            onChange={(e) => handleOnChange("question", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Select a model:</label>
          <select
            className="form-control bg-transparent text-white"
            id="model"
            value={prompts.model}
            onChange={(e) => handleOnChange("model", e.target.value)}
            required
          >
            <option id="model" value="gpt-3.5-turbo" selected>
              gpt-3.5-turbo
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="temperature">Enter the temperature:</label>
          <input
            type="text"
            className="form-control bg-transparent text-white"
            id="temperature"
            defaultValue="0.5"
            value={prompts.temperature}
            onChange={(e) => handleOnChange("temperature", e.target.value)}
            required
          />
        </div>
        <div className="form-group d-flex justify-content-center">
          <button
            id="submit"
            className="btn btn-outline-dark btn-lg pl-5 pr-5 mt-5 text-white border border-1"
            disabled={loading}
          >
            Ask Me!
          </button>
        </div>
      </form>
      <div className="form-group">
        <label htmlFor="answer">Answer:</label>
        <textarea
          className="form-control bg-transparent text-white"
          id="answer"
          defaultValue={""}
          value={loading ? "Wait for response..." : prompts.answer}
          readOnly
          rows="6"
        />
      </div>
    </div>
  );
}
