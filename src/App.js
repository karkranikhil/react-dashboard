import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import NavBar from './NavBar'
import CoinList from './CoinList'
import cc from 'cryptocompare'
import _ from 'lodash'
import Search from './Search'
import {ConfirmButton} from './Button'

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
  let cryptoDashData = localStorage.getItem('cryptoDash')
  if(!cryptoDashData){
    return {
      firstVisit:true,
      page:'settings'
    }
  }
  return {}
}
const MAX_FAVORITES = 10
class App extends Component {
  state={
    page:'settings',
    favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],
  ...checkFirstVisit()
  }
  componentDidMount=()=>{
    this.fetchCoins()
  }
  fetchCoins= async ()=>{
    let coinList = (await cc.coinList()).Data
    this.setState({coinList})
  }
  displayingDashboard = () =>this.state.page === 'dashboard'
  displayingSettings = () =>this.state.page === 'settings'
  firstVisitMessage=()=>{
    if(this.state.firstVisit){
      return <div>Welcome to CryptoDash, please select your favorite conis to begin.</div>
    }
  }
  confirmFavorites=()=>{
    this.setState({
      firstVisit:false,
      page:'dashboard'
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites:this.state.favorites
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
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
      {this.loadingContent() ||<Content>
        {this.displayingSettings() && this.settingsContent()}
      </Content>}
    </AppLayout>
    );
  }
}

export default App;
