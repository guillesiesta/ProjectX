import React, {Component} from 'react';
import SmallRiddle from '../components/SmallRiddle'
import Riddle from '../components/Riddle'

export default class AcertijosView extends Component {

  handleClick = (i) =>{
     this.props.onClick(i);
     console.log("ENTRAAA: "+i);
  }

renderAcertijosView(){
  if(this.props.value===false){
    console.log("dentro si false: "+this.props.value);
    return(
      <div>
      <SmallRiddle onSubmit={this.handleClick}/>
      <SmallRiddle />
      <SmallRiddle />
      <SmallRiddle />
      <SmallRiddle />
      <SmallRiddle />
    </div>
    );
  }

  if(this.props.value===true){
    console.log("dentro si true: "+this.props.value);
    return(
      <div>
        <Riddle />
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
