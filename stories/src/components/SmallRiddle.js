import React, {Component} from 'react';

export default class SmallRiddle extends Component {

handleRiddle(t){
  this.props.onSubmit(t);
}
  render(){
    return(
      <form onSubmit={()=> this.handleRiddle(true)}>
        <div className="box-header with-border">
          <div className="row">
            <strong>Storie 1 SmallRiddle</strong>
            <p>LoremLorem Ipsum es simplemente el texto de relleno de
              las imprentas y archivos de texto. Lorem Ipsum ha sido el
              texto de relleno estándar de las industrias desde el año 1500,
            </p>
            <button type="submit" className="btn btn-default">Acceder</button>
          </div>
        </div>
      </form>
    )
  }
}
