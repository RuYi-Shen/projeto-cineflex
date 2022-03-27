import styled from "styled-components";

export default function Header() {
    return (
        <Title>
            <h1>CINEFLEX</h1>
        </Title>
    );
}

const Title = styled.header`
    
    position: fixed;
    width: 100vw;
    height: 67px;
    left: 0px;
    top: 0px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: #C3CFD9;

    z-index: 1;

    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 40px;
        display: flex;
        align-items: center;
        text-align: center;

        color: #E8833A;
    }  
`;