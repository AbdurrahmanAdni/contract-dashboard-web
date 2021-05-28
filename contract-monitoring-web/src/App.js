import React from "react";
import { Switch, Route } from 'react-router-dom';
import Navbar from "../src/components/Navbar.js"
import Landing from "../src/pages/Landing.js"
import Main from "../src/pages/Main.js"
import Login from "../src/pages/Login.js"
import AddContract from "../src/pages/AddContract.js"
import ContractDetail from "../src/pages/ContractDetail.js"
import UpdateContract from "../src/pages/UpdateContract.js"

import "../src/App.css"

class App extends React.Component{

  render(){
    
    return(
      <div className = "App">
        <Navbar />
        <Switch>
          <Route exact path = "/" component = {Landing}></Route>
          <Route exact path = "/main" component = {Main}></Route>
          <Route exact path = "/login" component = {Login}></Route>
          <Route exact path = "/addcontract" component = {AddContract}></Route>
          <Route exact path = "/contractDetail/:companyName" component = {ContractDetail}></Route>
          <Route exact path = "/updateContract/:companyName" component = {UpdateContract}></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
