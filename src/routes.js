import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from "./Login/login";
import Sessoes from "./sessoes/sessoes";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/sessoes" element={<Sessoes/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;