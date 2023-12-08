import styled from 'styled-components';

export const PrincipalContainer = styled.div`
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

    button {
        background-color: #41197f;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        padding: 5px 15px;
    }
    button:hover {
        background-color: #0056b3;
    }
    a {
        color: black;
        text-decoration: none;
    }
    h1 {
        text-decoration: none;
    }
    p {
        text-decoration: none;
    }
`;

export const ContainerImage = styled.div`
    text-align: center;
    img {
        border-radius: 8px;
        height: 270px;
        width: 280px;
    }
`;

export const ContainerInfo = styled.div`
    color: black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    h1 {
        font-size: 20px;
        text-decoration: none;
    }
    p {
        font-size: 11px;
    }
    a {
        color: black;
        text-decoration: none;
    }
`;
