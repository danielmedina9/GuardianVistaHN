import { Button } from "@mui/material";
import { useState } from "react";

const LongText = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowMore = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      {showFullText ? <div>{text}</div> : <div>{text.slice(0, maxLength)}</div>}
      {text.length > maxLength && (
        <Button onClick={toggleShowMore}>
          {showFullText ? "Muestra menos" : "Muestra mas"}
        </Button>
      )}
    </div>
  );
};

export default LongText;
