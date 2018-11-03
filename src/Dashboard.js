import React from 'react'
import {CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol} from './CoinList'
import styled, {css} from 'styled-components'
import {fontSize2, fontSize1} from './Style'


const numberFormat =(number) =>{
    return +(number+'').slice(0,7);
}
const ChangePct = styled.div`
color:green;
${props=>props.red && css`
    color:red;
`}
`
const TicketPrice=styled.div`
${fontSize2}
`
const CoinTileCompact=styled(CoinTile)`
    ${fontSize1}
    display:grid;
    grid-gap:5px;
    grid-template-columns:repeat(3,1fr);
    // justify-items:right;
`

export default function(){
    return <CoinGrid>
        {this.state.prices.map((price,index)=>{
        let sym = Object.keys(price)
        let data = price[sym]['USD']
        return index<5 ?<CoinTile key ={index}>
        <CoinHeaderGrid>
            <div>{sym}</div>
            <CoinSymbol>
            <ChangePct red ={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}%
            </ChangePct>
            </CoinSymbol>
        </CoinHeaderGrid>
        <TicketPrice>${numberFormat(data.PRICE)}</TicketPrice>
        </CoinTile>:
        <CoinTileCompact key ={index}>
            <div>{sym}</div>
            <CoinSymbol>
            <ChangePct red ={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}%
            </ChangePct>
            </CoinSymbol>
            <div>${numberFormat(data.PRICE)}</div>
        </CoinTileCompact>
    })}
    </CoinGrid>
}