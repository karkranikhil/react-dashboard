import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components'

const Logo = styled.div`
  font-size:1.5em;
`
const ControlButton = styled.div`
  cursor: pointer;
  line-height: 30px;
${props=>props.active && css`
  text-shadow: 0px 0px 60px #03ff03;
`}
`
const NavBar = styled.div`
  margin-bottom:40px;
  display:grid;
  grid-template-columns:180px auto 100px 100px;
`
const Content = styled.div``
const AppLayout = styled.div`
padding:40px;
`

class App extends Component {

  state={
    page:'dashboard'
  }
  displayingDashboard = () =>this.state.page === 'dashboard'
  displayingSettings = () =>this.state.page === 'settings'
  render() {
    return (
      <AppLayout>
        <NavBar>
          <Logo>
            CryptoDash
          </Logo>
          <div></div>
          <ControlButton onClick={()=>{this.setState({page:'dashboard'})}} active={this.displayingDashboard()}>
            Dashboard
          </ControlButton>
          <ControlButton onClick={()=>{this.setState({page:'settings'})}} active={this.displayingSettings()}>
            Setting
          </ControlButton>
        </NavBar>
      <Content>
        hello i am {this.state.page}
      </Content>
    </AppLayout>
    );
  }
}

export default App;
