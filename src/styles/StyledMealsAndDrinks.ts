import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 10vh;
  justify-content: space-between;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 46px;
  width: 90%;

  
  button {
    align-items: center;
    background-color: white;
    color: blueviolet;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    justify-content: center;
    
    
    &:hover {
      font-weight: bold;
      font-size: 15px;
    }

    img {
      height: 40px;
      width: 40px;
    }


  }

  `;

export const ImageContainer = styled.div`
    border: 3px solid #fcc436;
    border-radius: 50%;
    padding: 10px;
    margin: 6px;
    margin-bottom: 8px;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.2);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    
      &:not(:hover) {
        transform: scale(1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
  `;
