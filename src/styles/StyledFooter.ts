import styled from 'styled-components';

export const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-top: 1px solid #ccc;
    z-index: 100;
    background-color: #41197F;
    
    p {
        color: #FCDC36;
        font-size: 20px;
        font-weight: bold;
        border: 2px solid #FCDC36;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
    }
    `;
