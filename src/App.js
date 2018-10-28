import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'

const CustomElement = styled.div`
  color:green;
  font-size:30px;
`
const BlueElement = styled(CustomElement)`
  color:blue;
`
class App extends Component {
  render() {
    return (
      <div>
      <CustomElement>
        hello
      </CustomElement>
      <BlueElement>
      hello
    </BlueElement>
    </div>
    );
  }
}

export default App;
