import React from "react";

import "../styles/Login.css"


import PertaminaLogo from '../images/pertamina-logo.png'

class Login extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();

        var id = e.target.elements.CompanyId.value;
        var ip = e.target.elements.IpAddress.value;
        var port = e.target.elements.PortNumber.value;

        if(id === "12345" && ip === "123.456.78" && port === "3369"){
            //alert("Login Berhasil");
            this.props.history.push('/main');
        } else {
            alert("Failed");
        }
    }
    
    render(){
        return(
            <div className = "login-page-body">

                <div className = "login-card">
                    <div className = "login-card-header">
                        <img id = "pertamina-logo" src = {PertaminaLogo} alt = "pertamina-logo" />
                    </div>

                    <form method = "post" onSubmit = {this.handleSubmit}>
                        <div>
                            <input className = "login-input" type = "text" name = "CompanyId" placeholder = "Company ID" required/>
                        </div>
                        <div>
                            <input className = "login-input" type = "text" name = "IpAddress" placeholder = "IP Address" required/>
                        </div>
                        <div>
                            <input className = "login-input" type = "text" name = "PortNumber" placeholder = "Port Number" required/>
                        </div>
                        <div>
                            <input className = "login-input" id = "submit-button" type = "submit" value = "Login"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;