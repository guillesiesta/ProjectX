import React, {Component} from 'react';
import Solucion from '../components/Solucion'

export default class Riddle extends Component {

  constructor(props){
    super(props);
    this.state={
      acertijo:'por defecto',
      pista1:'por defecto',
      pista2:'por defecto',
      pista3:'por defecto',
      estado:'por defecto',
      soluciones: [],
      sol_hidden:true,
      comentario:'',
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

componentDidMount(){
  fetch('http://localhost:5000/todo_por_titulo', { //cargamos acertijo
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.props.titulo), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }})
    .then(response => response.json())
    .then(data => {
      /*console.log(data[0].short_storie) // Prints result from `response.json()` in getRequest
      console.log(data[0].pista1)
      console.log(data[0].pista2)
      console.log(data[0].pista3)
      console.log(data[0].estado)*/
      this.setState({acertijo:data[0].short_storie});
      this.setState({pista1:data[0].pista1});
      this.setState({pista2:data[0].pista2});
      this.setState({pista3:data[0].pista3});
      this.setState({estado:data[0].estado});


    })
    .catch(error => console.error(error))


    fetch('http://localhost:5000/soluciones_por_titulo', { //cargamos las soluciones del acertijo
          method: 'POST', // or 'PUT'
          body: JSON.stringify(this.props.titulo), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }})
      .then(response => response.json())
      .then(data => {
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
}

verComentarios(){
  return(
    <div>
      {this.state.soluciones.map((i,index) => { //pongo index porque me obliga q ue las key sean diferentes
        //console.log("Solucion: "+i.solucion+" .Puntuación: "+i.puntuacion);
        return !this.state.sol_hidden && <Solucion key={index} solucion={i.solucion} puntuacion={i.puntuacion}/>
      })}
    </div>
  );
//  console.log(this.state.soluciones[0].solucion)
}

toggleHidden () {
    this.setState({
      sol_hidden: !this.state.sol_hidden
    })
  }


    handleCommentChange(event) {
        this.setState({comentario: event.target.value});
        //console.log(this.state.comentario);
    }

  handleSubmitComment(event){
    //console.log("Esto es el comentario: "+this.state.comentario);
    var comment = this.state.comentario;
    //console.log("comentario "+comment)
    //console.log(/^\s+$/.test(comment));
    if(this.state.comentario==='' || /^\s+$/.test(comment)){
      alert("El campo solución está vacío");
    }else{
      alert("Solución enviada correctamente");
      fetch('http://localhost:5000/enviar_comentario', { //cargamos acertijo
            method: 'POST', // or 'PUT'
            body: JSON.stringify({comentario:this.state.comentario,titulo:this.props.titulo,usuario:this.props.user}), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }})
        .then(response => response.json())
        .then(data => {
          /*console.log("De vuelta Comentario: "+data.comentario); // Prints result from `response.json()` in getRequest
          console.log("De vuelta Titulo: "+data.titulo);
          console.log("De vuelta Usuario : "+data.usuario);*/
          //console.log(data);
          /*console.log(data[0].pista1)
          console.log(data[0].pista2)
          console.log(data[0].pista3)
          console.log(data[0].estado)*/
       })
        .catch(error => console.error(error))

        this.setState({comentario:''});
      //  window.location.reload()
    }


        event.preventDefault();
  }


  render(){
    return(
      <form onSubmit={this.handleSubmitComment}>
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
            <textarea className="form-control" rows="5" value={this.state.comentario} onChange={this.handleCommentChange}></textarea>
            <p></p>
            <button type="submit" className="btn btn-default">Enviar Solucion</button>
            <p></p>
            <br></br>
            <br></br>
            <br></br>
            <div>
            {this.verComentarios()}
            </div>
            <p><button type="button" className="btn btn-default" onClick={this.toggleHidden.bind(this)}>Ver Soluciones propuestas</button></p>
          </div>
        </div>
      </form>
    );
  }

}
