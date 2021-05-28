import React from "react";
import {Link} from "react-router-dom";
import "../styles/Landing.css";


class Landing extends React.Component{

  goToMainPage = () => {
      console.log("Go To Main page clicked")
  }
  
  render(){
    
    return(
      <div className = "landing-container">
  
        <div className = "landing max-width">
          <div className = "landing-content">
            <div className = "text-1">PERTAMINA</div>
            <div className = "text-2">Contract Monitoring Web</div>
            
            <div className = "button-section">
              <div className = "login button"><Link to = "/login">Login</Link></div>
              <div className = "get-started button" onClick={this.goToMainPage.bind()}><Link to = "/main">To Main Page</Link></div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Landing;