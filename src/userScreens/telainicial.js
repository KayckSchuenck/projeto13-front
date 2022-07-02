import axios from 'axios'
import { useEffect,useState,useContext } from 'react'
import { UserContext } from '../contexts/usercontext'
import logout from '../assets/logout.svg'
import plus from '../assets/plus.svg'
import minus from '../assets/minus.svg'
import styled from 'styled-components'
import { useNavigate,Link } from 'react-router-dom'

export default function TelaInicial(){
    const navigate=useNavigate()
    const { user,setUser }=useContext(UserContext)
    const {dados,setDados}=useState("")
    let total;
    useEffect(()=>{
        const promise=axios.get("http://localhost:5000/registers",{
                headers: {
                    Authorization:`Bearer ${user.token}`
                }
        })
        promise
        .then(e=> {
            total = e.map(elem=>{
                const toFloater=elem.price.replace(",",".")
                if(elem.type==='entry'){
                    return parseFloat(toFloater)
                }
                if(elem.type==='withdraw'){
                    return parseFloat(`-${toFloater}`)
                }
            })
            .reduce((acc, elem) => acc + elem.price, 0);
            setDados(e) 
        }) 
        .catch(error=> { 
            alert(`${error.response.message}, tente novamente`) 
            return(<h1>Erro</h1>)
        })
    },[])
    if(dados==="") return <>loading</>
    return(
        <>
            <Flex>
            <h2>Olá, {user.name}</h2>
            <img onClick={()=>navigate('/')} src={logout} />
            </Flex>
            <Registros>
            {(!dados ? (<>Não há registros de entrada ou saída</>) : 
            <>
            {dados.map(element=>
                <Flex2>
                    <span>{element.date}</span>
                    <p>{element.description}</p>
                    <Price type={element.type}>{element.price}</Price>
                </Flex2>
            )}
            </>
            )}
            <span>Saldo</span> {total}
            </Registros>
            <Footer>
                <Link to="/newRegister:entry">
                    <button>
                        <img src={plus}/>
                        Nova Entrada
                    </button>
                </Link>
                <Link to="/newRegister:withdraw">
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
align-items: center;
justify-content: center;
text-align: center;
font-size:20px;
color:#868686;
`
const Flex2=styled.header`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 16px;
span{
    color:#C6C6C6;
}
`
const Price=styled.span`
color:${props=>props.type==='withdraw' ? '#C70000' : '#03AC00'};
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