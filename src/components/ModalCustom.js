import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import Image from "./Image";

class ModalCustom extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    }; 
  }

  componentWillReceiveProps(nextProps){
    nextProps.loader ? this.handleShow() : this.handleClose();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const {src, alt, hideImageOutOfModal} = this.props;
    return (
      <div>
        <Image 
          src={src} 
          alt={alt} 
          classes={"image-comp cursorPointer "+hideImageOutOfModal} 
          onClickShow={this.handleShow} 
        />

        <Modal 
          show={this.state.show} 
          onHide={this.handleClose} 
          className={hideImageOutOfModal?'modal-loader':''} 
          backdrop={this.props.backdrop}
          >
          <Modal.Header closeButton className={hideImageOutOfModal}>
            <Modal.Title className="text-center">{alt}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image 
              src={src} 
              alt={alt} 
              onClickShow={this.handleShow} 
              classes="image-comp" 
              showFull={12} 
            />
          </Modal.Body>
          <Modal.Footer className={hideImageOutOfModal}>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalCustom;