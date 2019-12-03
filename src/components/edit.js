import React from 'react';
import axios from 'axios';

class Edit extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {Title:'',
                      Year:'',
                      Poster:'',
                      _id:''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhoneBrandChange = this.handlePhoneBrandChange.bind(this);
        this.handlePhoneYearChange = this.handlePhoneYearChange.bind(this);
        this.handlePhonePosterChange = this.handlePhonePosterChange.bind(this);
      }
componentDidMount(){
    alert(this.props.match.params.id);

    axios.get('http://localhost:4000/api/phones/'+this.props.match.params.id)
    .then((response)=>{
        this.setState({
            _id:response.data._id,
            Brand:response.data.brand,
            Year:response.data.year,
            Poster:response.data.poster
        })
    })
    .catch();


}
handlePhoneBrandChange(e){
    this.setState({Brand: e.target.value});
  }

  handlePhoneYearChange(e){
    this.setState({Year: e.target.value});
  }

  handlePhonePosterChange(e){
    this.setState({Poster: e.target.value});
  }

  handleSubmit(e){
    alert(this.state.Brand+ "      " + this.state.Year 
    +"       "+ this.state.Poster);
    e.preventDefault();
    
    const newPhone = {
      brand: this.state.Brand,
        year: this.state.Year,
        poster: this.state.Poster
    };
     
    axios.put('http://localhost:4000/api/phones/'+this.state._id, 
    newPhone)
    .then()
    .catch();


    this.setState({Brand:'',
                    Year:'',
                    Poster:''});    
  }


    render(){
        return(
            <div>
                <h1>Hello from Edit component</h1>
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
          <input
          type="submit"
          value="Edit Phone">
          </input>
        </div>
        </form>
            </div>
        )
    }
}

export default Edit;