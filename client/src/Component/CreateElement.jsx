import React, { Component } from "react";

class CreateElement extends Component {
  state = {
    name: this.props.name,
    height: this.props.height,
    width: this.props.width,
    top: this.props.y,
    left: this.props.x,
    zIndex : this.props.zIndex,
    img : this.props.img,
    
    positionHandle : this.props.positionHandle,
    sizeHandle : this.props.sizeHandle
  };
  componentDidMount = ()  => {
    const {sizeHandle, name, positionHandle} = this.state
    this.styleSetter()
    sizeHandle(name)
    positionHandle(name)
  }
  styleSetter = () => {
    const manualSetter = {
      position: "absolute",
      left: 0,
      top : "100px",
      height: "auto",
      width:"9em",
      padding:"1em",
      border: ".5em solid wheat",
      background: "#1E1E1E",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }
    const closeManualSetter = {
      position: "absolute",
      top : "-40px",
      right: "-22px",
      width: "1em",
    }
    const resizers = {
      position: "absolute",
      width: "10px",
      height: "10px",
    };
    const topleft = {
      left: "-5px",
      top: "-5px",
      cursor: "nwse-resize",
    };
    const topright = {
      right: "-5px",
      top: "-5px",
      cursor: "nesw-resize",
    };
    const bottomleft = {
      left: "-5px",
      bottom: "-5px",
      cursor: "nesw-resize",
    };
    const bottomright = {
      right: "-5px",
      bottom: "-5px",
      cursor: "nwse-resize",
    };
    const position = {
      position: "absolute",
      height: "100%",
      width: "100%",
    };
    this.setState({
      resizers,
      topleft,
      topright,
      bottomleft,
      bottomright,
      position,
      manualSetter,
      closeManualSetter
    });
  };

  render() {
    
    const {
      name,
      resizers,
      topleft,
      topright,
      bottomleft,
      bottomright,
      position,
      height,
      width,
      top,
      left,
      Manualsetter,
      closeManualSetter,
      manualSetter,
      img,
      zIndex
    } = this.state;
    const resizable = {
      zIndex : `${zIndex}`,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border : "2px solid white",
      position: "absolute",
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
    };
    return (
      <div
      id={"resizeMe" + name}
      className={"resizable" + name}
      style={resizable}

      >
        {/* {img === undefined ? "" : <img alt={"img" + name} src={img}/>} */}
        <div
          className={"position" + name}
          onDoubleClick={(e) => {
            this.setState({Manualsetter : !this.state.Manualsetter})
          }}
          style={position}
        ></div>
        {/*-----------------------------------------------------------------------------------------*/}
        <div
          className={"resizer" + name + " top-right"}
          style={{ ...resizers, ...topright }}
        ></div>
        <div
          className={"resizer" + name + " bot-right"}
          style={{ ...resizers, ...bottomright }}
        ></div>
        <div
          className={"resizer" + name + " bot-left"}
          style={{ ...resizers, ...bottomleft }}
        ></div>
        <div
          className={"resizer" + name + " top-left"}
          style={{ ...resizers, ...topleft }}
        ></div>
        {/*-----------------------------------------------------------------------------------------*/}
      </div>
    );
  }
}

export default CreateElement;
