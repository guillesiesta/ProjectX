import React, { Component } from 'react';
import './App.css';

import FormLogin from './components/FormLogin/FormLogin';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import EditaPerfilView from './views/EditaPerfilView';
import AcertijosView from './views/AcertijosView';
import TusAcertijosView from './views/TusAcertijosView';
import ProponerView from './views/ProponerView';
//import FormLogout from './components/FormLogout'
//import AxiosParty from './AxiosParty'

class App extends Component {

  constructor (props){
    super(props);
    this.state = { username:'',
                   password:'',
                   content: 1,
                   cache:'',
                   //dentro:false,
                 }; //poner username a '' para empezar con el login
  }




  logUsername = (user) => {
    this.setState({ username:user });
    sessionStorage.setItem('username', this.state.username);
    var me = sessionStorage.getItem('username');
    //console.log("GET local storage: "+ me);
    window.location.reload()
  }

  handleClick = (i) => {
     this.setState({ content:i });
  }



  contentLoad(i){
    if(i===1){ //Acertijos
      return(
        <AcertijosView username={sessionStorage.getItem('username')}/>
      );
    }

    if(i===2){
      return(
        <ProponerView username={sessionStorage.getItem('username')}/>
      );
    }

    if(i===3){
      return(
        <TusAcertijosView username={sessionStorage.getItem('username')}/>
      );
    }

    if(i===4){
      return(
        <EditaPerfilView username={sessionStorage.getItem('username')}/>
      );
    }

    if(i===5){
      this.setState({ username:''});
      sessionStorage.clear();
      return(
        <FormLogin getUsername={this.logUsername}/>
      );
    }

  }
  render() {
    //console.log('USUARIO: ' + this.state.username);
    //console.log('Content: '+ this.state.content);
    //si el usuario está logeado
    if(sessionStorage.getItem('username')){
      return(
        <div>
          <Header />
          <SideBar user={sessionStorage.getItem('username')}
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
