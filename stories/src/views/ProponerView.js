import React, {Component} from 'react';

export default class ProponerView extends Component {

  constructor(props){
    super(props);
    this.state={
      titulo:'',
      pista1:'',
      pista2:'',
      pista3:'',
      solucion:'',
      acertijo:'',
    };

    this.handleSubmitRiddle = this.handleSubmitRiddle.bind(this); //formulario

    this.handleTituloChange = this.handleTituloChange.bind(this); //Titulo
    this.handleAcertijoChange = this.handleAcertijoChange.bind(this); //acertijo short_storie
    this.handleSolucionChange = this.handleSolucionChange.bind(this); //solucion storie
    this.handlePista1Change = this.handlePista1Change.bind(this); //pista1
    this.handlePista2Change = this.handlePista2Change.bind(this); //pista2
    this.handlePista3Change = this.handlePista3Change.bind(this); //pista3
  }

  handleTituloChange(event) {
      this.setState({titulo: event.target.value});
      //console.log(this.state.comentario);
  }

  handleAcertijoChange(event) {
      this.setState({acertijo: event.target.value});
      //console.log(this.state.comentario);
  }
  handleSolucionChange(event) {
      this.setState({solucion: event.target.value});
      //console.log(this.state.comentario);
  }

  handlePista1Change(event) {
      this.setState({pista1: event.target.value});
      //console.log(this.state.comentario);
  }
  handlePista2Change(event) {
      this.setState({pista2: event.target.value});
      //console.log(this.state.comentario);
  }
  handlePista3Change(event) {
      this.setState({pista3: event.target.value});
      //console.log(this.state.comentario);
  }

  handleSubmitRiddle(event){
    /*console.log("titulo: "+this.state.titulo);
    console.log("acertijo: "+this.state.acertijo);
    console.log("solucion: "+this.state.solucion);
    console.log("pista1: "+this.state.pista1);
    console.log("pista2: "+this.state.pista2);
    console.log("pista3: "+this.state.pista3);*/
    var acertijo = this.state.acertijo;
    var titulo = this.state.titulo;
    var solucion = this.state.solucion;
    var pista1 = this.state.pista1;
    var pista2 = this.state.pista2;
    var pista3 = this.state.pista3;

    if(this.state.acertijo==='' || this.state.titulo==='' || this.state.solucion==='' || this.state.pista1==='' || this.state.pista2==='' || this.state.pista3==='' || /^\s+$/.test(acertijo) || /^\s+$/.test(solucion) || /^\s+$/.test(pista1)|| /^\s+$/.test(pista2)|| /^\s+$/.test(pista3)  ){
      alert("Se deben rellenar todos los campos");
    }else{
    fetch('https://projectx-eagwiugnbd.now.sh/enviar_storie', { //cargamos acertijo
          method: 'POST', // or 'PUT'
          body: JSON.stringify({acertijo:this.state.acertijo,
                                titulo:this.state.titulo,
                                usuario:this.props.username,
                                solucion:this.state.solucion,
                                pista1:this.state.pista1,
                                pista2:this.state.pista2,
                                pista3:this.state.pista3}), // data can be `string` or {object}!
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
    event.preventDefault();
    }
  }

  render(){
    return(
      <div className="content-wrapper">
          <section className="content-header">
              <div className="row">
                  <div className="col-md-12">
                      <div className="box">
                          <div className="box-header with-border">
                            <p className="text-center">
                                <strong>Proponer Acertijo</strong>
                            </p>
                            <form onSubmit={this.handleSubmitRiddle}>
                              <div className="form-group">
                                <label htmlFor="title">Titulo:</label>
                                <input type="text" className="form-control" onChange={this.handleTituloChange}/>
                                <label htmlFor="title">Acertijo:</label>
                                <textarea className="form-control" rows="5" onChange={this.handleAcertijoChange}></textarea>
                                <label htmlFor="title">Solucion:</label>
                                <textarea className="form-control" rows="5" onChange={this.handleSolucionChange}></textarea>
                                <label htmlFor="title">Pistas:</label>
                                <ul className="list-group">
                                  <input type="text" className="form-control" onChange={this.handlePista1Change}/>
                                  <input type="text" className="form-control" onChange={this.handlePista2Change}/>
                                  <input type="text" className="form-control" onChange={this.handlePista3Change}/>
                                </ul>
                              </div>
                               <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                          <div className="box-footer">
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
    )
  }
}
