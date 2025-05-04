// Espera o DOM ser completamente carregado
document.addEventListener("DOMContentLoaded", function () {
	// Referência ao botão
	const changeColorBtn = document.getElementById("changeColorBtn")

	// Variável para controlar o estado do tema
	let alternateTheme = false

	// Adiciona evento de clique ao botão
	changeColorBtn.addEventListener("click", function () {
		// Alterna o tema
		alternateTheme = !alternateTheme

		// Aplica ou remove a classe de tema alternativo
		if (alternateTheme) {
			document.body.classList.add("alternate-theme")
			changeColorBtn.textContent = "Restaurar Cores"

			// Mostra uma mensagem
			showMessage("Tema escuro ativado!")
		} else {
			document.body.classList.remove("alternate-theme")
			changeColorBtn.textContent = "Mudar Cores"

			// Mostra uma mensagem
			showMessage("Tema claro restaurado!")
		}
	})

	// Função para mostrar uma mensagem temporária
	function showMessage(text) {
		// Cria um elemento para a mensagem
		const message = document.createElement("div")
		message.textContent = text
		message.style.position = "fixed"
		message.style.top = "20px"
		message.style.left = "50%"
		message.style.transform = "translateX(-50%)"
		message.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
		message.style.color = "white"
		message.style.padding = "10px 20px"
		message.style.borderRadius = "5px"
		message.style.zIndex = "1000"

		// Adiciona a mensagem ao corpo do documento
		document.body.appendChild(message)

		// Remove a mensagem após 3 segundos
		setTimeout(function () {
			document.body.removeChild(message)
		}, 3000)
	}

	// Animação simples para os cards
	const cards = document.querySelectorAll(".card")
	cards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.backgroundColor = "var(--secondary-color)"
			this.style.color = "white"
		})

		card.addEventListener("mouseleave", function () {
			this.style.backgroundColor = "var(--card-background)"
			this.style.color = "var(--text-color)"
		})
	})

	// Mostra uma mensagem de boas-vindas
	showMessage("Bem-vindo ao meu portfólio!")
})
