import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	:root {
		--red: #e52e4d;
		--green: #33cc95;
		--blue: #5429cc;
		--blue-light: #6933ff;

		--text-title: #363f5f;
		--text-body: #969cb3;

		--background: #f0f2f5;
		--shape: #fff;

		--input-background: #e7e9ee;
		--input-border: #d7d7d7;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	// Acessibilidade
	html {
		@media (max-width: 1080px) {
			font-size: 93.75%; // 15px
		}

		@media (max-width: 720px) {
			font-size: 87.5%; // 14px
		}
	}

	body {
		background: var(--background);
		-webkit-font-smoothing: antialiased;
	}

	body, input, textarea, button {
		font-family: 'Poppins', sans-serif;
		font-weight: 400;
	}

	button {
		cursor: pointer;
	}

	[disabled] {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/*
	 * Estilização do modal 
	 */ 

	.react-modal-overlay {
		background: rgba(0, 0, 0, 0.5);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.react-modal-content {
		position: relative;

		width: 100%;
		max-width: 576px;
		background: var(--background);
		padding: 3rem;
		border-radius: 0.25rem;

		button.modal-close {
			border: 0;
			background: transparent;

			position: absolute;
			top: 1.5rem;
			right: 1.5rem;
			transition: filter 0.2s;

			&:hover {
				filter: brightness(80%);
			}
		}
	}
`;