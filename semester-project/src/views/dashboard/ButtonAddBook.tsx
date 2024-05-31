import Arrow from "@/components/icons/Arrow";
import React, { useEffect, useState } from "react";

export default function ButtonAddBook() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<String>("Want to Read");

  useEffect(() => {}, [selectedOption]);
  const handleDropdownClick = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const handleOptionClicked = (optionName: String) => {
    setIsOpen(false);
    setSelectedOption(optionName);
  };

  return (
    <div className="w-44 relative mt-3">
      <div
        onClick={handleDropdownClick}
        className="bg-green-600 font-medium flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer transition-all hover:bg-green-700 duration-300"
      >
        <span>{selectedOption}</span>
        <div>
          <Arrow active={isOpen ? true : false} />
        </div>
      </div>
      <ul
        className={`list-none bg-green-600 rounded-lg shadow-md absolute top-11 left-1/2 w-full -translate-x-1/2 ${
          isOpen ? "block opacity-100" : "opacity-0 hidden"
        } transition-all duration-500 z-10`}
      >
        <li
          onClick={() => handleOptionClicked("Want to Read")}
          className={`py-2 px-3 rounded-t-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === "Want to Read" && "bg-green-500"
          }`}
        >
          Want to Read
        </li>
        <li
          onClick={() => handleOptionClicked("Currently Reading")}
          className={`py-2 px-3 cursor-pointer hover:bg-green-400 ${
            selectedOption === "Currently Reading" && "bg-green-500"
          }`}
        >
          Currently Reading
        </li>
        <li
          onClick={() => handleOptionClicked("Read")}
          className={`py-2 px-3 rounded-b-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === "Read" && "bg-green-500"
          }`}
        >
          Read
        </li>
      </ul>
    </div>
  );
}
