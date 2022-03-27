import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Loading from "../../components/Loading";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return movies.length !== 0 ? ( 
        <Main>
            <h2>Selecione o filme</h2>
            <section>
                {
                    movies.map(movie => {
                        const {posterURL, title, id} = movie;
                        const link = `/movie/${id}`;
                        return (
                            <Link to={link} key={id}>
                                <div className="poster">
                                    <img src={posterURL} alt={title} />
                                </div>
                            </Link>
                        );
                    })
                }
            </section>
        </Main>
    ) : (
        <Loading />
    );
}

const Main = styled.main`

    margin-top: 67px;
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
    section {
        width: 100vw;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .poster {
        width: 145px;
        height: 209px;
        margin: 5px 15px;

        background: #FFFFFF;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .poster img {
        width: 129px;
        height: 193px;
    }
`;

