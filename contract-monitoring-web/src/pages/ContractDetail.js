import React from 'react';
import axios from 'axios';
import '../styles/ContractDetail.css'

class ContractDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            contractDetail : []
        };
    }

    componentDidMount(){
        var compName = this.props.match.params.companyName;
        axios.get("http://localhost:3001/api/getDetail/" + compName).then((response) => {
            //console.log(response);
            this.setState({contractDetail : response.data});
            console.log(this.state.contractDetail)
            console.log(this.state.contractDetail.contractStart)
        });
    }

    deleteContract = () => {
        var name = this.state.contractDetail.companyName;
        var PIC = this.state.contractDetail.PIC;

        axios.post("http://localhost:3001/api/delete", {
            companyName : name,
            PIC : PIC
        }).then(() => {
            alert(name + " " + PIC + " deleted successfully");
            this.props.history.push('/main');
        });
    };

    goToUpdateContract = () => {
        var name = this.state.contractDetail.companyName;
        this.props.history.push('/updateContract/'+name);
    };



    render(){
        return(
            <div className = "contract-detail-page-body max-width">
                <div className = "contract-detail-page-content">
                    <div className = "contract-detail-table">
                        <div className = "contract-detail-table-header">Contract Detail</div>
                        <table id = "contract-detail-table-body">
                            <tbody>
                                <tr>
                                    <th>Company Name</th>
                                    <td>{this.state.contractDetail.companyName}</td>
                                </tr>
                                <tr>
                                    <th>Contract Start Date</th>
                                    <td>{this.state.contractDetail.contractStart}</td>
                                </tr>
                                <tr>
                                    <th>Contract End Date Name</th>
                                    <td>{this.state.contractDetail.contractEnd}</td>
                                </tr>
                                <tr>
                                    <th>Contract File</th>
                                    <td>{this.state.contractDetail.contractFile}</td>
                                </tr>
                                <tr>
                                    <th>Person In Charge</th>
                                    <td>{this.state.contractDetail.PIC}</td>
                                </tr>
                                <tr>
                                    <th>Contract Remaining Days</th>
                                    <td>{this.state.contractDetail.remainingDays}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className = "CDP-action-button-container">
                        <div className = "CDP-action-button update" onClick={this.goToUpdateContract.bind(this)}>Update Contract</div>
                        <div className = "CDP-action-button delete" onClick={this.deleteContract.bind(this)}>Delete Contract</div>
                    </div>
                </div>
                
            </div>
        );
    };


}

export default ContractDetail;