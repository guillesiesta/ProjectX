import React, {Component} from 'react';

export default class ProponerView extends Component {
  render(){
    return(
      <div className="content-wrapper">
          <section className="content-header">
              <div className="row">
                  <div className="col-md-12">
                      <div className="box">
                          <div className="box-header with-border">
                            <p className="text-center">
                                <strong>Propose Riddle</strong>
                            </p>
                            <form>
                              <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control"/>
                                <label htmlFor="title">Riddle:</label>
                                <textarea className="form-control" rows="5"></textarea>
                                <label htmlFor="title">Solution:</label>
                                <textarea className="form-control" rows="5"></textarea>
                                <label htmlFor="title">Clues:</label>
                                <ul className="list-group">
                                  <input type="text" className="form-control"/>
                                  <input type="text" className="form-control"/>
                                  <input type="text" className="form-control"/>
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
