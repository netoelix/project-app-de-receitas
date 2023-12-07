import styled from 'styled-components';

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 320px;
        height: 100px;
        margin: 20px;
        border-radius: 10px;
        border: none;
        background-color: #41197F;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        transition: 0.2s;
        color: #fff;
        font-size: 25px;
        font-weight: bold;
        text-transform: uppercase;

    }
    img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
    }
    `;

export const FooterContainerHome = styled.div`
    position: fixed;
    bottom: 0;
    background-color: #41197F;
    background: linear-gradient(to bottom, #41197F 100%, white 34.5%);
    padding: 24px;
    text-transform: uppercase;
    width: 100%;
    z-index: 101;
    `;
