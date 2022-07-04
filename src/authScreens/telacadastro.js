import styled from "styled-components"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function TelaCadastro() {
    const navigate=useNavigate()
    function clearInputs(){
        return {
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }
    const [postForm,setPostForm]=useState(clearInputs)

    function handleForm(e){
        setPostForm({
            ...postForm,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(postForm.password!==postForm.confirmPassword){
            alert("Senhas diferentes")
        }
        const promise=axios.post("http://localhost:5000/sign-up/",postForm)
        setPostForm(clearInputs)
        promise.then(()=>{
            alert("Conta criada com sucesso")
            navigate('/')
        })
        promise.catch(erro=>{
            alert(`${erro.response.data.message}`);
        })
    }

    return (
        <Tela>
            <h1>My Wallet</h1>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" name="name" value={postForm.name} onChange={handleForm} required/>
                <input type="email" placeholder="E-mail" name="email" value={postForm.email} onChange={handleForm} required/>
                <input type="password" placeholder="Senha" name="password" value={postForm.password} onChange={handleForm} required/>
                <input type="password" placeholder="Confirme a senha" name="confirmPassword" value={postForm.confirmPassword} onChange={handleForm} required/>
                <button type="submit">Cadastrar</button>
            </Form>
            <Link to="/">
            Já tem uma conta? Entre agora!
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
    margin-top: 18px;
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
