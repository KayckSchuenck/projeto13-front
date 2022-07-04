import axios from 'axios'
import { useEffect,useState,useContext } from 'react'
import styled from 'styled-components'
import { useNavigate,Link } from 'react-router-dom'
import { UserContext } from '../contexts/usercontext'
import logout from '../assets/logout.svg'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import Entrada from './entrada'


export default function TelaInicial(){
    const navigate=useNavigate()
    const { user,setUser }=useContext(UserContext)
    const [dados,setDados]=useState()
    const [total,setTotal]=useState()
    useEffect(()=>{
        const promise=axios.get("http://localhost:5000/registers",{
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
        })
        promise
        .then(e=> {
            console.log(e)
            setDados(e.data.entradas)
            setTotal(e.data.total)
        }) 
        .catch(error=> { 
            alert(error.response.data) 
            return(<h1>Erro</h1>)
        })
    },[])
    if(!dados) return <h1>Loading</h1>
    return(
        <>
            <Flex>
            <h2>Olá, {user.name}</h2>
            <img onClick={()=>navigate('/')} src={logout} />
            </Flex>
            <Registros>
            {(dados.length===0 ? (<>Não há registros de entrada ou saída</>) : 
            <>
            {dados.map((elem,index)=>
                <Entrada date={elem.date} description={elem.description} price={elem.price} type={elem.type} key={index}/>
            )}
            </>
            )}
            <Flex2 total={total} >SALDO <span>{total}</span></Flex2>
            </Registros>
            <Footer>
                <Link to="/newRegister/entry">
                    <button>
                        <img src={plus}/>   
                        Nova Entrada
                    </button>
                </Link>
                <Link to="/newRegister/withdraw">
                    <button>
                        <img src={minus}/>
                        Nova Saída
                    </button>
                </Link>
            </Footer>
        </>
    )
}

const Flex=styled.header`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 25px;
img{
    height: 24px;
    width: 24px;
}
`

const Registros=styled.div`
background-color: white;
height: 67vh;
padding: 12px;
margin-top: 22px;
border-radius: 5px;
display: flex;
flex-direction: column;
align-items: space-between;
justify-content: space-between;
text-align: center;
font-size:20px;
color:#868686;
`
const Footer=styled.footer`
display: flex;
align-items: center;
justify-content: space-between;
button{
    background-color: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    font-size: 17px;
    font-weight: 700;
    height: 114px;
    padding: 10px;
    width: 42vw;
    color: white;
    margin:15px 0;
}
img{
    height: 22px;
    width: 22px;
}
a{
    text-decoration: none;
}
`
const Flex2=styled.div`
display: flex;
font-weight: 700;
font-size: 17px;
justify-content: space-between;
span{
    font-weight: 400;
    color:${props=>props.total>=0 ? '#03AC00' : '#C70000'};
}
`