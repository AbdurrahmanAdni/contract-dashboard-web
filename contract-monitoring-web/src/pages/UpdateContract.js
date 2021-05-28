import React from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import PertaminaLogo from '../images/pertamina-logo.png'
import "../styles/AddContract.css"

import 'react-date-picker/dist/DatePicker.css';
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";


class UpdateContract extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            oldContractDetail : [],
            compName : "",
            contractStartDate : "",
            contractEndDate : "",
            contractFile : "",
            contractPIC : "",
            isChanged : false
        };
    }

    componentDidMount(){
        var compName = this.props.match.params.companyName;
        //var contractDetail = [];
        Axios.get("http://localhost:3001/api/getDetail/" + compName).then((response) => {
            //console.log(response);
            this.setState({oldContractDetail : response.data});
            this.setState({compName : this.state.oldContractDetail.companyName});
            //this.setState({contractStartDate : this.state.oldContractDetail.contractStart});
            //this.setState({contractEndDate : this.state.oldContractDetail.contractEnd});
            this.setState({contractFile : this.state.oldContractDetail.contractFile});
            this.setState({contractPIC : this.state.oldContractDetail.PIC});
            /*console.log(contractDetail);
            console.log(this.state.companyName);
            console.log(this.state.contractDetail.contractStart)*/
            
        });
    }

    //Post request
    handleSubmit = (e) => {
        e.preventDefault();

        var newCompanyName = e.target.elements.CompanyName.value;
        var newContractStartDate = e.target.elements.DateStart.value;
        var newContractEndDate = e.target.elements.DateEnd.value;
        var newContractFile = e.target.elements.ContractFile.value;
        var newPIC = e.target.elements.pic.value;
        
        Axios.post("http://localhost:3001/api/insert", {
            companyName : newCompanyName, 
            contractStart : newContractStartDate, 
            contractEnd : newContractEndDate, 
            contractFile : newContractFile, 
            PIC : newPIC
        }).then(() => {
            alert("Contract updated successfully");
        });
        
    }

    handleChange = (e) => {
        if(e.target.name === "CompanyName"){
            this.setState({compName : e.target.value});
            /*if (this.state.compName !== this.state.oldContractDetail.companyName){
                this.setState({isChanged : true});
            } else {
                this.setState({isChanged : false});
            }*/
        } else if(e.target.name === "ContractFile") {
            this.setState({contractFile : e.target.value});
        } else if(e.target.name === "pic") {
            this.setState({contractPIC : e.target.value});
        }

        this.setState({isChanged : true});
    }

    changeStartDate = (e) => {
        this.setState({contractStartDate : e});
        this.setState({isChanged : true});
    }

    changeEndDate = (e) => {
        this.setState({contractEndDate : e});
        this.setState({isChanged : true});
    }

    render(){
        console.log("oldContractDetail.CompanyName : " + this.state.oldContractDetail.companyName);
        console.log("compName : " + this.state.compName);
        console.log("isChanged : " + this.state.isChanged);
        console.log("Start Date : " + this.state.contractStartDate)
        console.log("End Date : " + this.state.contractEndDate)
        return(
            <div className = "add-contract-page-body">

                <div className = "add-contract-card">
                    <div className = "add-contract-card-header">
                        <img id = "pertamina-logo" src = {PertaminaLogo} alt = "pertamina-logo" />
                    </div>

                    <form method = "post" onSubmit = {this.handleSubmit}>
                        <div>
                            <label className = "add-contract-label">Company Name</label>
                            <input className = "add-contract-input" type = "text" name = "CompanyName" placeholder = "Company Name" value = {this.state.compName} onChange = {this.handleChange} required/>
                        </div>
                        <div>
                            <label className = "add-contract-label">Date Start</label>
                            <div className = "date-picker-container">
                                <DatePicker
                                    value={this.state.contractStartDate} 
                                    onChange={this.changeStartDate.bind(this)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className = "add-contract-label">Date End</label>
                            <div className = "date-picker-container">
                                <DatePicker
                                    value={this.state.contractEndDate} 
                                    onChange={this.changeEndDate.bind(this)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className = "add-contract-label">Contract File</label>
                            <input className = "add-contract-input" type = "text" name = "ContractFile" placeholder = "Contract File" value = {this.state.contractFile} onChange = {this.handleChange}/>
                        </div>

                        <div>
                            <label className = "add-contract-label">Person In Charge</label>
                            <input className = "add-contract-input" type = "text" name = "pic" value = {this.state.contractPIC} placeholder = "PIC" onChange = {this.handleChange}/>
                        </div>
                        <div>
                            <input className = "add-contract-input" id = "submit-button" style = {{display : this.state.isChanged ? "inline-block" : "none"}} type = "submit" value = "Submit"/>
                        </div>
                    </form>
                    <div className="cancel-button"><Link to="/Main">Cancel Update</Link></div>
                </div>
            </div>
        )
    }
}

export default UpdateContract;