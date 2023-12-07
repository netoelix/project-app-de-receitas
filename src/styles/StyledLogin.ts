import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h1 {
      margin-bottom: 2rem;
      font-family: 'Roboto', sans-serif;
    }
    input {
        padding: 1rem;
        margin-bottom: 1rem;
        width: 300px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    
    button {
        padding: 1rem;
        width: 200px;
        border-radius: 5px;
        background-color: #FCC436;
        color: #FFF;
        font-size: 1.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: opacity 0.3s ease-in-out;

        &:disabled {
            opacity: 0.5; 
            cursor: not-allowed;
        }
          
    
          

    }





    `;
export const ContainerDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #41197F;
    background: linear-gradient(to bottom, #41197F 75.5%, white 34.5%);
    padding-top: 2rem;
`;

export const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    background-color: #41197F;
    background: linear-gradient(to bottom, #41197F 100%, white 34.5%);
    padding: 24px;
    text-transform: uppercase;
    width: 100%;
    `;
