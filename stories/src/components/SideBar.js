import React, {Component} from 'react';
import FormLogout from './FormLogout'

export default class SideBar extends Component {

  constructor(props){
    super(props);
    this.state={
      vista:'',
    };
  }

  handleClick(i){
    console.log("dentro acertijos layout");
    this.props.onClick(i);
  }
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src="img/avatar6.png" className="img-circle"/>
                        </div>
                        <div className="pull-left info">
                            <p>{this.props.user}</p>
                            <i className="fa fa-circle text-success"></i> Online
                        </div>
                    </div>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">DETECTIVE</li>
                            <button className="btn btn-primary btn-block" onClick={()=> this.handleClick(1)}>
                                <i className="fa fa-files-o"></i>
                                <span>Resolver Acertijo</span>
                            </button>
                        <li>
                          <button className="btn btn-primary btn-block" onClick={()=> this.handleClick(2)}>
                            <i className="fa fa-th"></i>
                            <span>Proponer Acertijo</span>
                        </button>
                        </li>
                        <li>
                          <button className="btn btn-primary btn-block" onClick={()=> this.handleClick(3)}>
                            <i className="fa fa-th"></i>
                            <span>Tus Acertijos</span>
                        </button>
                        </li>

                        <li>
                          <button className="btn btn-primary btn-block" onClick={()=> this.handleClick(4)} >
                            <i className="fa fa-pie-chart"></i>
                            <span>Editar Perfil</span>
                        </button>
                        </li>
                    </ul>
                </section>
            </aside>

        )
    }
}
