import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';
import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    componentDidUpdate() {
        console.log('[Modal] Updated');
    }
    render() {
        return (
            <Aux>
                <BackDrop clicked={this.props.modalClosed} show={this.props.show}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? 1 : 0}}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;