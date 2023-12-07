import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    .profile-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;

        img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 20px;
        }

        p {
            color: #1A1B1C;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
    h2 {
        color: #1A1B1C;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin-bottom: 20px;
    }
    button {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid #ccc;
        background-color: #fff;
        margin-right: 60px;

        img {
            margin-right: 20px;
        }
    }
    `;
