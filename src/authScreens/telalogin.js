import styled from "styled-components"
import { Link,useNavigate } from "react-router-dom"
import { useState,useContext } from "react"
import axios from "axios"
import { UserContext } from '../contexts/usercontext';

export default function TelaLogin() {
const {user,setUser} = useContext(UserContext);
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()

    function clearInputs(){
        setEmail("")
        setPassword("")
    }

    function handleSubmit(e){
        e.preventDefault()
        const loginPost={
            email,
            password
        }
        const promise=axios.post("http://localhost:5000/login/",loginPost)
        promise.then((element)=>{
            const {name,userId,token}=element;
            setUser({
            name,
            userId,
            token
            })
            navigate('/telainicial')
        })
        promise.catch(erro=>{
            alert(`Erro ${erro.response.status}, tente novamente`);
            clearInputs()
        })
    }

    return (
        <Tela>
            <h1>MyWallet</h1>
            <Form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} required/>
                <button type="submit">Entrar</button>
            </Form>
            <Link to="/sign-up">
            Primeira vez? Cadastre-se!
            </Link>
        </Tela>
    )
}

const Tela=styled.div`
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
a{
    font-size: 15px;
    color:white;
    text-decoration: none;
    margin-bottom: 15vh;
    margin-top: 22px;
    font-weight: 700;
}
input::placeholder{
    color:black;
}
`
const Form=styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
