import styled from 'styled-components';

export const DoneRecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const CardRecipeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 85%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #fff;

    img {
        background-color: white;
    }
`;

export const CardRecipeImage = styled.img`
    width: 163.346px;
    height: 134.854px;
    border-radius: 5px 0 0 5px;
`;

export const CardRecipeInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 10px;

    h1 {
        color: #1A1B1C;
        font-family: sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    a {
        text-decoration:none;
    }
    a:visited {
        text-decoration:none;
    }
    a:hover {
        text-decoration:underline;
    }
    p {
        color: #1A1B1C;
        font-family: sans-serif;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding-top: 5px;
    }
    span {
        color: #797D86;
    }
`;

export const TagContainer = styled.div`
    display: flex;
    flex-direction: row;
    p {
        width: 29px;
        height: 14px;
        flex-shrink: 0;
        border-radius: 10px;
        background: #D9D9D9;
        margin-top: 10px;
        text-align: center;
        margin-right: 5px;
        color: #797D86;
    }
`;
