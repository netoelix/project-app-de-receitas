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

// export const ImgContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     img {
//         width: 47vh;
//         flex-shrink: 0;
//     }
// `;
