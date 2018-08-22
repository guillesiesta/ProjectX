import React, {Component} from 'react';

export default class SolucionConCheck extends Component {

  constructor(props){
    super(props);
    this.state={
      puntuacion:this.props.puntuacion,
      puntuacion_previa:this.props.puntuacion,
    };

        this.handlePuntuacionChange = this.handlePuntuacionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }

handlePuntuacionChange(event){
  this.setState({puntuacion:event.target.value});
  //var puntuacion = event.target.value;
  //console.log("puntuacion value:"+this.state.puntuacion)
}

handleSubmit(event) {
    //console.log('Tu puntuacion seleccionada es: '+ this.state.puntuacion);
    //console.log('Tu solucion seleccionada es: '+ this.props.solucion);

    fetch('http://localhost:5000/cambiar_puntuacion', { //cargamos las soluciones del acertijo
          method: 'POST', // or 'PUT'
          body: JSON.stringify({solucion:this.props.solucion,
                                puntuacion:this.state.puntuacion}), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }})
      .then(response => response.json())
      .then(data => {
        this.setState({puntuacion_previa:this.state.puntuacion});
        //console.log(data);
        //console.log("La storie es: "+data[0].storie)
        //this.setState({storie:data[0].storie});
      })
      .catch(error => console.error(error))

    event.preventDefault();
  }

  render(){
      return(
          <div className="box-header with-border">
            <div className="row">

            <form>
              <li className="list-group-item">Solución: <strong>{this.props.solucion}</strong> y Puntuacion ACTUAL: <strong>{this.state.puntuacion_previa}</strong>
                <select className="form-control" id="sel1" onChange={this.handlePuntuacionChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </li>
              <input type="button" onClick={this.handleSubmit} value="Cambiar puntuacion" />
            </form>
            </div>

          </div>
      )
  }
}
