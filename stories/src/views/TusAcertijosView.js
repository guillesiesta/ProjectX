import React, {Component} from 'react';
import SmallRiddle from '../components/SmallRiddle'
import PuntuarSolucion from '../components/PuntuarSolucion'

export default class TusAcertijosView extends Component {
  constructor(props){
    super(props);
    this.state = {
      tit_stories: [],
      dentro:false,
      show:'', //almaceno el titulo del acertijo que se mostrará en riddle
    };
  }

  handleClick = (i) =>{
     //this.props.onClick(i);
     this.setState({show:i}); //aqui pongo a mostrar el acertijo seleccionado en SmallRiddle
     //console.log("ENTRAAA desde TusAcertijosView: "+i);
  }

componentDidMount(){
  //console.log(this.props.username)
  fetch('https://projectx-wvueafqhpp.now.sh/user_stories_titulo', { //cargamos acertijo
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.props.username), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }})
    .then(response => response.json())
    .then(data => {
      //console.log(data.length) //para sacar la longitud del JSON
      //console.log(data)
      let auxTit = this.state.tit_stories.slice();
      var i;
      for(i=0; i<data.length;i++){
        auxTit.push(data[i].titulo);
        //console.log(auxTit[i]);
      }
      this.setState({tit_stories:auxTit});
      /*for(i=0; i<this.state.tit_stories.length;i++){
       console.log("Titulos del estado: "+this.state.tit_stories[i]);
     }*/
      //console.log("Longitud:"+ this.state.tit_stories.length);
      })
    .catch(error => console.error(error))
}

chargeSmallRiddle(){
  return (
    <div>
      {this.state.tit_stories.map(i => {
        return <SmallRiddle key={i} onSubmit={this.handleClick} value={i}/>
      })}
    </div>
  )
}
//<SmallRiddle onSubmit={this.handleClick} value={this.state.tit_stories[i]}/>
renderAcertijosView(){
  if(this.state.show===''){
    //console.log("dentro si false: "+this.props.value);
    return(
      <div>
      {this.chargeSmallRiddle()}
      </div>
    );
  }

  if(this.state.show!==''){
    //console.log("dentro si true: "+this.props.value);
    return(
      <div>
        <PuntuarSolucion titulo={this.state.show}/>
      </div>
    );
  }
}
    render(){
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                  <p className="text-center">
                                      <strong>World Riddles</strong>
                                  </p>
                                </div>
                                <div className="box-body">
                                {this.renderAcertijosView()}
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
