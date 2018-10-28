import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'

const CustomElement = styled.div`
  color:green;
`
class App extends Component {
  render() {
    return (
      <CustomElement>
        hello
      </CustomElement>
    );
  }
}

export default App;
