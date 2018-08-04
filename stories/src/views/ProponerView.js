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
                                <label for="title">Title:</label>
                                <input type="text" className="form-control"/>
                                <label for="title">Riddle:</label>
                                <textarea class="form-control" rows="5"></textarea>
                                <label for="title">Solution:</label>
                                <textarea class="form-control" rows="5"></textarea>
                                <label for="title">Clues:</label>
                                <ul class="list-group">
                                  <input type="text" className="form-control"/>
                                  <input type="text" className="form-control"/>
                                  <input type="text" className="form-control"/>
                                </ul>
                              </div>
                               <button type="submit" class="btn btn-primary">Submit</button>
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
