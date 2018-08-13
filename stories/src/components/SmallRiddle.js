import React, {Component} from 'react';

export default class SmallRiddle extends Component {
  constructor(props){
    super(props);
    this.state={
      acertijo:'por defecto',
    };
  }
handleRiddle(t){
  this.props.onSubmit(t);
}

componentDidMount(){
  console.log("datos de atras:"+this.props.value)
  fetch('http://localhost:5000/acertijo_por_titulo', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.props.value), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }})
    .then(response => response.json())
    .then(data => {
      //console.log(data[0].nick) // Prints result from `response.json()` in getRequest
      //console.log(data[0].nick)
      //console.log(data[0].password)
      //console.log(data[0].short_storie)
      this.setState({acertijo:data[0].short_storie})

    })
    .catch(error => console.error(error))

}
cargaAcertijo(){


  return(
    <p>{this.state.acertijo}</p>
  )
}
  render(){
    return(
      <form onSubmit={()=> this.handleRiddle(true)}>
        <div className="box-header with-border">
          <div className="row">
            <strong>{this.props.value}</strong>
            {this.cargaAcertijo()}
            <button type="submit" className="btn btn-default">Acceder</button>
          </div>
        </div>
      </form>
    )
  }
}
