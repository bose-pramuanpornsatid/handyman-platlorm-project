import React, { memo } from 'react'
import { useState } from "react";

import styles from './index.module.css'

const QuizCard: React.FC = memo(() => {
    const [selected, setSelected] = useState<string | null>(null); // Track selected answer

    const answers = ["Paris", "London", "Berlin", "Madrid"];

    const handleOptionClick = (answer: string) => {
        if (selected === answer) {
            setSelected(null); // Unselect if clicked again
        } else {
            setSelected(answer); // Select the clicked option
        }
    };

    return (
    <div className="p-3 max-w-full bg-white">
        <div className="flex flex-col items-center w-full px-5 py-5">
            {/* Question Header */}
            <div className="mb-3 flex flex-col items-start w-full">
                <div className="mt-5 mb-1 text-2xl text-black font-black">
                What is the capital of France?
                </div>
                <h4 className="text-sm text-black">
                Select one option only.
                </h4>
            </div>

            {/* Answer Options */}
            <div className="flex flex-col w-full">
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`font-semibold text-black flex items-center w-full py-3 pl-3 m-2 space-x-2 border-2 cursor-pointer rounded-lg transition-all ${
                            selected === answer
                                ? "border-indigo-700 bg-indigo-600"
                                : "border-white/10 bg-white/5 hover:bg-indigo-200 hover:border-indigo-500"
                        }`}
                        onClick={() => handleOptionClick(answer)}
                    >
                        <p className="text-base">{answer}</p>
                    </div>
                ))}

                {/* Next Button */}
                <button
                    className={`font-bold text-base w-full py-3 mt-4 text-white rounded-lg transition-all ${
                        selected
                            ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!selected} // Disable button if no answer is selected
                    onClick={() => alert(`You selected: ${selected}`)}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
    );
});
QuizCard.displayName = 'QuizCard'

export default QuizCard