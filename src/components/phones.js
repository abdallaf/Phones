import React from 'react';
import PhoneItem from './phoneitem';

class Phones extends React.Component{

    render(){
        return this.props.myPhones.map((phone)=>{

            return <PhoneItem key={phone._id} phone={phone}></PhoneItem>
        });
    }
}
export default Phones;