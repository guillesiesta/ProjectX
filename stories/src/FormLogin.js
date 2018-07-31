import React, { Component } from 'react';

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
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.username + ' & A password was submitted: ' + this.state.password);
      this.props.getUsername(this.state.username);
      event.preventDefault();
    }

    render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <label>User:</label>
             <input type="text" value={this.state.username} onChange={this.handleNameChange} />

          <label>Password:</label>
             <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />

          <input type="submit" value="Submit" />
        </form>
      );
    }

}

export default FormLogin;
