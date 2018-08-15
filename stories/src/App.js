import React, { Component } from 'react';
import './App.css';

import FormLogin from './components/FormLogin';
import Header from './components/Header';
import SideBar from './components/SideBar';
import EditaPerfilView from './views/EditaPerfilView';
import AcertijosView from './views/AcertijosView';
import TusAcertijosView from './views/TusAcertijosView';
import ProponerView from './views/ProponerView';
//import FormLogout from './components/FormLogout'
//import AxiosParty from './AxiosParty'

class App extends Component {

  constructor (props){
    super(props);
    this.state = { username: 'tonystark',
                   password:'1234',
                   content: 1,
                   //dentro:false,
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
        <EditaPerfilView />
      );
    }

  }
  render() {
    //console.log('USUARIO: ' + this.state.username);
    //console.log('Content: '+ this.state.content);
    //console.log('dentro: '+ this.state.dentro);
    //si el usuario está logeado
    if(this.state.username!==''){
      return(
        <div>
          <Header />
          <SideBar user={this.state.username}
                   onClick={this.handleClick}
          />
          {this.contentLoad(this.state.content)}; {/*Aqui se carga el contenido de la pagina segun lo seleccionado en sidebar*/}
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
