import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");
  const [style, setStyle] = useState("funny");
  const [language, setLanguage] = useState("sv");
  const [result, setResult] = useState("");

  const generateGift = async () => {
    try {
      const prompt = `Ge mig en ${style} presentidé på ${language} för en person som heter ${name} och gillar ${interests}. Svara kort.`;

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
        }
      );

      setResult(res.data.choices[0].message.content);
    } catch (err) {
      setResult("Fel vid generering av presentidé");
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>🎁 Supriso – AI Presentgenerator</h1>
      <label>Namn: </label>
      <input value={name} onChange={(e) => setName(e.target.value)} /><br/>
      <label>Intressen: </label>
      <input value={interests} onChange={(e) => setInterests(e.target.value)} /><br/>
      <label>Stil: </label>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="funny">Rolig</option>
        <option value="romantic">Romantisk</option>
        <option value="luxury">Lyxig</option>
      </select><br/>
      <label>Språk: </label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="sv">Svenska</option>
        <option value="en">Engelska</option>
      </select><br/>
      <button onClick={generateGift}>Generera presentidé</button>
      <p><strong>Resultat:</strong> {result}</p>
    </div>
  );
}
