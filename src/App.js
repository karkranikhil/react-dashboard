import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import NavBar from './NavBar'
import CoinList from './CoinList'
import cc from 'cryptocompare'
import _ from 'lodash'
import Search from './Search'
import {ConfirmButton} from './Button'
import fuzzy from 'fuzzy'
import Dashboard from './Dashboard'
import moment from 'moment'
const Content = styled.div``
const AppLayout = styled.div`
padding:40px;
`
export const CenterDiv = styled.div`
  display:grid;
  justify-content:center;
`
const checkFirstVisit=()=>{
  console.log('called')
  let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
  if(!cryptoDashData){
    return {
      firstVisit:true,
      page:'settings'
    }
  }
  let {favorites, currentFavorite} = cryptoDashData;
  return {
    favorites,
    currentFavorite
  }
}
const MAX_FAVORITES = 10
const TIME_UNITS =10
class App extends Component {
  state={
    page:'dashboard',
    favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],
    timeInterval:'months',
  ...checkFirstVisit()
  }
  componentDidMount=()=>{
    this.fetchHistorical()
    this.fetchCoins()
    this.fetchPrice()
  }
  validateFavorites=(coinList)=>{
    let validateFavorites=[]
    this.state.favorites.forEach(favorite=>{
      if(coinList[favorite]){
        validateFavorites.push(favorite)
      }
      return validateFavorites
    })
  }
  fetchPrice=async()=>{
    if(this.state.firstVisit) return
    let prices
    try{
      prices= await this.prices()
    } catch(e){
      this.setState({error:true})
    }
    console.log(prices)
    this.setState({prices})
  }
  fetchHistorical=async()=>{
    if(this.state.firstVisit) return
      let result = await this.historical()
      let historical=[{
        name:this.state.currentFavorite,
        data:result.map((ticker,index)=>[moment().subtract({[this.state.timeInterval]:TIME_UNITS - index}).valueOf(), ticker.USD])
      }]
      this.setState({historical})
      //console.log(historical)
  }
  historical=()=>{
    let promises =[]
    for(let units = TIME_UNITS; units>0; units--){
      promises.push(cc.priceHistorical(this.state.currentFavorite,['USD'], moment().subtract({[this.state.timeInterval]:units}).toDate()))
    }
    return Promise.all(promises)
  }
  prices=async ()=>{
    // let promises=[];
    // this.state.favorites.forEach(sym=>{
    //   promises.push(cc.priceFull(sym,'USD')
    //   )
    // })
    // return Promise.all(promises)
    let returnData =[];
    for(let i=0;i<this.state.favorites.length;i++){
      try{
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD')
        returnData.push(priceData)
      } catch(e){
        console.warn('Fetch price error', e)
      }
    }
    return returnData
  }
  fetchCoins= async ()=>{
    let coinList = (await cc.coinList()).Data
    this.setState({coinList, favorites:this.validateFavorites(coinList)})
  }

  displayingDashboard = () =>this.state.page === 'dashboard'
  displayingSettings = () =>this.state.page === 'settings'
  firstVisitMessage=()=>{
    if(this.state.firstVisit){
      return <div>Welcome to CryptoDash, please select your favorite conis to begin.</div>
    }
  }
  confirmFavorites=()=>{
    let currentFavorite = this.state.favorites[0]
    this.setState({
      firstVisit:false,
      page:'dashboard',
      prices:null,
      currentFavorite,
      historical:null
    },()=>{
      this.fetchPrice()
      this.fetchHistorical()
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites:this.state.favorites,
      currentFavorite
    }));
  }
  settingsContent =()=>{
    return <div>
      {this.firstVisitMessage()}
      <div>
      {CoinList.call(this, true)}
      <CenterDiv>
        <ConfirmButton onClick={this.confirmFavorites}>
        Confirm Favorites
      </ConfirmButton>
      </CenterDiv>
      {Search.call(this)}
      {CoinList.call(this)}
      </div>
    </div>
  }
  loadingContent=()=>{
    if(!this.state.coinList){
      return <div>Loading coin...</div>
    }
    if(!this.state.firstVisit && !this.state.prices){
      return <div>Loading prices...</div>
    }
  }
  addCointToFavorites =(key)=>{
    let favorites = [...this.state.favorites]
    if(favorites.length < MAX_FAVORITES){
      favorites.push(key)
      this.setState({favorites})
    }
  }
  removeCoinFromFavorites=(key)=>{
    let favorites = [...this.state.favorites]
    this.setState({favorites:_.pull(favorites, key)})
  }
  isInFavorites =(key)=> _.includes(this.state.favorites,key)
  handleFilter=_.debounce((inputValue)=>{
    console.log('inputValue', inputValue)
    let coinSymbols = Object.keys(this.state.coinList)
    let coinNames = coinSymbols.map(sym=>this.state.coinList[sym].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames)
    let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {}).map(result =>result.string)
    console.log(this.state.coinList)
    let filteredCoins = _.pickBy(this.state.coinList, (result, symkey)=>{
      console.log('symkey',symkey)
      let coinName = result.CoinName
      return _.includes(fuzzyResults, symkey) || _.includes(fuzzyResults, coinName)
    })
    this.setState({filteredCoins})
    console.log(filteredCoins)
  }, 100)
  filterCoins=(e)=>{
    let inputValue=_.get(e, 'target.value')
    if(!inputValue){
      this.setState({
        filteredCoins:null
      })
      return;
    }
    this.handleFilter(inputValue)
  }
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
      {this.loadingContent() ||<Content>
        {this.displayingSettings() && this.settingsContent()}
        {this.displayingDashboard() && Dashboard.call(this)}
      </Content>}
    </AppLayout>
    );
  }
}

export default App;
