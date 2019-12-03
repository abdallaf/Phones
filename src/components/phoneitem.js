import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';


class PhoneItem extends React.Component{

  constructor(){
    super();
    this.DeletePhone = this.DeletePhone.bind(this);
  }

  DeletePhone(e){
    console.log("Delete Clicked");
    axios.delete("http://localhost:4000/api/phones/"+this.props.phone._id)
    .then()
    .catch();

  }

    render(){
        return(
            <div>
                {}

  <Card  border="primary" style={{ width: '28rem' }}>
  <Card.Header>{this.props.phone.brand}</Card.Header>
  <Card.Body>
    <blockquote className="blockquote mb-0">
    <img src={this.props.phone.poster}></img>
      <footer>
      {this.props.phone.model}
      </footer>
      <footer>
      {this.props.phone.year}
      </footer>
    </blockquote>
  </Card.Body>
  <Button variant="danger" onClick={this.DeletePhone}>Delete</Button>
<Link to={"/edit/" + this.props.phone._id} className="btn btn-primary">Edit</Link>
</Card>
            </div>
        )
    }
}
export default PhoneItem;