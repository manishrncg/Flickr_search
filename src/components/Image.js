import React, { Component } from 'react';
import { Col } from "react-bootstrap";

class Image extends Component {
  render() {
  	const {src, alt, showFull, classes, onClickShow} = this.props;
    return (
      <Col 
      	lg={showFull || 3} 
      	md={showFull || 3} 
      	xs={12} 
      	className="margin-top-10 text-center" 
      	onClick={onClickShow}
      	>
      	<img src={src} alt={alt} className={classes} />
      </Col>
    );
  }
}

export default Image;