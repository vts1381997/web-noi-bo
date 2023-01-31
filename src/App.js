import React, { Component } from 'react';
import cookie from 'react-cookies';

import Login from '@components/Authen/Login';
import Main from  '@components/base/Main'
import '@styles/style.css'


const token = cookie.load('token');


class App extends Component {
  render() {
    // console.log('123')
    if(token){ 
      return (
        <Main/>  
    );
    }
    else{
      return(
        <Login/>
      );
    }
   
  }
}

export default App;