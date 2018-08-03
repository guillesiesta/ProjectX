import React, {Component} from 'react';
import SmallRiddle from "./SmallRiddle"

export default class AcertijosView extends Component {
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
                                  <SmallRiddle/>
                                    <SmallRiddle/>
                                      <SmallRiddle/>
                                        <SmallRiddle/>
                                          <SmallRiddle/>
                                            <SmallRiddle/>
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
