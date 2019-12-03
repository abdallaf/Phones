import React from 'react';
import axios from 'axios';
import { newExpression } from '@babel/types';

class Create extends React.Component {
  constructor(props){
    super(props);

    this.state = {Brand:'',
                  Model:'',
                  Year:'',
                Poster:'',
              Base64Image:''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhoneBrandChange = this.handlePhoneBrandChange.bind(this);
    this.handlePhoneModelChange = this.handlePhoneModelChange.bind(this);
    this.handlePhoneYearChange = this.handlePhoneYearChange.bind(this);
    this.handlePhonePosterChange = this.handlePhonePosterChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  
  handlePhoneBrandChange(e){
    this.setState({Brand: e.target.value});
  }
  handlePhoneModelChange(e){
    this.setState({Model: e.target.value});
  }

  handlePhoneYearChange(e){
    this.setState({Year: e.target.value});
  }

  handlePhonePosterChange(e){
    this.setState({Poster: e.target.value});
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  handleImageChange(e){
    alert(e.target.files[0]);
    this.getBase64(e.target.files[0], (base64) =>{
        this.setState({Base64Image:base64});
    })
  }

  handleSubmit(e){
    alert(this.state.Brand+ "      " + this.state.Model+ "      " + 
    this.state.Year 
    +"       "+ this.state.Poster);
    e.preventDefault();
    
    
                const newPhone = {
                  brand: this.state.Brand,
                  model: this.state.Model,
                  year: this.state.Year,
                  poster: this.state.Poster
                };
          axios.post('http://localhost:4000/api/phones',newPhone) 
          .then()
          .catch();
          

          this.setState({Brand:'', 
                  Model:'',
                  Year:'',
                Poster:''});    
  }

  render() {
    return (
      <div>
        <h1>Add Mobile Phone</h1>
        <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Phone Brand</label>
          <input
          type='text'
          className='form-control'
          value={this.state.Brand}
          onChange={this.handlePhoneBrandChange}
          ></input>
        </div>
        <div className='form-group'>
          <label>Phone Model</label>
          <input
          type='text'
          className='form-control'
          value={this.state.Model}
          onChange={this.handlePhoneModelChange}
          ></input>
        </div>
        <div className='form-group'>
          <label>Phone Year</label>
          <input
          type='text'
          className='form-control'
          value={this.state.Year}
          onChange={this.handlePhoneYearChange}
          ></input>
        </div>
        <div className='form-group'>
          <label>Phone Poster Url</label>
          <textarea
          row='3'
          className='form-control'
          value={this.state.Poster}
          onChange={this.handlePhonePosterChange}
          ></textarea>
        </div>
        <div>
          <label>Image Upload</label>
          <input
          type='file'
          className='form-control'
          onChange={this.handleImageChange}
          ></input>

        </div>
        <div>
          <input
          type="submit"
          value="Add Phone">
          </input>
        </div>
        </form>
        <img src={this.state.Base64Image}></img>
      </div>
    );
  }
}

export default Create;