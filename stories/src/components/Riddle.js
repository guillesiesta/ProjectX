import React, {Component} from 'react';

export default class Riddle extends Component {

  constructor(props){
    super(props);
    this.setState={
      acertijo:'',
      pista1:'',
      pista2:'',
      pista3:'',
    };
  }

componentDidMount(){
  fetch('http://localhost:5000/todo_por_titulo', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.props.titulo), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }})
    .then(response => response.json())
    .then(data => {
      console.log(data[0].short_storie) // Prints result from `response.json()` in getRequest
      console.log(data[0].pista1)
      console.log(data[0].pista2)
      console.log(data[0].pista3)
      this.setState({acertijo:data[0].short_storie});
      this.setState({pista1:data[0].pista1});
      this.setState({pista2:data[0].pista2});
      this.setState({pista3:data[0].pista3});


    })
    .catch(error => console.error(error))
}

cargaAcertijoEntero(){
  return(
    <p>{this.state.acertijo}</p>
  )
}
  render(){
    return(
      <form>
        <div className="box-header with-border">
          <div className="row">
            <strong>{this.props.titulo}</strong>
            {this.cargaAcertijoEntero()}
            <p> HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
            <button type="submit" className="btn btn-default">Salir</button>
          </div>
        </div>
      </form>
    );
  }

}
