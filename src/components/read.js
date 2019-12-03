import React from 'react'
import Phones from './phones';
import axios from 'axios';


class Read extends React.Component{

    state = {
        phones: []
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/phones')
        .then((response)=>{
            this.setState({phones: response.data.phones})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render(){
        return(
            <div>
                <h1>Mobile Phones</h1>
                <Phones myPhones={this.state.phones}></Phones>
            </div>
        );
    }
}
export default Read;