"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X, Delete } from "lucide-react";

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [calcDisplay, setCalcDisplay] = useState<string>("0");
  const [calcMemory, setCalcMemory] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Keyboard accessibility: ESC key to close, plus number keys / basic operators for direct typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (/^[0-9]$/.test(e.key)) {
        handleCalcInput(e.key);
      } else if (e.key === "+") {
        handleCalcInput("+");
      } else if (e.key === "-") {
        handleCalcInput("-");
      } else if (e.key === "*" || e.key === "x" || e.key === "X") {
        handleCalcInput("×");
      } else if (e.key === "/") {
        handleCalcInput("÷");
      } else if (e.key === ".") {
        handleCalcInput(".");
      } else if (e.key === "%") {
        handleCalcInput("%");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleCalcInput("=");
      } else if (e.key === "Backspace") {
        handleCalcInput("DEL");
      } else if (e.key.toLowerCase() === "c") {
        handleCalcInput("C");
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, calcDisplay, isCalculated]);

  const handleCalcInput = (val: string) => {
    if (val === "C") {
      setCalcDisplay("0");
      setCalcMemory("");
      setIsCalculated(false);
      return;
    }

    if (val === "DEL") {
      if (isCalculated) {
        setCalcDisplay("0");
        setIsCalculated(false);
        return;
      }
      if (calcDisplay.length > 1) {
        setCalcDisplay(calcDisplay.slice(0, -1));
      } else {
        setCalcDisplay("0");
      }
      return;
    }

    if (val === "=") {
      try {
        // Replace visual operators with standard JS math operators
        const sanitized = calcDisplay.replace(/×/g, "*").replace(/÷/g, "/");
        if (/^[0-9+\-*/.%\s]+$/.test(sanitized)) {
          // eslint-disable-next-line no-eval
          const rawResult = eval(sanitized);
          const formattedResult = Number.isFinite(rawResult)
            ? String(Number(rawResult.toFixed(8)))
            : "Error";
          setCalcMemory(`${calcDisplay} =`);
          setCalcDisplay(formattedResult);
          setIsCalculated(true);
        }
      } catch {
        setCalcDisplay("Error");
        setIsCalculated(true);
      }
      return;
    }

    if (isCalculated) {
      if (["+", "-", "×", "÷"].includes(val)) {
        setCalcMemory(`${calcDisplay} ${val}`);
        setCalcDisplay(`${calcDisplay} ${val}`);
      } else {
        setCalcDisplay(val);
      }
      setIsCalculated(false);
      return;
    }

    if (calcDisplay === "0" && !["+", "-", "×", "÷", "."].includes(val)) {
      setCalcDisplay(val);
    } else {
      setCalcDisplay(calcDisplay + val);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md transition-opacity"
          />

          {/* Main Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden z-10 my-auto"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#147FC3] via-[#10669f] to-[#0d507d] text-white p-4 sm:p-5 relative flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/15 rounded-xl backdrop-blur-sm">
                  <Calculator className="w-5 h-5 text-[#FCA038]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                    Calculator
                  </h2>
                  <p className="text-[11px] text-blue-100 font-medium">
                    Basic Standard Calculator
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close Calculator Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Calculator Keypad */}
            <div className="p-4 sm:p-5 space-y-4">
              {/* Display Screen */}
              <div className="bg-zinc-900 text-white p-4 rounded-2xl text-right shadow-inner border border-zinc-800">
                <div className="text-xs text-zinc-400 h-5 font-mono overflow-hidden">
                  {calcMemory}
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-wide text-amber-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
                  {calcDisplay}
                </div>
              </div>

              {/* Keypad Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                <button
                  onClick={() => handleCalcInput("C")}
                  className="py-3 sm:py-3.5 text-sm sm:text-base font-extrabold bg-red-100 text-red-700 hover:bg-red-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  C
                </button>
                <button
                  onClick={() => handleCalcInput("DEL")}
                  className="py-3 sm:py-3.5 text-sm sm:text-base font-extrabold bg-zinc-200 text-zinc-800 hover:bg-zinc-300 active:scale-95 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  aria-label="Delete character"
                >
                  <Delete className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => handleCalcInput("%")}
                  className="py-3 sm:py-3.5 text-sm sm:text-base font-extrabold bg-zinc-200 text-zinc-800 hover:bg-zinc-300 active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  %
                </button>
                <button
                  onClick={() => handleCalcInput("÷")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-[#147FC3] text-white hover:bg-[#0f67a0] active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  ÷
                </button>

                {["7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCalcInput(num)}
                    className="py-3 sm:py-3.5 text-base sm:text-lg font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleCalcInput("×")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-[#147FC3] text-white hover:bg-[#0f67a0] active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  ×
                </button>

                {["4", "5", "6"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCalcInput(num)}
                    className="py-3 sm:py-3.5 text-base sm:text-lg font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleCalcInput("-")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-[#147FC3] text-white hover:bg-[#0f67a0] active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  -
                </button>

                {["1", "2", "3"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCalcInput(num)}
                    className="py-3 sm:py-3.5 text-base sm:text-lg font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleCalcInput("+")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-[#147FC3] text-white hover:bg-[#0f67a0] active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  +
                </button>

                <button
                  onClick={() => handleCalcInput("0")}
                  className="col-span-2 py-3 sm:py-3.5 text-base sm:text-lg font-bold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={() => handleCalcInput(".")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  .
                </button>
                <button
                  onClick={() => handleCalcInput("=")}
                  className="py-3 sm:py-3.5 text-base sm:text-lg font-extrabold bg-[#FCA038] hover:bg-[#e58e2b] text-white active:scale-95 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  =
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-zinc-50 px-4 py-2 border-t border-zinc-100 flex items-center justify-between text-[10px] text-zinc-400 font-medium">
              <span>Standard Calculator</span>
              <span className="font-bold text-[#147FC3]">MaxValue Credits</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
