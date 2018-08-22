import React, {Component} from 'react';

export default class Solucion extends Component {
render(){

      return(
          <div className="box-header with-border">
            <div className="row">

              <li className="list-group-item">Solución: <strong>{this.props.solucion}</strong> y Puntuacion: <strong>{this.props.puntuacion}</strong></li>
            </div>
          </div>
      )
  }
}
