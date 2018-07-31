import React, { Component } from 'react';
import axios from 'axios'


class AxiosParty extends Component{

  constructor () {
  super()
  this.state = {
    username: '',
    title: ''
  }

  this.handleClick = this.handleClick.bind(this)
}
/*
handleClick () {
  axios.get('http://localhost:5000/storie')
 .then(function(response){
   //var storie = response.data.storie;
   console.log(response.data.storie); // ex.: { user: 'Your User'}
   console.log(response.data.title); // ex.: 200
   //this.setState({username: response.data.storie}));
   this.setState({username: response.data.storie});


 });
*/
 handleClick () {
  axios.get('http://localhost:5000/storie')
    .then(response => this.setState({username: response.data.storie, title: response.data.title}))
  }

//}
render () {
    return (
      <div>
        <button className='button' onClick={this.handleClick}>Click Me</button>
        <p>{this.state.title}</p>
        <p>{this.state.username}</p>
      </div>
    );
}
/*
  axios({
    method:'GET',
    url:'/storie',
    responseType:'json'
  })
    .then(function(response) {
    //response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    var data = response['data']

      render() {
        return(
          <label>
            User:
             <input type="text" value=""/>
          </label>
        );
      }
    }
*/
}

export default AxiosParty;
