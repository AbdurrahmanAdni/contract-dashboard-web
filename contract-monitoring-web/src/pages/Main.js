import React from 'react';
import "../styles/Main.css";
import { Link } from "react-router-dom";
import axios from 'axios';

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            contractList : []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/get').then((response) => {
            //console.log(response.data);
            this.setState({contractList : response.data});
            console.log(this.state.contractList);
        });
    }

    toContractDetail = (compName) => {
            this.props.history.push('/contractDetail/'+compName);
            //console.log(compName);
    }

    renderTableData = () => {
        return (
            this.state.contractList.map((contract, index) => {
                //const {company_name, contract_start, contract_end, contract_file} = contract //destructuring
                return (
                    <tr key = {index} id = "contract-table-row" onClick={this.toContractDetail.bind(this, contract.companyName)}>
                        <td>{index+1}</td>
                        <td>{contract.companyName}</td>
                        <td>{contract.contractStart}</td>
                        <td>{contract.contractEnd}</td>
                        <td>{contract.contractFile}</td>
                        <td>{contract.PIC}</td>
                        <td>{contract.remainingDays}</td>
                    </tr>
                )
            })
        )
    }

    renderTableHeader = () => {
        let header = ["No", "Company Name", "Contract Start", "Contract End", "Contract File", "PIC", "Remaining Days"]
        return (
            header.map((head, index) => {
                    return (
                        <th key = {index}>{head}</th>
                    )
                }

            )
        )
    }

    /*tes = ()=> {
        let items = [...this.state.contractList];
        let item = {...items[1]};
        console.log(item.companyName);
    }*/

    render(){
        return(
            <div className = "main-page-body max-width">
                <div className = "main-page-content">                
                    <div className = "main-page-intro">Welcome!</div>
                    <div className = "main-page-title">Tabel Daftar Kontrak</div>

                    <div className = "action-button"><Link to = "/addcontract">Add New Contract</Link></div>
                    
                    <div className = "main-page-table">
                        <table id = "contract-table">
                            <tbody>
                                <tr>{this.renderTableHeader()}</tr>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main;
