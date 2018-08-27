import React, {Component} from 'react';
import SolucionConCheck from '../components/SolucionConCheck'

export default class PuntuarSolucion extends Component {

  constructor(props){
    super(props);
    this.state={
      soluciones:[],
      storie:''
    };
  }

  componentDidMount(){
    //console.log("COSAS AQUI,titulo a buscar: "+this.props.titulo)
    fetch('https://projectx-eagwiugnbd.now.sh/soluciones_por_titulo', { //cargamos las soluciones del acertijo
          method: 'POST', // or 'PUT'
          body: JSON.stringify(this.props.titulo), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }})
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        var array = [];
        var i;
        for(i=0; i<data.length;i++){
            let aux = {'puntuacion':data[i].puntuacion, 'solucion':data[i].solucion};
            array.push(aux);
            //console.log(data[i].puntuacion);
            //console.log(data[i].solucion);
          }
        this.setState({soluciones:array});
        //console.log("array length: "+array.length);
        /*var j;
        for(j=0; j<array.length;j++){
          console.log("Solución: "+array[j].solucion+" Puntuación: "+array[j].puntuacion);
        }*/
      })
      .catch(error => console.error(error))

      fetch('http://localhost:5000/storie_por_titulo', { //cargamos las soluciones del acertijo
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.props.titulo), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }})
        .then(response => response.json())
        .then(data => {
          //console.log("La storie es: "+data[0].storie)
          this.setState({storie:data[0].storie});
          //this.setState({storie:});
          //console.log("array length: "+array.length);
          /*var j;
          for(j=0; j<array.length;j++){
            console.log("Solución: "+array[j].solucion+" Puntuación: "+array[j].puntuacion);
          }*/
        })
        .catch(error => console.error(error))

  }

  verComentarios(){
    return(
      <div>
        {this.state.soluciones.map((i,index) => { //pongo index porque me obliga q ue las key sean diferentes
          //console.log("Solucion: "+i.solucion+" .Puntuación: "+i.puntuacion);
          return !this.state.sol_hidden && <SolucionConCheck key={index} solucion={i.solucion} puntuacion={i.puntuacion}/>
        })}
      </div>
    );
  //  console.log(this.state.soluciones[0].solucion)
  }
render(){

      return(
          <div className="box-header with-border">
            <div className="row">
              <strong>{this.props.titulo}</strong>
              <p>Solución propuesta por mi: <strong>{this.state.storie}</strong></p>
              <p>Soluciones propuestas por otros usuarios:</p>
              {this.verComentarios()}
            </div>
          </div>
      )
  }
}
