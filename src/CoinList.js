import React from 'react'
import styled from 'styled-components'
import { subtleBoxShadow, greenBoxShadow, lightBlueBackground } from './Style';
const CoinGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    grid-gap:15px;
    margin-top:40px;
`
const CoinTile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding:10px;
    &:hover{
        cursor:pointer;
        ${greenBoxShadow}
    }
`
const CoinHeaderGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;
`
const CoinSymbol = styled.div`
    justify-self: right;
`
export default function(){
    return <CoinGrid>
        {Object.keys(this.state.coinList).slice(0,100).map((coin,index)=>
        <CoinTile key={index}>
        <CoinHeaderGrid>
        <div>{this.state.coinList[coin].CoinName}</div>
        <CoinSymbol>{this.state.coinList[coin].Symbol}</CoinSymbol>
        </CoinHeaderGrid>
        <img style={{height:'50px'}} alt="coin icon" src={`http://cryptocompare.com/${this.state.coinList[coin].ImageUrl}`}/>
        </CoinTile>
        )}
    </CoinGrid>
}