import React from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import PertaminaLogo from '../images/pertamina-logo.png'
import "../styles/AddContract.css"

import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";

//<input className = "add-contract-input" type = "text" name = "DateStart" placeholder = "YYYY-MM-DD" required/>

class AddContract extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            inputStartDate : "",
            inputEndDate : "",
        }
    }

    //Post request
    handleSubmit = (e) => {
        e.preventDefault();

        var name = e.target.elements.CompanyName.value;
        var dateStart = this.state.inputStartDate;
        var dateEnd = this.state.inputEndDate;
        var file = e.target.elements.ContractFile.value;
        var PIC = e.target.elements.pic.value;
        
        Axios.post("http://localhost:3001/api/insert", {
            companyName : name, 
            contractStart : dateStart, 
            contractEnd : dateEnd, 
            contractFile : file, 
            PIC : PIC
        }).then(() => {
            alert("New contract inserted successfully");
        });
        
    }

    onChangeStartDate = (e) => {
        console.log(this.state.inputStartDate);
        this.setState({inputStartDate : e});
    }

    onChangeEndDate = (e) => {
        this.setState({inputEndDate : e});
    }

    render(){
        return(
            <div className = "add-contract-page-body">

                <div className = "add-contract-card">
                    <div className = "add-contract-card-header">
                        <img id = "pertamina-logo" src = {PertaminaLogo} alt = "pertamina-logo" />
                    </div>

                    <form method = "post" onSubmit = {this.handleSubmit}>
                        <div>
                            <label className = "add-contract-label">Company Name</label>
                            <input className = "add-contract-input" type = "text" name = "CompanyName" placeholder = "Company Name" required/>
                        </div>
                        <div>
                            <label className = "add-contract-label">Date Start</label>
                            <div className = "date-picker-container">
                                <DatePicker 
                                    value={this.state.inputStartDate} 
                                    onChange={this.onChangeStartDate.bind(this)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className = "add-contract-label">Date End</label>
                            <div className = "date-picker-container">
                                <DatePicker 
                                    value={this.state.inputEndDate} 
                                    onChange={this.onChangeEndDate.bind(this)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className = "add-contract-label">Contract File</label>
                            <input className = "add-contract-input" type = "text" name = "ContractFile" placeholder = "Contract File"/>
                        </div>

                        <div>
                            <label className = "add-contract-label">Person In Charge</label>
                            <input className = "add-contract-input" type = "text" name = "pic" placeholder = "PIC"/>
                        </div>
                        <div>
                            <input className = "add-contract-input" id = "submit-button" type = "submit" value = "Submit"/>
                        </div>
                    </form>
                    <div className="go-to-mainpage-button"><Link to="/Main">Back To Main Page</Link></div>
                </div>
            </div>
        )
    }
}

export default AddContract;