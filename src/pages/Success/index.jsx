import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

export default function Success() {
    const {state} = useLocation();
    const {name, cpf, session, seats} = state;
    const {name:time, day, movie} = session;

    function formatCpf(cpf){
        cpf = cpf.replace(/[^\d]/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return (
        <Main>
            <h2>Pedido feito com sucesso!</h2>
            <section className="checkout-info">
                <div className="info">
                    <h3>Filme e sessão</h3>
                    <p>{movie.title}</p>
                    <p>{day.date} {time}</p>
                </div>
                <div className="info">
                    <h3>Ingressos</h3>
                    {seats.map(seat=>{return <p key={seat}>Assento {seat}</p>})}
                </div>
                <div className="info">
                    <h3>Comprador</h3>
                    <p>Nome: {name}</p>
                    <p>CPF: {formatCpf(cpf)}</p>
                </div>
            </section>
            <Link to="/">
                <button>Voltar pra Home</button>
            </Link>
        </Main>        
    )
}


const Main = styled.main`

    margin: 67px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h2 {
        width: 100vw;
        height: 100px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        letter-spacing: 0.04em;
        padding:0 20vw;

        color: #247A6B;
    }
    .checkout-info {
        width: 100vw;
        max-width: 500px;
        padding: 0 23px;

        .info {
            margin-bottom: 27px;

            h3 {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                display: flex;
                align-items: center;
                letter-spacing: 0.04em;

                margin-bottom: 10px;

                color: #293845;
            }

            p {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 22px;
                line-height: 26px;
                display: flex;
                align-items: center;
                letter-spacing: 0.04em;

                color: #293845;
            }
        }
    }

    button {
        width: 225px;
        height: 42px;
        margin-top: 62px;

        background-color: #E8833A;
        border-radius: 3px;
        border: none;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        letter-spacing: 0.02em;

        color: #FFFFFF;  
        
        &:hover {
            cursor: pointer;
        }
    }
`;
