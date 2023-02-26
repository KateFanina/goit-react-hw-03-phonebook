import { Component } from 'react';
import { createPortal } from 'react-dom';
import {
    Backdrop, 
    ModalContent,
    ModalPhoneBook
 } from './Modal.styled'
 
 const modalRoot = document.querySelector('#modal-root');

 export default class extends Component {
  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if(e.code === 'Escape'){
      this.props.onClose();
    }
  };

  handleBackdropClick = event =>{
   if(event.currentTarget === event.target){
     this.props.onClose();
   }
  };

   render() {
     return createPortal(
       <Backdrop onClick={this.handleBackdropClick}>
         <ModalContent>
           <ModalPhoneBook>{this.props.children}</ModalPhoneBook>
         </ModalContent>
       </Backdrop>, 
       modalRoot,
     );
   }
 }