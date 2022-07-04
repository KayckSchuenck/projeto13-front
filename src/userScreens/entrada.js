import styled from 'styled-components'

export default function Entrada(props){
    const padronizar=Number(props.price.replace(",",".")).toFixed(2)
    return(
                <Entry>
                    <Flex><span>{props.date}</span>
                    {props.description}</Flex>
                    <Price type={props.type}>{padronizar}</Price>
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
`
const Flex=styled.div`
display:flex;
column-gap: 15px;
`