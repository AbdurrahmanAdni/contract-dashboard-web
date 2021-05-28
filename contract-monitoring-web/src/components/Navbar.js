import React from 'react';
import { Link } from "react-router-dom";

import "../styles/Navbar.css"


import PertaminaLogo from '../images/pertamina-logo.png'

/*<li><Link className = {this.state.scrolled ? "menu-ref scrolled" : "menu-ref"} style = {{display : window.location.pathname === "/" ? "none" : "inline-block"}} to = "/">Home</Link></li>*/

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            scrolled : false
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        console.log("component did mount")
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if(window.scrollY >= 20){
        this.setState({scrolled : true});
        } else {
        this.setState({scrolled : false});
        }
    }

    render(){
        return(
            <div>
                <div className = {this.state.scrolled ? "navbar scrolled" : "navbar"} >
                    <div className = "navbar-wrapper max-width">
                        
                        <div className = "logo"><Link to = "/main"><img src={PertaminaLogo} alt = "pertamina-logo"/></Link></div>
                        
                        <ul className = "menu">
                            <li><Link className = {this.state.scrolled ? "menu-ref scrolled" : "menu-ref"} to = "/">Remind me</Link></li>         
                            <li><Link className = {this.state.scrolled ? "menu-ref scrolled" : "menu-ref"} to = "/login">Login</Link></li>         
                        </ul>

                    </div>
                </div>
            </div>
        )
    }

}

export default Navbar;