import React, { Component } from "react";
import cardType from "./cardType.json";
import "../../css/Element.css";
import CardReader from "./CardReader";
class Element extends Component {
  state = {
    element : []
  };
  componentDidMount = () => {
    this.getCollection()
  };
  getCollection = () =>{
    cardType.forEach((e,i) => {
      this.setState({element : [...this.state.element, <CardReader key={i} cardType={e} />]})
     })
  }
  render() {
    const {element} = this.state
    console.log(element);
    return (
      <div className="element-collection">
        {element}
      </div>
    );
  }
}

export default Element;
