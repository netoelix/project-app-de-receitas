import styled from 'styled-components';

export const StyledHeader = styled.div`
    background-color: #FCDC36;
    min-height: 7vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: calc(10px + 2vmin);
    color: white;

        button {
            background-color: #FCDC36;
        }
    `;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h1 {
        color: #41197F;
        text-align: center;
        font-family: sans-serif;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: 2.1px;
        text-transform: uppercase;
    }
    `;

export const SearchConteinerBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #41197F;
    border-radius: 5px;
    color: #fff;
    width: 85%;
    padding: 10px;

    button {
        background-color: #FCC436;
        color: #41197F;
        border: none;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
        cursor: pointer;
        font-size: 1em;
        color: #FFF;
        font-family: sans-serif;
        font-size: 12px;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }

    input {
        border: none;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
        font-size: 1em;
    }
    `;
