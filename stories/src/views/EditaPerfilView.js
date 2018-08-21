import React, {Component} from 'react';

export default class EditaPerfilView extends Component {
  render(){
    return(
      <div className="content-wrapper">
          <section className="content-header">
              <div className="row">
                  <div className="col-md-12">
                      <div className="box">
                          <div className="box-header with-border">
                            <p className="text-center">
                                <strong>Editar Perfil</strong>
                            </p>
                            <form className="form-horizontal">
                              <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="nick">Nick</label>
                                <div className="col-sm-10">
                                    <input type="text" defaultValue={this.props.username} className="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="nombre">Nombre</label>
                                <div className="col-sm-10">
                                    <input type="text" defaultValue="POR DEFECTO" className="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="apellidos">Apellidos</label>
                                <div className="col-sm-10">
                                    <input type="text"  defaultValue="POR DEFECTO" className="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="nick">Anterior Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="nick">Nueva Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control"/>
                                </div>
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
