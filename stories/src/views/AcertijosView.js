import React, {Component} from 'react';
import SmallRiddle from '../components/SmallRiddle'
import Riddle from '../components/SmallRiddle'

export default class AcertijosView extends Component {
  constructor(props){
    super(props);
    this.state = {dentro:false};
  }

  handleClick(){
     this.setState({ dentro:true });
         alert("ENTRAAA: "+this.state.dentro);
  }

renderAcertijosView(){
  if(this.state.dentro===false){
    console.log("dentro: "+this.state.dentro);
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
  }else{
    console.log("dentro: "+this.state.dentro);
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
