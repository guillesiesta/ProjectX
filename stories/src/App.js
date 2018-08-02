import React, { Component } from 'react';
import './App.css';

import FormLogin from './components/FormLogin';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import FormLogout from './components/FormLogout'
//import AxiosParty from './AxiosParty'

class App extends Component {

  constructor (props){
    super(props);
    this.state = { username: 'guillesiesta',
                   password:'',
                   content: 1,
                 }; //poner username a '' para empezar con el login

    this.renderLogin = this.renderLogin.bind(this);

  }

  logUsername = (user) => {
    this.setState({ username:user });
  }


  renderLogin(){
    console.log('USUARIO: ' + this.state.username );
    //si el usuario está logeado
    if(this.state.username!==''){
      return(
        <div>
          <Header />
          <SideBar user={this.state.username}/>
          <Content />
          {/*}<Content />*/}
          <FormLogout getUsername={this.logUsername}/>
        </div>
      );
    }else{
      //si el usuario no esta logueado
      return(
        <FormLogin getUsername={this.logUsername}/>
      );
    }


  }

  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Riddling</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        {this.renderLogin()}
        {/*}<AxiosParty /> Esto es la prueba que hice para capturar de flask*/}

      </div>
    );
  }
}

export default App;
