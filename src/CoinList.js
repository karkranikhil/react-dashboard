import React from 'react'
import styled, {css} from 'styled-components'
import { subtleBoxShadow, greenBoxShadow,redBoxShadow, lightBlueBackground } from './Style';
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
    ${props=>!props.favorite && css`
    &:hover{
        cursor:pointer;
        ${greenBoxShadow}
    }
    `}
    ${props=>props.favorite && css`
    &:hover{
        cursor:pointer;
        ${redBoxShadow} !important;
    }
    `}
`

const CoinHeaderGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;
`
const CoinSymbol = styled.div`
    justify-self: right;
`
export default function(favorites=false){
    let coinKeys = favorites ? this.state.favorites:Object.keys(this.state.coinList).slice(0,100)
    return <CoinGrid>
        {coinKeys ? coinKeys.map((coinKey,index)=>
            <CoinTile favorite={favorites} key={index} onClick={favorites ? ()=>{this.removeCoinFromFavorites(coinKey)}:()=>{this.addCointToFavorites(coinKey)}}>
                <CoinHeaderGrid>
                    <div>{this.state.coinList[coinKey].CoinName}</div>
                    <CoinSymbol>{this.state.coinList[coinKey].Symbol}</CoinSymbol>
                </CoinHeaderGrid>
            <img style={{height:'50px'}} alt="coin icon" src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`}/>
            </CoinTile>
        ):null}
    </CoinGrid>
}