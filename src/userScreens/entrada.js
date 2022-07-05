import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/usercontext'

export default function Entrada(props){
    const {user,setUser}=useContext(UserContext)
    function reloadApi(){
        const promise=axios.get("https://projeto13-back.herokuapp.com/registers",{
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
        })
        promise
        .then(e=> {
            props.setDados(e.data.entradas)
            props.setTotal(e.data.total)
        }) 
        .catch(error=> { 
            alert(error.response.data)
        })
    }
    function deleteEntry(){
        if(!window.confirm("Deseja mesmo excluir esse registro?")) return
        const promise=axios.delete('https://projeto13-back.herokuapp.com/registers',{
            headers: {
              Authorization: `Bearer ${user.token}`,
              id:props.id
            },
          })
        promise.then(reloadApi)
        .catch(()=>alert ("Erro deletando a mensagem, tente novamente"))
    }
    const padronizar=Number(props.price.replace(",",".")).toFixed(2)
    return(
                <Entry>
                    <Flex><span>{props.date}</span>
                    {props.description}</Flex>
                    <Price type={props.type}>{padronizar}<span onClick={()=> deleteEntry()}>x</span></Price>
                </Entry>
    )
}

const Entry=styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 16px;
color: black;
span{
    color:#C6C6C6;
}

`
const Price=styled.p`
color:${props=>props.type==='withdraw' ? '#C70000' : '#03AC00'};
display:flex;
column-gap: 10px;
`
const Flex=styled.div`
display:flex;
column-gap: 15px;
`