import React, { Component } from 'react';
import './App.css';

import FormLogin from './components/FormLogin';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import AcertijosView from './components/AcertijosView';
import TusAcertijosView from './components/TusAcertijosView';
import ProponerView from './components/ProponerView';
import FormLogout from './components/FormLogout'
//import AxiosParty from './AxiosParty'

class App extends Component {

  constructor (props){
    super(props);
    this.state = { username: '',
                   password:'',
                   content: 1,
                 }; //poner username a '' para empezar con el login
  }

  logUsername = (user) => {
    this.setState({ username:user });
  }

  handleClick = (i) => {
     this.setState({ content:i });
  }

  contentLoad(i){
    if(i===1){ //Acertijos
      return(
        <AcertijosView />
      );
    }

    if(i===2){
      return(
        <ProponerView />
      );
    }

    if(i===3){
      return(
        <TusAcertijosView />
      );
    }

    if(i===4){
      return(
        <Content />
      );
    }

  }
  render() {
    console.log('USUARIO: ' + this.state.username);
    console.log('Content: '+ this.state.content);
    //si el usuario está logeado
    if(this.state.username!==''){
      return(
        <div>
          <Header />
          <SideBar user={this.state.username}
                   onClick={this.handleClick}
          />
          {this.contentLoad(this.state.content)};
          {/*<FormLogout getUsername={this.logUsername}/>*/}
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
