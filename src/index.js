import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import { UserContext } from './contexts/usercontext';
import { useState } from 'react';
import './assets/reset.css'
import './assets/style.css'
import TelaCadastro from './authScreens/telacadastro'
import TelaLogin from './authScreens/telalogin'
import TelaInicial from './userScreens/telainicial'
import TelaNovoRegistro from './userScreens/novoregistro'


function App(){
    const [user,setUser]=useState({})
    console.log(user.token)
    return (
        <UserContext.Provider value={{user,setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TelaLogin />} />
                    <Route path="/sign-up" element={<TelaCadastro />} />
                    <Route path="/telainicial" element={<TelaInicial />} />
                    <Route path="/newRegister/:type" element={<TelaNovoRegistro />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}

ReactDOM.render(
    <App />, document.querySelector('.root')
  );
