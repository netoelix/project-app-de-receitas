import styled from 'styled-components';
import { checkedIcon } from '../Utils/exportIcons';

export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    position: absolute;
    text-align: center;
    margin: 10px;
    color: white;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    filter: brightness(70%);
    /* filter: blur(2px) */
  }
`;

export const CategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #FCC436;
    position: absolute;
    z-index: 1;
    width: 100%;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }
    p, button, h3 {
        margin: 10px;
        font-weight: bold;
    }
    button {
        background-color:transparent;
    }
`;

export const IngredientsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25px 10px;
    
    h2 {
        margin: 10px;
    }
    
    input {
        margin: 5px;
    }
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid #B1B1B1;
        border-radius: 5px;
        padding: 10px;
    }
`;

export const InstructionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25px 10px;

    h2 {
        margin: 10px;
    }
    p {
        border: 1px solid #B1B1B1;
        border-radius: 5px;
        padding: 10px;
        text-align: justify;
    }
`;

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #FCC436;
  color: white;
  font-weight: bold;
  font-size: 18px;
  width: 200px;
  height: 50px;
  margin-bottom: 70px;
  margin-left: 25%;
`;

export const CheckBoxCustom = styled.section`
    padding: 3px;
    input {
        display: none;
    }
    input + label:before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 3px solid #FCC436;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom: 3px;
    }
    input:checked + label:before {
    background-image: url(${checkedIcon});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
`;
