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
                            <form class="form-horizontal">
                              <div className="form-group">
                                <label class="control-label col-sm-2" for="nick">Nick</label>
                                <div class="col-sm-10">
                                    <input type="text" value="guillesiesta" class="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label class="control-label col-sm-2" for="nombre">Nombre</label>
                                <div class="col-sm-10">
                                    <input type="text" value="Guillermo" class="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label class="control-label col-sm-2" for="apellidos">Apellidos</label>
                                <div class="col-sm-10">
                                    <input type="text"  value="Muriel" class="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label class="control-label col-sm-2" for="nick">Anterior Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control"/>
                                </div>
                              </div>
                              <div className="form-group">
                                <label class="control-label col-sm-2" for="nick">Nueva Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control"/>
                                </div>
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
