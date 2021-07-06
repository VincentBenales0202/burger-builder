import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentDidUpdate() {}

  render() {
    let classname = classes.Modal;
    this.props.show
      ? (classname += ` ${classes.Show}`)
      : (classname += ` ${classes.Hide}`);
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.removed} />
        <div className={classname}>{this.props.children}</div>
      </Aux>
    );
  }
}

export default Modal;
