document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector("input[name='displayResult']");

    // Clear Display (AC Button)
    const clearDisplay = () => {
        display.value = "";
    };

    // Delete Last Entry (DEL Button)
    const deleteLast = () => {
        display.value = display.value.slice(0, -1);
    };

    // Handle Number Input
    const handleNumberInput = (value) => {
        display.value += value;
    };

    // Handle Operator Input
    const handleOperatorInput = (operator) => {
        display.value += operator;
    };

    // Function to calculate result
    const calculateResult = () => {
        try {
            let expression = display.value;

            // Replace percentage logic
            expression = expression.replace(/(\d+\.?\d*)%/g, (match, number) => {
                return `(${number} / 100)`;
            });

            // Handle percentage within expressions
            expression = expression.replace(/(\d+(\.\d+)?)\s*([\+\-\*\/])\s*\((\d+(\.\d+)?\s*\/\s*100)\)/g, (match, num, _, operator, percentageValue) => {
                const percentage = eval(percentageValue);
                return `${num} ${operator} (${num} * ${percentage})`;
            });

            const result = eval(expression);

            if (!isNaN(result)) {
                display.value = result; // Display correct result
            } else {
                alert("Error: Invalid Calculation");
            }
        } catch (error) {
            alert("Error in calculation. Please try again.");
        }
    };

    // Map buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = this.value;

            switch (value) {
                case "AC":
                    clearDisplay();
                    break;
                case "DEL":
                    deleteLast();
                    break;
                case "=":
                    calculateResult();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                case ".":
                    handleOperatorInput(value);
                    break;
                case "%":
                    handleOperatorInput("%");
                    break;
                default:
                    if (!isNaN(value)) {
                        handleNumberInput(value);
                    }
            }
        });
    });

    // Add event listener for Enter key press
    document.addEventListener("keydown", function (e) {
        const key = e.key;

        // Handle number keys
        if (!isNaN(key)) {
            handleNumberInput(key);
        }

        // Handle operator keys
        if (["+", "-", "*", "/", "%", "."].includes(key)) {
            handleOperatorInput(key);
        }

        // Handle Enter key for calculation
        if (key === "Enter") {
            calculateResult();
        }

        // Handle Delete (DEL) key
        if (key === "Backspace") {
            deleteLast();
        }

        // Handle Clear (AC) - you can map this to 'Escape' key
        if (key === "Escape") {
            clearDisplay();
        }
    });

    const body = document.querySelector("body"),
        modeToggle = document.querySelector(".drak-light");

    modeToggle.addEventListener("click", () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode", "light-mode");
        } else {
            localStorage.setItem("mode", "dark-mode");
        }
    });
    function displayTime() {
        const today = new Date();
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;

        const timeElement = document.getElementById('time');
        timeElement.innerHTML = currentTime;
    }

    displayTime(); // Call function to display time
    setInterval(displayTime, 60000); // Update time every 60 seconds
    // document.addEventListener("DOMContentLoaded", function () {
        
    // });
});
