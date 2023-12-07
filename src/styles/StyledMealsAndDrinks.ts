import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
  /* width: 90vh;
  height: 10vh; */


  button {
    align-items: center;
    background-color: white;
    color: blueviolet;
    display: flex;
    flex-direction: column;
    padding: 3px;
    margin: 3px;
    justify-content: center;
    margin-bottom: 25px;
    color: black;
    
    &:hover {
      font-weight: bold;
      font-size: 14px;
    }

    img {
      height: 36px;
      width: 36px;
    }

  }
  `;

export const ImageContainer = styled.div`
    border: 3px solid #fcc436;
    border-radius: 50%;
    padding: 10px;
    margin: 2px;
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

export const TextContainer = styled.div`
  margin-top: 100px;
  align-items: center;
  background-color: white;
  position: absolute;
  font-size: 12px;
`;
