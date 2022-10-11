import React, { Component } from "react";
import "../css/ThreeDCard.css";
class threeDCard extends Component {
  state = {
    back: [180, 0, 180],
    items : [0,0,1]
  };
  componentDidMount = () => {
    this.listenner();
  };

  listenner = () => {
    let { items } = this.state;
    const element = document.getElementById(`items`);
    let original_x;
    let original_y;
    element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      original_x = e.pageX;
      original_y = e.pageY;
      window.addEventListener("mousemove", moove);
      window.addEventListener("mouseup", stopMoove);
    });
    const moove = (e) => {
      let pageX =
        Math.round((((original_x - e.pageX) * 2) / window.innerWidth) * 100) /
        100;
      let pageY =
        Math.round((((original_y - e.pageY) * 2) / window.innerWidth) * 100) /
        100;
      const RotX = -pageX * 180;
      const RotY = pageY * 180;
      items[1] = 1.5*RotX;
      items[0] = 1.5*RotY;
      this.setState({ items });
    };
    const stopMoove = () => {
      window.removeEventListener("mousemove", moove);
    };
  };
  handleZoom = (e) => {
    let { items } = this.state;
    console.log(items);

    if (e.deltaY < 0 && items[2] >= 1 && items[2] < 3) {
      items[2] =  Math.round((items[2] + 0.1) * 10)/10;
      this.setState({ items });
    }
    if(e.deltaY > 0 && items[2] !== 1 && items[2] <= 4){
        items[2] = Math.round((items[2] - 0.1)* 10)/10;
        this.setState({ items });
    }
  };
  render() {
    const { back, items } = this.state;
    const backStyle = {
      transform: `rotateX(${back[0]}deg) rotateY(${back[1]}deg) rotateZ(${back[2]}deg) `,
    };
    const itemsStyle = {
      transform: `rotateX(${items[0]}deg) rotateY(${items[1]}deg) scale(${items[2]})`,
    };
    return (
      <div className="scene">
        <div className="items" id="items" style={items ? itemsStyle : ""}>
          <img
            className="item front"
            alt="test"
            src='https://cdn.discordapp.com/attachments/907283154799321139/911327172633960558/Dos.png'
            style={backStyle}
            onWheelCapture={(e) => {
              this.handleZoom(e);
            }}
          />
          <img
            className="item back"
            alt="test1"
            src="https://cdn.discordapp.com/attachments/907283154799321139/911326634206965770/GolemBetaTest.png"
            onWheelCapture={(e) => {
              this.handleZoom(e);
            }}
          />
        </div>
      </div>
    );
  }
}

export default threeDCard;
