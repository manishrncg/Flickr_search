import React, { Component } from 'react';
import { ListGroupItem, ListGroup } from "react-bootstrap";

class List extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    const value = e.target.textContent;
    this.props.handleChange(value, true);
  }

  render() {
    const {itemsArray, listShow, classes, inputValue} = this.props;
    let items = itemsArray instanceof Array && 
                  itemsArray.filter((item, index)=>{
                    return item.toLowerCase().includes(inputValue.toLowerCase());
                  })
                  .map((item, index)=>{
                    return <ListGroupItem key={index}>{ item }</ListGroupItem>;
                  });

    return (
      <ListGroup 
        onClick={e => this.handleClick(e)}
        className={listShow ? classes : 'hide '+classes}>
        { items }
      </ListGroup>
    );
  }
}

export default List;