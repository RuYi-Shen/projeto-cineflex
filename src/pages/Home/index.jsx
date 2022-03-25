import { useState, useEffect } from "react";
import axios from "axios";
import loading from "../../assets/loading.gif";

import './style.css';

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

    return movies !== [] ? ( 
        <main>
            <h2>Selecione o filme</h2>
            <section>
                {
                    movies.map(movie => {
                        const {posterURL, title, id} = movie;
                        return (
                            <div className="poster" key={id}>
                                <img src={posterURL} alt={title} />
                            </div>
                        );
                    })
                }
            </section>
        </main>
    ) : (
        <img src={loading} alt="loading" />
    );
}