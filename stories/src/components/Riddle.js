import React, {Component} from 'react';

export default class Riddle extends Component {

  constructor(props){
    super(props);
    this.state={
      acertijo:'por defecto',
      pista1:'por defecto',
      pista2:'por defecto',
      pista3:'por defecto',
      estado:'por defecto',
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
      console.log(data[0].estado)
      this.setState({acertijo:data[0].short_storie});
      this.setState({pista1:data[0].pista1});
      this.setState({pista2:data[0].pista2});
      this.setState({pista3:data[0].pista3});
      this.setState({estado:data[0].estado});


    })
    .catch(error => console.error(error))
}

/*cargaAcertijoEntero(){
  return(
    <p>{this.state.acertijo}</p>
    <ul class="list-group">
      <li class="list-group-item">{this.state.pista1}</li>
      <li class="list-group-item">{this.state.pista2}</li>
      <li class="list-group-item">{this.state.pista3}</li>
    </ul>
  )
}*/
  render(){
    return(
      <form>
        <div className="box-header with-border">
          <div className="row">
            <strong>{this.props.titulo}</strong>
            <p></p>
            <p className="text-success"><strong>{this.state.estado}%</strong></p>
            <p>{this.state.acertijo}</p>
            <ul className="list-group">
              <li className="list-group-item">{this.state.pista1}</li>
              <li className="list-group-item">{this.state.pista2}</li>
              <li className="list-group-item">{this.state.pista3}</li>
            </ul>
            <button type="submit" className="btn btn-default">Ver Comentarios</button>
          </div>
        </div>
      </form>
    );
  }

}
