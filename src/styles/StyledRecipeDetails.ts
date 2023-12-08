import styled from 'styled-components';

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
    p, button {
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
    ul {
        list-style: none;
        padding: 0;
        border: 1px solid #B1B1B1;
        border-radius: 5px;
    }
    li {
        margin: 10px;
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
    div {
        border: 1px solid #B1B1B1;
        border-radius: 5px;
        padding: 10px;
    }
    p {
        text-align: justify;
    }
`;

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25px 10px;

    h2 {
        margin: 10px;
    }
    iframe {
        border: 1px solid #B1B1B1;
        border-radius: 5px;
        width: 100%;
        height: 250px;
    }
`;

export const RecomendedContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 25px 10px;

    p {
        margin: 10px;
        font-weight: bold;
        font-size: 28px;
    }
`;

export const RecomendedCards = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: scroll;
    width: 100%;

    .recommendation-card {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 10px;
        width: 150px;
        text-align: center;
        border: 1px solid #B1B1B1;
        border-radius: 5px;
    }
    img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    p {
        margin: 5px;
        margin-left: 10px;
        font-weight: 400;
        font-size: 18px;
    }
`;

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  border-radius: 5px;
  border: none;
  background-color: #41197F;
  color: #FCC436;
  font-weight: bold;
  font-size: 18px;
  width: 150px;
  height: 50px;
  margin-bottom: 55px;
  bottom: 0;
  display: flex;
  position: fixed;
  z-index: 2;
`;

export const ButtonStartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    `;
