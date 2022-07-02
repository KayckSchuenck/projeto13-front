import axios from "axios"
import dayjs from "dayjs"
import {useState,useContext} from 'react'
import { UserContext } from "../contexts/usercontext"
import styled from 'styled-components'
import { useParams } from "react-router-dom"

export default function TelaNovoRegistro(){
    const { type }=useParams()
    let typeRegister=""
    if(type==='entry'){
        typeRegister='Entrada'
    } else{
        typeRegister='Saída'
    }
    const {user,setUser}=useContext(UserContext)
    const {price,setPrice}=useState("")
    const {description,setDescription}=useState("")
    function clearInputs(){
        setPrice("")
        setDescription("")
    }

    function handleSubmit(){
        clearInputs()
        const registerPost={
            price,
            description,
            date:dayjs().format('DD/MM'),
            type
        }
        const config={
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.post("http://localhost:5000/registers",registerPost,config)
    }

    return (
        <>
        <h2>Nova {typeRegister}</h2>
        <Form onSubmit={handleSubmit}>
            <input type='text' placeholder="Valor" value={price} onChange={e=>setPrice(e.target.value)} required />
            <input type='text' placeholder="Descrição" value={description} onChange={e=>setDescription(e.target.value)} required/>
            <button type='submit'>
                Salvar {typeRegister}
            </button>
        </Form>
        </>
    )
}

const Form=styled.form`
margin-top: 40px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
input, button{
    border-radius: 5px;
    height:60px;
    margin-bottom: 14px;
    width: 88vw;
    padding: 15px;
    font-size:20px;
}
button{
    background-color: #A328D6;
    color:white;
    font-weight: 700;
}
input::placeholder{
    color:black;
}
`