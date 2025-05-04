document.addEventListener("DOMContentLoaded", function () {
	// Elementos da calculadora
	const result = document.getElementById("result")
	const buttons = document.querySelectorAll("button")

	// Variáveis para armazenar o estado da calculadora
	let currentInput = ""
	let currentOperator = ""
	let previousInput = ""
	let calculationPerformed = false

	// Adiciona eventos de clique a todos os botões
	buttons.forEach((button) => {
		button.addEventListener("click", function () {
			const value = this.textContent

			// Se um cálculo foi realizado e um número é pressionado, limpa o display
			if (calculationPerformed && !isNaN(value)) {
				currentInput = ""
				calculationPerformed = false
			}

			// Lógica para cada tipo de botão
			switch (value) {
				case "C":
					clearCalculator()
					break
				case "⌫":
					backspace()
					break
				case "=":
					calculate()
					break
				case "+":
				case "-":
				case "×":
				case "÷":
					handleOperator(value)
					break
				case ".":
					addDecimal()
					break
				default:
					// Para números
					if (!isNaN(value)) {
						currentInput += value
						updateDisplay()
					}
			}
		})
	})

	// Função para limpar a calculadora
	function clearCalculator() {
		currentInput = ""
		previousInput = ""
		currentOperator = ""
		updateDisplay()
	}

	// Função para apagar o último caractere
	function backspace() {
		currentInput = currentInput.slice(0, -1)
		updateDisplay()
	}

	// Função para adicionar ponto decimal
	function addDecimal() {
		if (!currentInput.includes(".")) {
			currentInput = currentInput === "" ? "0." : currentInput + "."
			updateDisplay()
		}
	}

	// Função para lidar com operadores
	function handleOperator(operator) {
		if (currentInput !== "") {
			if (previousInput !== "") {
				calculate()
			}
			previousInput = currentInput
			currentInput = ""
			currentOperator = operator
		} else if (previousInput !== "" && currentOperator !== "") {
			// Permite mudar o operador se nenhum novo número foi inserido
			currentOperator = operator
		}
	}

	// Função para realizar o cálculo
	function calculate() {
		if (
			currentInput !== "" &&
			previousInput !== "" &&
			currentOperator !== ""
		) {
			const num1 = parseFloat(previousInput)
			const num2 = parseFloat(currentInput)
			let calculatedResult

			switch (currentOperator) {
				case "+":
					calculatedResult = num1 + num2
					break
				case "-":
					calculatedResult = num1 - num2
					break
				case "×":
					calculatedResult = num1 * num2
					break
				case "÷":
					if (num2 === 0) {
						result.value = "Erro"
						setTimeout(() => {
							clearCalculator()
						}, 1500)
						return
					}
					calculatedResult = num1 / num2
					break
			}

			// Formata o resultado para evitar números muito longos
			currentInput = calculatedResult.toString()
			if (
				currentInput.includes(".") &&
				currentInput.split(".")[1].length > 8
			) {
				currentInput = calculatedResult.toFixed(8).toString()
				// Remove zeros à direita
				currentInput = currentInput.replace(/\.?0+$/, "")
			}

			previousInput = ""
			currentOperator = ""
			calculationPerformed = true
			updateDisplay()
		}
	}

	// Função para atualizar o display
	function updateDisplay() {
		result.value = currentInput
	}

	// Adiciona suporte a teclado
	document.addEventListener("keydown", function (event) {
		const key = event.key

		// Números e ponto decimal
		if (!isNaN(key) || key === ".") {
			document.getElementById(key === "." ? "decimal" : key).click()
		}

		// Operadores
		switch (key) {
			case "+":
				document.getElementById("add").click()
				break
			case "-":
				document.getElementById("subtract").click()
				break
			case "*":
				document.getElementById("multiply").click()
				break
			case "/":
				event.preventDefault() // Previne o quick find no Firefox
				document.getElementById("divide").click()
				break
			case "Enter":
				event.preventDefault()
				document.getElementById("equals").click()
				break
			case "Escape":
				document.getElementById("clear").click()
				break
			case "Backspace":
				document.getElementById("backspace").click()
				break
		}
	})

	// Inicializa o display
	updateDisplay()

	// Animação de boas-vindas
	result.value = "Bem-vindo!"
	setTimeout(() => {
		result.value = ""
	}, 1500)
})
