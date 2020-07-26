import React, { Component } from "react";

export default class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      removed: false
    };
  }

  componentDidMount() {

 /*   window.onload = () => {
      this.setState({ loaded: true });
      setTimeout(() => {
        this.setState({ remove: true });
      }, 900);
    }; */
    
  }

  render() {
     
    
  }
}
