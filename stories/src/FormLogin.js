import React, { Component } from 'react';

class FormLogin extends Component {

  constructor(props) {
      super(props);
      this.state = {username: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.username);
      event.preventDefault();
    }

    render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            User:
             <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }

}

export default FormLogin;
