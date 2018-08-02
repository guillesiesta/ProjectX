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
  }

  logUsername = (user) => {
    this.setState({ username:user });
  }



  render() {
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
}

export default App;
