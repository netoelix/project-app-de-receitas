import styled from 'styled-components';

export const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
    border-top: 1px solid #ccc;
    z-index: 100;
    background-color: #41197F;
    width: 100%;
    
    p {
        color: #FCDC36;
        font-size: 20px;
        font-weight: bold;
        border: 2px solid #FCDC36;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
        box-shadow: rgba(0, 0, 0, 0.45) 0px 35px 10px 0px;
    }
    img {
    height: 24px;
    width: 24px;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 30px 10px 0px;
    }
    button {
    background: none;
    cursor: pointer;
    }
    `;
