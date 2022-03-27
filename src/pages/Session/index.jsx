import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

export default function Session() {
    const [sessionInfo, setSessionInfo] = useState({});
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { id } = useParams();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [validCpf, setValidCpf] = useState(true);

    let navigate = useNavigate();

    const nameRegex = "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";
    const cpfRegex = "^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$";

    function validateCpf(cpf) {
        cpf = cpf.replace(/[^\d]/g, "");
        let sum;
        let rest;
        sum = 0;
        if (cpf === "00000000000") {setValidCpf(false); return}
        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10))) {setValidCpf(false); return}
        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;
        if ((rest === 10) || (rest === 11)) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) {setValidCpf(false); return}
        {setValidCpf(true); return}
    }

    function bookSeat(e) {
        e.preventDefault();
        if (validCpf && selectedSeats.length > 0) {
            navigate("../success", {state: { name: name, cpf: cpf , session: sessionInfo, seats: [...selectedSeats].sort(function(a, b){return a-b})}});
        }
        else if (selectedSeats.length === 0) alert("Selecione ao menos um assento");
    }

    function select(index){
        let aux = [...seats]; 
        if (seats[index].isAvailable && aux[index].name !== "selected") {
            aux[index].name = "selected";
            setSelectedSeats([...selectedSeats, (index+1)]);
            setSeats(aux);
        }
        else if(aux[index].name === "selected"){
            aux[index].name = `${index+1}`;
            setSelectedSeats([...selectedSeats].filter(seat => seat !== index+1));
            setSeats(aux);
        }
    }

    function selected(name) {
        if (name === "selected") {
            return true;
        }
        return false;
    }

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
            .then(response => {
                setSessionInfo(response.data);
                setSeats(response.data.seats);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function setColor(state) {
        if (state === "selected") {
            return { backgroundColor: "#8DD7CF", borderColor: "#45BDB0" };
        }
        if (state) {
            return { backgroundColor: "#C3CFD9", borderColor: "#808F9D" };
        }
        else return { backgroundColor: "#FBE192", borderColor: "#F7C52B" };
    }

    return Object.keys(sessionInfo).length !== 0 ? (
        <Main>
            <h2>Selecione o(s) assento(s)</h2>
            <section className="seats">
                {
                    seats.length !== 0 ? (
                        seats.map((seat,index) => {
                            const { id, name, isAvailable } = seat;
                            return !selected(name) ? (
                                <Div className="seat" key={id} onClick={()=>select(index)} color={setColor(isAvailable)}>
                                    <p>{`${index+1}`.padStart(2, "0")}</p>
                                </Div>
                            ) :
                            (
                                <Div className="seat" key={id} onClick={()=>select(index)} color={setColor("selected")}>
                                    <p>{`${index+1}`.padStart(2, "0")}</p>
                                </Div>
                            )
                        })
                    ) :
                        (
                            <p>Sala em manutenção</p>
                        )
                }
            </section>
            <div className="subtitles">
                <div className="subtitle">
                    <Div className="color-circle" color={setColor("selected")}></Div>
                    <p>Selecionado</p>
                </div>
                <div className="subtitle">
                    <Div className="color-circle" color={setColor(true)}></Div>
                    <p>Disponível</p>
                </div>
                <div className="subtitle">
                    <Div className="color-circle" color={setColor(false)}></Div>
                    <p>Indisponível</p>
                </div>
            </div>
            <form onSubmit={bookSeat}>
                <label htmlFor="name">Nome do comprador:</label>
                <input type="text" id="name" name="name" maxLength="40" minLength="3" pattern={nameRegex} placeholder="Digite seu nome..." required value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="cpf">CPF do comprador:</label>
                <input type="text" id="cpf" name="cpf" maxLength="14" minLength="11" pattern="^[0-9.-]*$" placeholder="Digite seu CPF..." required value={cpf} onChange={e => {setCpf(e.target.value); validateCpf(e.target.value)}} />
                { !validCpf ?
                    <p>CPF inválido</p> :
                    <></>
                }
                <div className="centralize">
                    <button type="submit">Reservar assento(s)</button>
                </div>
            </form>
            <Footer movieInfo={sessionInfo.movie} sessionInfo={sessionInfo} />
        </Main>
    ) :
        (
            <Loading />
        )
}


const Main = styled.main`

    margin-top: 67px;
    margin-bottom: 117px;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
        width: 100vw;
        height: 100px;

        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        letter-spacing: 0.04em;

        color: #293845;
    }
    
    .seats {
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        
        .seat {
            width: 8%;
            height: calc((100vw - 48px)*8/100);
            max-height: 64px;

            box-sizing: border-box;
            border-radius: calc((100vw - 48px)*8*26/1200);

            margin: 1%;

            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;

            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 3vw;
            line-height: 13px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.04em;

            color: #000000;

            &:hover {
                cursor: pointer;
            }
        }
    }
    
    .subtitles {
        width: 100%;
        max-width: 800px;
        display: flex;
        justify-content: space-evenly;
        margin-top: 16px;
        margin-bottom: 34px;

        .subtitle {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 3vw;
            line-height: 15px;
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
            letter-spacing: -0.013em;

            color: #4E5A65;

            .color-circle {
                width: calc((100vw - 48px)*8/100);
                max-width: 64px;
                height: calc((100vw - 48px)*8/100);
                max-height: 64px;
                border-radius: calc((100vw - 48px)*8*26/1200);
                
                margin-bottom: 1vw;
            }
        }
    }

    form {
        width: 100%;
        max-width: 800px;
        display: flex;
        flex-direction: column;

        label {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 21px;
            display: flex;
            align-items: center;

            margin-top: 7px;

            color: #293845;
        }

        input {
            height: 51px;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 3px;

            padding-left: 18px;

            &::placeholder {
                font-family: 'Roboto';
                font-style: italic;
                font-weight: 400;
                font-size: 18px;
                line-height: 21px;
                display: flex;
                align-items: center;

                color: #AFAFAF;
            }
        }
        
        .centralize {
            display: flex;
            justify-content: center;

            button {
                width: 225px;
                height: 42px;
        
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
                margin-top: 57px;
                margin-bottom: 10px;
        
                background: #E8833A;
                border-radius: 3px;
                border: none;
        
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 21px;
                display: flex;
                align-items: center;
                text-align: center;
                letter-spacing: 0.04em;
        
                color: #FFFFFF;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        p {
        width: 100%;
        display: flex;
        justify-content: start;
        padding: 10px;

        color: red;
    }
    }
`;

const Div = styled.div`
    border: 1px solid ${props => props.color.borderColor};
    background-color: ${props => props.color.backgroundColor};
`;