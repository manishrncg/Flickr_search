import React, { Component } from 'react';
import callFlickrImagesApi from './utils/callFlickrImagesApi';
import { Grid, Row, Col } from "react-bootstrap";
import ModalCustom from "./components/ModalCustom";
import List from "./components/List";
import {DebounceInput} from 'react-debounce-input';
import dribbble from "./dribbble.gif";
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.images = [];
    this.loader = false;
    this.prevValues = localStorage.getItem('inputValues')  === null
                      ? ''
                      : localStorage.getItem('inputValues').split(',');
    this.state = {
      inputValue  : '',
      inputUpdated: false,
      page        : 2,
      listShow    : false
    };
    this.trackScrolling = this.trackScrolling.bind(this);
    this.searchImagesFromFlickr = this.searchImagesFromFlickr.bind(this);
    this.searchImages = this.searchImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isBottom = this.isBottom.bind(this);
    this.trackScrolling = this.trackScrolling.bind(this);
    this.addInputToLocalstorage = this.addInputToLocalstorage.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  componentDidMount(){
    this.searchImagesFromFlickr(this.state.inputValue);
    document.addEventListener('scroll', this.trackScrolling);
    document.addEventListener('click', this.hideList);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
    document.removeEventListener('click', this.hideList);
  }

  trackScrolling(){
    const wrappedElement = document.getElementById('root');
    const page = this.state.page;
    this.hideList();
    if (this.isBottom(wrappedElement)) {
      this.searchImagesFromFlickr(this.state.inputValue, this.state.page);
      this.setState({
        page: (page+1)
      });
    }
  };

  addInputToLocalstorage(inputValue){
    if(this.prevValues.includes(inputValue) || inputValue.length<=1){
      return false;
    }
    this.prevValues = [...this.prevValues, inputValue];
    localStorage.setItem('inputValues', this.prevValues)  
  }

  searchImagesFromFlickr = (inputValue, page) => {
    const self = this;
      this.setState({ inputValue });
    if(page){
      this.loader = true;
    }
    inputValue = inputValue.trim();
    if(!inputValue){
      return false;
    }else{
      this.addInputToLocalstorage(inputValue) 
    }
    callFlickrImagesApi(inputValue, page)
    .then((response) => {
      if(response.data.stat === 'fail'){
        if(page){
          self.images.push(<Col lg={12} md={12} xs={12} key="1" className="margin-top-1 text-center">
              <p>No result found</p>
            </Col>);
          }
          else{
            self.images = <Col lg={12} md={12} xs={12} key="1" className="margin-top-1 text-center">
              <p>No result found</p>
            </Col>;
          }
      }else{
        if(page){
          let newImages = response.data.photos.photo.map((image, index)=>{
            let imagePath = `https://farm`+image.farm+`.staticflickr.com/`+image.server+`/`+image.id+`_`+image.secret+`.jpg`;
            return <ModalCustom src={imagePath} key={image.id} alt={image.title} hideImageOutOfModal="" />
          });
          self.images = self.images.concat(newImages);
        }else{
          self.images = response.data.photos.photo.map((image, index)=>{
            let imagePath = `https://farm`+image.farm+`.staticflickr.com/`+image.server+`/`+image.id+`_`+image.secret+`.jpg`;
            return <ModalCustom src={imagePath} key={image.id} alt={image.title} hideImageOutOfModal="" />
          });
        }
      }
      self.loader = false;
      self.setState({ inputUpdated: true });
    })
    .catch((error) => {
      self.loader = false;
      console.log(error);
    });
  }

  searchImages(e, valueFromList){
    let inputValue = '';
    if(valueFromList){
      inputValue = e;
    }
    else{
      inputValue = e.target.value;
    }
    this.searchImagesFromFlickr(inputValue);
  }

  handleChange(e, valueFromList){
      this.searchImages(e, valueFromList);
      if(!valueFromList){
        this.setState({
          page    : 2,
          listShow: true
        });
      }
      else{
        this.setState({listShow: false});
      }
  }

  hideList(){
    this.setState({listShow: false});
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row className="black-bg text-center text-white padding-btm-20 search-bar">
          <Col sm={12} xs={12} md={4} lg={4} mdOffset={4} lgOffset={4} className="pos-relative padding-0">
            <h3>Search Photos</h3>
             <DebounceInput
              name="search_images" 
              className="search-field"
              minLength={1}
              debounceTimeout={150}
              placeholder="Search here"
              value={this.state.inputValue}
              onChange={this.handleChange.bind(this)} />
            <List 
              itemsArray={this.prevValues} 
              listShow={this.state.listShow} 
              inputValue={this.state.inputValue} 
              handleChange={this.handleChange}
              classes="pos-absolute width-100per"
            />
          </Col>
        </Row>
          { this.images }
          <ModalCustom 
            src={dribbble} 
            alt="loader" 
            loader={this.loader} 
            hideImageOutOfModal="hide" 
            backdrop={false} 
          />
      </Grid>
    );
  }
}

export default App;
