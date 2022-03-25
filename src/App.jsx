import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Session from "./pages/Session";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";

import './css/normalize.css';
import './css/style.css';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/session/:id" element={<Session />} />
                <Route path="/success" element={<Success />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}