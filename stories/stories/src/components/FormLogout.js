import React, { Component } from 'react';

class FormLogout extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleNameEmpty = this.handleNameEmpty.bind(this);
  }

  handleNameEmpty() {
      //this.setState({username:''});
      console.log("Username de logout "+this.state.username)
      this.setState({username:''});
      this.setState({password:''});
      this.props.getUsername(this.state.username);
  }

  render(){
    return(
      <form >
        <input type="button" value="Logout" onClick={this.handleNameEmpty}/>
      </form>
    );
  }

}

export default FormLogout;
