import React from 'react'
import {CoinGrid, CoinTile, CoinHeaderGrid, CoinSymbol} from './CoinList'
import styled, {css} from 'styled-components'
import {fontSize2, fontSize1, subtleBoxShadow, lightBlueBackground} from './Style'
import highchartsConfig from './HighchartsConfig';
import theme from './HighchartsTheme'

const ReactHighcharts = require('react-highcharts')
ReactHighcharts.Highcharts.setOptions(theme);

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
const PaddingBlue = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding:5px;
`

const ChartGrid = styled.div`
    display:grid;
    margin-top:14px;
    grid-gap:15px;
    grid-template-columns:1fr 3fr;
`

export default function(){
    var self = this;
    return <div>
    <CoinGrid>
        {this.state.prices.map(function(price,index){
        let sym = Object.keys(price)[0]
        let data = price[sym]['USD']
        let tileProps={
            dashboardFavorite:sym=== self.state.currentFavorite,
            onClick:()=>{
                self.setState({currentFavorite:sym,historical:null}, self.fetchHistorical);
                localStorage.setItem('cryptoDash', JSON.stringify({
                    ...JSON.parse(localStorage.getItem('cryptoDash')),
                    currentFavorite:sym,
                  }));
            }
        }
        return index<5 ?<CoinTile {...tileProps} key ={index}>
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
        <CoinTileCompact key ={index} {...tileProps}>
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
    <ChartGrid>
        <PaddingBlue>
            {this.state.coinList[this.state.currentFavorite] &&<h2 style={{textAlign:'center'}}>{this.state.coinList[this.state.currentFavorite].CoinName}</h2>}
            <img style={{height:'200px', display:'block', margin:'auto'}} alt="coin icon" src={`http://cryptocompare.com/${this.state.coinList[this.state.currentFavorite].ImageUrl}`}/>
        </PaddingBlue>
        <PaddingBlue>
            {this.state.historical ? 
            <ReactHighcharts config={highchartsConfig.call(this)}></ReactHighcharts>
        :<div>Loading historical data...</div>}
        </PaddingBlue>
    </ChartGrid>
    </div>
}