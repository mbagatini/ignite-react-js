import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
	display: flex;
	flex-direction: column;

	h2 {
		color: var(--text-title);
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	input {
		width: 100%;
		height: 4rem;
		padding: 0 1.5rem;
		border-radius: 0.25rem;
		border: 1px solid var(--input-border);
		background: var(--input-background);
		font-size: 1rem;

		&::placeholder {
			color: var(--text-body);
		}

		& + input {
			margin-top: 1rem;
		}
	}
	
	button[type='submit'] {
		width: 100%;
		height: 4rem;
		margin-top: 1.5rem;
		padding: 0 1.5rem;
		color: var(--shape);
		background: var(--green);
		border: 0;
		border-radius: 0%.25rem;
		font-size: 1rem;
		transition: filter 0.2s;

		&:hover {
			filter: brightness(90%);
		}
	}
`;

export const TransactionTypeContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
	margin: 1rem 0;
`;

interface RadioBoxrProps {
	isActive: boolean;
	activeColor: 'green' | 'red';
}

/* Aqui não é possível usar a var */
const colors = {
	green: '#33cc95',
	red: '#e52e4d',
};

export const RadioBox = styled.button<RadioBoxrProps>`
	height: 4rem;
	border: 1px solid var(--input-border);
	background: transparent;
	display: flex; 
	align-items: center;
	justify-content: center;

	transition: border-color 0.2s;

	&:hover {
		border-color: ${darken(0.1, "#d7d7d7")};
	}

	background: ${props => props.isActive ? transparentize(0.9, colors[props.activeColor]) : 'transparent'};

	img {
		width: 20px;
		height: 20px;
	}
	
	span {
		margin-left: 1rem;
		font-size: 1rem;
	}

`;