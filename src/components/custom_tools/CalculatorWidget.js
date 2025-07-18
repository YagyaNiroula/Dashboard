// Import React and state management
import React, { useState } from "react";
import "./CalculatorWidget.css";

// Calculator widget component with full calculator functionality
const CalculatorWidget = () => {
  // State for the calculator display (what user sees)
  const [display, setDisplay] = useState("0");
  // Store the previous number for calculations
  const [previousValue, setPreviousValue] = useState(null);
  // Store the current operation (+, -, ×, ÷)
  const [operation, setOperation] = useState(null);
  // Track if we're waiting for the next number after pressing an operation
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Handle when user clicks a number button
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      // If we just pressed an operation, start a new number
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      // Otherwise, add the digit to the current number
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  // Handle when user clicks the decimal point
  const inputDecimal = () => {
    if (waitingForOperand) {
      // If we just pressed an operation, start with "0."
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      // Only add decimal if there isn't one already
      setDisplay(display + ".");
    }
  };

  // Clear everything and reset calculator to initial state
  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // Handle when user clicks an operation button (+, -, ×, ÷)
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      // First operation - just store the current number
      setPreviousValue(inputValue);
    } else if (operation) {
      // Perform the previous operation and store the result
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    // Now waiting for the next number
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // Perform the actual mathematical calculation
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  // Handle when user clicks equals (=) button
  const handleEquals = () => {
    if (!previousValue || !operation) return;

    // Perform the final calculation
    const inputValue = parseFloat(display);
    const newValue = calculate(previousValue, inputValue, operation);

    // Show the result and reset for next calculation
    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  // Convert current number to percentage (divide by 100)
  const handlePercent = () => {
    const currentValue = parseFloat(display);
    const newValue = currentValue / 100;
    setDisplay(String(newValue));
  };

  // Change the sign of the current number (positive to negative or vice versa)
  const handlePlusMinus = () => {
    const currentValue = parseFloat(display);
    const newValue = -currentValue;
    setDisplay(String(newValue));
  };

  return (
    <div className="calculator-widget">
      <div className="widget-header">
        <h3>Calculator</h3>
      </div>
      
      <div className="calculator-display">
        <div className="display-value">{display}</div>
      </div>
      
      <div className="calculator-buttons">
        <div className="button-row">
          <button className="calc-btn function" onClick={clear}>AC</button>
          <button className="calc-btn function" onClick={handlePlusMinus}>±</button>
          <button className="calc-btn function" onClick={handlePercent}>%</button>
          <button className="calc-btn operator" onClick={() => performOperation("÷")}>÷</button>
        </div>
        
        <div className="button-row">
          <button className="calc-btn number" onClick={() => inputDigit(7)}>7</button>
          <button className="calc-btn number" onClick={() => inputDigit(8)}>8</button>
          <button className="calc-btn number" onClick={() => inputDigit(9)}>9</button>
          <button className="calc-btn operator" onClick={() => performOperation("×")}>×</button>
        </div>
        
        <div className="button-row">
          <button className="calc-btn number" onClick={() => inputDigit(4)}>4</button>
          <button className="calc-btn number" onClick={() => inputDigit(5)}>5</button>
          <button className="calc-btn number" onClick={() => inputDigit(6)}>6</button>
          <button className="calc-btn operator" onClick={() => performOperation("-")}>-</button>
        </div>
        
        <div className="button-row">
          <button className="calc-btn number" onClick={() => inputDigit(1)}>1</button>
          <button className="calc-btn number" onClick={() => inputDigit(2)}>2</button>
          <button className="calc-btn number" onClick={() => inputDigit(3)}>3</button>
          <button className="calc-btn operator" onClick={() => performOperation("+")}>+</button>
        </div>
        
        <div className="button-row">
          <button className="calc-btn number zero" onClick={() => inputDigit(0)}>0</button>
          <button className="calc-btn number" onClick={inputDecimal}>.</button>
          <button className="calc-btn equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorWidget; 