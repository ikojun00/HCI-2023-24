import Arrow from "@/components/icons/Arrow";
import React, { useEffect, useState } from "react";

interface Props {
  myBookshelf: Number;
}

export default function ButtonAddBook({ myBookshelf }: Props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Number>(myBookshelf);
  // bookshelf code - 1 - Currently Reading, 2 - Read, 3 - Want to Read

  /* useEffect(() => {
    
  }, [selectedOption]); */
  const handleDropdownClick = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const handleOptionClicked = (optionId: Number) => {
    setIsOpen(false);
    setSelectedOption(optionId);
  };

  return (
    <div className="w-44 relative mt-3">
      <div
        onClick={handleDropdownClick}
        className="bg-green-600 font-medium flex justify-between items-center rounded-lg py-2.5 px-3 cursor-pointer transition-all hover:bg-green-700 duration-300"
      >
        <span>
          {selectedOption === 1
            ? "Currently Reading"
            : selectedOption === 2
            ? "Read"
            : selectedOption === 3
            ? "Want to Read"
            : "Add to Shelf"}
        </span>
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
          onClick={() => handleOptionClicked(3)}
          className={`py-2 px-3 rounded-t-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === 3 && "bg-green-500"
          }`}
        >
          Want to Read
        </li>
        <li
          onClick={() => handleOptionClicked(1)}
          className={`py-2 px-3 cursor-pointer hover:bg-green-400 ${
            selectedOption === 1 && "bg-green-500"
          }`}
        >
          Currently Reading
        </li>
        <li
          onClick={() => handleOptionClicked(2)}
          className={`py-2 px-3 rounded-b-lg cursor-pointer hover:bg-green-400 ${
            selectedOption === 2 && "bg-green-500"
          }`}
        >
          Read
        </li>
      </ul>
    </div>
  );
}
