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
    background-color: #41197F;
    padding: 5px;

    h1 {
        color: white;
        text-align: center;
        font-family: sans-serif;
        font-size: 40px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
        letter-spacing: 2.1px;
        text-transform: uppercase;
        margin-top: 8px;
    }
    `;

export const SearchConteinerBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #41197F;
    color: #fff;
    width: 100%;
    padding: 10px;

    button {
        background-color: #FCC436;
        color: #41197F;
        border: none;
        border-radius: 20px;
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
        width: 150px
    }

    input {
        border-radius: 20px;
        padding: 10px;
        margin: 5px;
        font-size: 2em;
    }
`;

export const CustomInputRadio = styled.div`
    input {
        display: none;
    }
    input + label:before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: white;
        border: 1px solid #B1B1B1;
        display: inline-block;
        vertical-align: middle;
        margin-left: 8px;
        margin-right: 8px;
        margin-bottom: 3px;
    }
    input:checked + label:before {
        background-color: #FCC436;
        box-sizing: border-box;
        border: 3px solid white;
        padding: 4px;
}
`;

export const InputRadiosContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 7px;
    margin-bottom: 20px;
`;

export const SearchInput = styled.input`
    width: 90%;
    height: 25px;
    border: 1px solid #B1B1B1;
    text-align: center;
    font-weight: 500;
`;
