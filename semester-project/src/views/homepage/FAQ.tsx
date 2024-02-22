"use client";

import Arrow from "@/components/icons/Arrow";
import { useState } from "react";

export default function FAQ() {
  const [activeDropdown, setActiveDropdown] = useState<number[]>([]);
  const handleDropdownClick = (index: number) => {
    activeDropdown.includes(index)
      ? setActiveDropdown(activeDropdown.filter((a) => a !== index))
      : setActiveDropdown([...activeDropdown, index]);
  };

  const dropdowns = [
    {
      title: "Is my personal information safe on BookVoyage?",
      text: "Yes, at BookVoyage, we take the privacy and security of your personal information very seriously. We have implemented robust security measures to ensure the safety of your data. Your personal information is stored securely and is only used for the purposes you've provided it for, such as creating an account or participating in discussions. \n\nWe also follow best practices to protect your data and maintain strict policies regarding data access and sharing. You can review our Privacy Policy for more details on how we handle and protect your personal information. Rest assured, we are committed to keeping your personal information safe and respecting your privacy.",
    },
    {
      title: "Is there a mobile app for BookVoyage?",
      text: "No, BookVoyage currently does not have a mobile app. However, you can access our website and all its features on your mobile devices through a web browser. Our website is designed to be responsive and user-friendly on various screen sizes, making it accessible and convenient for mobile users. So, while we don't have a dedicated mobile app, you can still enjoy the full BookVoyage experience on your mobile phone or tablet by simply visiting our website.",
    },
    {
      title:
        "I'm experiencing technical issues with the website. How can I get help?",
      text: "If you're facing technical issues with our website, here's how you can get help:\n\n1. Contact Support: Click on 'Contact Support' on our website to report the issue and receive assistance.\n2. Check FAQ: Visit our FAQ section for solutions to common problems.\n3. Community Forum: Engage with our community forum for assistance with community-related issues.\n4. Report a Bug: Use the 'Report a Bug' feature if available to directly report the issue.\n5. Social Media: Reach out on our social media profiles or send a direct message for help.\n6. Email or Live Chat: Look for support email or live chat options for direct communication. Provide detailed information about the issue for faster resolution.",
    },
    { title: "Is Book Voyage free to use?", text: "Yes!" },
  ];

  return (
    <div className="flex flex-col items-start gap-12 p-4">
      <h1 className="text-3xl sm:text-5xl font-bold">FAQ</h1>
      <div className="flex flex-col gap-8">
        {dropdowns.map((item, index) => (
          <div
            className="whitespace-pre-wrap"
            key={index}
            onClick={() => handleDropdownClick(index)}
          >
            <h2 className="flex items-center justify-between text-sm md:text-base font-semibold pb-4 border-b cursor-pointer">
              {item.title}
              <Arrow active={activeDropdown.includes(index)} />
            </h2>
            <p
              className={`text-sm md:text-base overflow-hidden transition-all duration-500 ${
                activeDropdown.includes(index) ? "py-5 max-h-screen" : "max-h-0"
              }`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
