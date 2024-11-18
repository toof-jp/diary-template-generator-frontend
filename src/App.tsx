import { useState } from "react";
import {
  get_first_day_of_week_from_str,
  generate_diary_template_from_str,
} from "../diary-template-generator/pkg/diary_template_generator";

function App() {
  const [buttonText, setButtonText] = useState("Copy");

  const initDate = new Date()
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");
  const [date, setDate] = useState(initDate);

  const first_day_of_week = get_first_day_of_week_from_str(date);
  const template = generate_diary_template_from_str(first_day_of_week);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(template)
      .then(() => {
        setButtonText("Copied!");
        setTimeout(() => {
          setButtonText("Copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "140px",
          margin: "0 auto",
        }}
      >
        <input
          type="date"
          value={date}
          onChange={(e) => {
            const newDate = e.target.value;
            if (newDate && !isNaN(new Date(newDate).getTime())) {
              setDate(newDate);
            }
          }}
          style={{ padding: "5px" }}
        />
        <textarea
          value={template}
          disabled
          rows={16}
          style={{ resize: "none" }}
        ></textarea>
        <button onClick={handleCopy}>{buttonText}</button>
      </div>
    </>
  );
}

export default App;
