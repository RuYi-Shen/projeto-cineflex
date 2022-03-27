import styled from 'styled-components';

import loading from '../assets/loading.gif';

export default function Loading() {
    return (
        <Div>
            <img src={loading} alt="loading" />
            <p>Carregando...</p>
        </Div>

    );
}

/**************************** css ****************************/

const Div = styled.div`	

    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
`;