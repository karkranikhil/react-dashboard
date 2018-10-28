import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'

const Logo = styled.div`
  font-size:1.5em;
`
const ControlButton = styled.div`
`
const AppLayout = styled.div`
  padding:40px;
  display:grid;
  grid-template-columns:180px auto 100px 100px;
`

class App extends Component {
  render() {
    return (
      <AppLayout>
      <Logo>
        CryptoDash
      </Logo>
      <div></div>
      <ControlButton >
        Dashboard
      </ControlButton>
      <ControlButton >
        Setting
      </ControlButton>
    </AppLayout>
    );
  }
}

export default App;
