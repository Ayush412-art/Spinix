import { useEffect, useState } from "react";

function TitleText() {
  const words = ["Looking for Rooms...?"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const type = () => {
      const currentWord = words[currWordIndex];

      if (isDeleting ) {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setCurrWordIndex((prev) => (prev + 1) % words.length); // Loop back to the first word
        }
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex === currentWord.length) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currWordIndex, words]);

  return (
    <div className="w-full h-72 flex justify-center  text-white items-center ">
      <h1 className="text-4xl font-bold  ">{text}</h1>
    </div>
  );
}

export default TitleText;
