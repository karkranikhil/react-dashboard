import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import NavBar from './NavBar'
import cc from 'cryptocompare'

const Content = styled.div``
const AppLayout = styled.div`
padding:40px;
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
class App extends Component {
  state={
    page:'settings',
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
    localStorage.setItem('cryptoDash', 'test');
    this.setState({
      firstVisit:false,
      page:'dashboard'
    })
  }
  settingsContent =()=>{
    return <div>
      {this.firstVisitMessage()}
      <div onClick={this.confirmFavorites}>
        Confirm Favorites
      </div>
    </div>
  }
  loadingContent=()=>{
    if(!this.state.coinList){
      return <div>Loading coin...</div>
    }
  }
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
