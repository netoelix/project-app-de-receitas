import styled, { keyframes } from 'styled-components';

const loading = keyframes`
    0% {
        background-color: grey;
    }
    25% {
        background-color: lightgrey;
    }
    50% {
        background-color: grey;
    }
    75% {
        background-color: lightgrey;
    }
    100% {
        background-color: grey;
    }
`;

export const StyledLoading = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;

  div {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 8px 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-evenly;
    margin: 20px;
    padding: 6px;
    text-decoration: none;
    transition: transform 0.3s ease-in-out;
    width: 300px;
    height: 400px;
    background-color: grey;
    animation: ${loading} 2s alternate infinite;
  }
`;

export const StyledButtonLoading = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 70px;

    div {
        width: 39px;
        height: 39px;
        border: 3px solid grey;
        background-color: grey;
        border-radius: 50%;
        padding: 10px;
        margin: 2px 10px;
        margin-bottom: 8px;
        transition: transform 0.3s ease-in-out;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        animation: ${loading} 2s alternate infinite;
    }
    `;
