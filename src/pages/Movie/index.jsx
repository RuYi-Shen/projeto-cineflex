import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

export default function Movie() {
    const [movieInfo, setMovieInfo] = useState({});
    const [sessions,setSessions] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
            .then(response => {
                setMovieInfo(response.data);
                setSessions(response.data.days);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return Object.keys(movieInfo).length !== 0 ? (
        <Main>
            <h2>Selecione o horário</h2>
            <section className="sessions">
                {
                    sessions.length !== 0 ? (
                        sessions.map(session => {
                            const {id, weekday, date, showtimes} = session;
                            return (
                                <div className="session" key={id}>
                                    <p>{weekday} - {date}</p>
                                    <div className="showtimes">
                                        {showtimes.map(showtime => {
                                            const {id, name} = showtime;
                                            return (
                                                <Link to={`/session/${id}`} key={id}>
                                                    <button>{name}</button>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    ) :
                    (
                        <p>Sem horários disponíveis</p>
                    )
                }
            </section>
            <Footer movieInfo={movieInfo}/>
        </Main>
    ) :
    (
        <Loading />
    )
}

const Main = styled.main`

    margin-top: 67px;
    margin-bottom: 117px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
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
    .sessions {
        width: 100vw;
        max-width: 500px;
        padding: 0 23px;

        .session{
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            align-items: center;
            letter-spacing: 0.02em;

            color: #293845;

            .showtimes {
                display: flex;

                button {
                    width: 83px;
                    height: 43px;
                    margin: 22px 0;
                    margin-right: 8px;

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
            }
        }
    }
`;
