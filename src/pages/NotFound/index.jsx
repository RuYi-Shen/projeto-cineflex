import { Link } from 'react-router-dom';
import styled from "styled-components";

export default function NotFound() {
    return (
        <Div>
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </Div>
    )
}

const Div = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
`;