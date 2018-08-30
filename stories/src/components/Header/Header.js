import React, {Component} from 'react';

export default class Header extends Component {
    render(){
        return (
            <header className="main-header">
                <a className="logo">
                    <span className="logo-mini"><b>D</b>P</span>
                    <span className="logo-lg"><b>Detective</b>Panel</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Opciones Detective</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                              
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
