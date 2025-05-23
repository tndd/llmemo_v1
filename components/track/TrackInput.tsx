"use client";

import React, { useState, KeyboardEvent } from "react";
import clsx from "clsx";

interface TrackInputProps {
  onSendTrack: (inputValue: string) => void;
  disabled?: boolean;
}

const TrackInput: React.FC<TrackInputProps> = ({ onSendTrack, disabled }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim() !== "" && !disabled) {
      onSendTrack(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const inputContainerClasses = clsx(
    "flex items-center p-4 border-t border-gray-200 bg-white",
    { "opacity-50 cursor-not-allowed": disabled },
  );

  const inputClasses = clsx(
    "flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    { "bg-gray-100": disabled },
  );

  const buttonClasses = clsx(
    "ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    { "bg-gray-300 hover:bg-gray-300 cursor-not-allowed": disabled },
  );

  return (
    <div className={inputContainerClasses}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={disabled ? "メモを選択してください" : "メッセージを入力..."}
        className={inputClasses}
        disabled={disabled}
      />
      <button onClick={handleSend} className={buttonClasses} disabled={disabled}>
        送信
      </button>
    </div>
  );
};

export default TrackInput;
