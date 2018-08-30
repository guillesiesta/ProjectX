import React, { Component } from 'react';
//import axios from 'axios'

class FormLogin extends Component {

  constructor(props) {
      super(props);
      this.state = {username: '', password: ''};

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({username: event.target.value});
        var me = sessionStorage.getItem('username');
        console.log("GET local storage: "+ me);
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.username + ' & A password was submitted: ' + this.state.password);
      //this.props.getUsername(this.state.username); //aquí es donde hay que llamar si queremos que nos devuelva el nombre del usuario

      /*axios.get('http://localhost:5000/login',{usern:this.state.username, passw:this.state.password})
        .then(function(response){
          var data = response['data'];
          //console.log("DATA: "+JSON.stringify(data[0].nick));
          console.log("el nick es:"+ response.data[0].nick);
        });*/
        fetch('https://projectx-wvueafqhpp.now.sh/login', {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(this.state.username), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }})
          .then(response => response.json())
          .then(data => {
            //console.log(data[0].nick) // Prints result from `response.json()` in getRequest
            //console.log(data[0].nick)
            //console.log(data[0].password)
            //console.log(data)
            if(this.state.password=== data[0].password){
              this.props.getUsername(this.state.username);
            }
          })
          .catch(error => console.error(error))
/*
        axios.get('http://localhost:5000/login')
          .then(response => console.log("ESTO: " +response.data.storie+"+ ESto:" +response.data.title));
*/
      event.preventDefault();
    }

    render(){
      return(
        <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <form onSubmit={this.handleSubmit}>
                  <img src="img/logo_riddling.png" className="img-rounded" alt="logo"/>
                  <p></p>

                     <input type="text" placeholder="Usuario" value={this.state.username} onChange={this.handleNameChange} />
                  <p></p>

                     <input type="password" placeholder="Contraseña" value={this.state.password} onChange={this.handlePasswordChange} />
                  <p></p>
                  <input className="col-md-5 col-md-offset-1" type="submit" value="Entrar" />
                </form>
              </div>
            </div>
          </div>
      );
    }

}

export default FormLogin;
