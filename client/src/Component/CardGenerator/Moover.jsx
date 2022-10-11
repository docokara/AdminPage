/************************************************************************************************/
/*    _____               _                  _______         _  _         _          __         */
/*   / ____|             | |                |__   __|       (_)| |       | |        / _|        */
/*  | |  __   __ _   ___ | |__    __ _  ______ | |__      __ _ | |_  ___ | |__     | |_  _ __   */
/*  | | |_ | / _` | / __|| '_ \  / _` ||______|| |\ \ /\ / /| || __|/ __|| '_ \    |  _|| '__|  */
/*  | |__| || (_| || (__ | | | || (_| |        | | \ V  V / | || |_| (__ | | | | _ | |  | |     */
/*   \_____| \__,_| \___||_| |_| \__,_|        |_|  \_/\_/  |_| \__|\___||_| |_|(_)|_|  |_|     */
/*                                                                                              */
/*              By Docomiot                                              12/11/2021             */
/*       ~/client/src/components/InstanceView/AdminPage/CardGenerator/LayerElement.jsx          */
/************************************************************************************************/

import React, { Component } from "react";

class LayerElement extends Component {
  state = {
    name: this.props.name,
    asConstraint: true,
    height: 50,
    width: 50,
    top: 0,
    left: 0,
    zIndex: this.props.name,
    visibility : 'visible'
  };

  componentDidMount = () => {
    const { sizeHandle, name, positionHandle, asConstraint } = this.state;
    if (asConstraint) {
      const element = document.getElementById(`resizeMe${name}`).parentElement
        .className;
      const parent = document.getElementsByClassName(element);
      this.setState({
        ParentWidth: parent[0].offsetWidth,
        ParentHeight: parent[0].offsetHeight,
        ParentX: parent[0].offsetLeft,
        ParentY: parent[0].offsetTop,
      });
    }

    this.sizeHandle(name)
    this.styleSetter();
    this.positionHandle(name);
  };
  getTop = () =>{
    return this.state.top
  }
  getLeft = () =>{
    return this.state.left
  }
  getWidth = () =>{
    return this.state.width
  }
  getHeight = () =>{
    return this.state.height
  }
  positionHandle = (name) => {
    let Final_Y;
    let Final_X;
    const element = document.getElementById(`resizeMe${name}`);

    // The current position of mouse
    let x = 0;
    let y = 0;

    // The position of the element
    let top = 0;
    let left = 0;

    const mouseDownHandlerPos = (e) => {
      // Get the current mouse position
      x = e.clientX;
      y = e.clientY;

      // Calculate the position of element
      const style = window.getComputedStyle(element);
      top = parseInt(style.top, 10);
      left = parseInt(style.left, 10);

      // Attach the listeners to `document`
      document.addEventListener("mousemove", mouseMoveHandlerPos);
      document.addEventListener("mouseup", mouseUpHandlerPos);
    };

    const mouseMoveHandlerPos = function (e) {
      const { ParentHeight, ParentWidth, width, height, asConstraint } =
        this.state;

      const dx = e.clientX - x;
      const dy = e.clientY - y;
      Final_Y = top + dy;
      Final_X = left + dx;
      if (asConstraint) {
        if (Final_X < 0) Final_X = 0;
        if (Final_Y < 0) Final_Y = 0;
        if (Final_X > ParentWidth - width) Final_X = ParentWidth - width;
        if (Final_Y > ParentHeight - height) Final_Y = ParentHeight - height;
      }

      this.setState({ left: Final_X, top: Final_Y });
    }.bind(this);
    const mouseUpHandlerPos = function () {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", mouseMoveHandlerPos);
      document.removeEventListener("mouseup", mouseUpHandlerPos);
    };
    const resizers = element.querySelectorAll(`.position${name}`);
    [].forEach.call(resizers, function (resizer) {
      resizer.addEventListener("mousedown", mouseDownHandlerPos);
    });
  };
  sizeHandle = (name) => {


    const resizers = document.querySelectorAll(`.resizer${name}`);
    const minimum_size = 50
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    resizers.forEach((currentResizer) => {
      //
      currentResizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const {width,height,left,top} = this.state
        original_width = width;
        original_height = height;
        original_x = left;
        original_y = top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      });
      const resize = e => {
        let final_top = this.state.top
        let final_left = this.state.left
        let final_width
        let final_height
        const {ParentHeight,ParentWidth} = this.state
        if (currentResizer.classList.contains('bot-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height + (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            final_width = width
          }
          if (height > minimum_size) {
            final_height = height
          }
          if (width > ParentWidth) {
            final_width = ParentWidth
          }
          if (height > ParentHeight) {
            final_height = ParentHeight
          }
        } else if (currentResizer.classList.contains('bot-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > minimum_size) {
            final_height = height
          }
          if (width > minimum_size) {
            final_width = width
            final_left = original_x + (e.pageX - original_mouse_x)
          }
          if (width > ParentWidth) {
            final_width = ParentWidth
          }
          if (height > ParentHeight) {
            final_height = ParentHeight
          }
        } else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            final_width = width
          }
          if (height > minimum_size) {
            final_height = height
            final_top = original_y + (e.pageY - original_mouse_y)
          }
          if (width > ParentWidth) {
            final_width = ParentWidth
          }
          if (height > ParentHeight) {
            final_height = ParentHeight
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            final_width = width
            final_left = original_x + (e.pageX - original_mouse_x)
          }
          if (height > minimum_size) {
            final_height = height
            final_top = original_y + (e.pageY - original_mouse_y)
          }
          if (width > ParentWidth) {
            final_width = ParentWidth
          }
          if (height > ParentHeight) {
            final_height = ParentHeight
          }
        }
      
        if (final_left < 0) final_left = 0
        if (final_top < 0) final_top = 0
        if (final_left > ParentWidth - final_width)
          final_left = ParentWidth - final_width
        if (final_top > ParentHeight - final_height)
          final_top = ParentHeight - final_height

        this.setState({ width : final_width, height : final_height, left : final_left, top : final_top })
      }
      function stopResize() {
        window.removeEventListener("mousemove", resize);
      }
    });
  };
  styleSetter = () => {
    const manualSetter = {
      position: "absolute",
      left: 0,
      top: "100px",
      height: "auto",
      width: "9em",
      padding: "1em",
      border: ".5em solid wheat",
      background: "#1E1E1E",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    };
    const closeManualSetter = {
      position: "absolute",
      top: "-40px",
      right: "-22px",
      width: "1em",
    };
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
      closeManualSetter,
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
      zIndex,
      visibility
    } = this.state;
    const resizable = {
      zIndex: `${zIndex}`,
      cursor: "pointer",
      visibility : `${visibility}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid white",
      position: "absolute",
      height: `${height}px`,
      width: `${width}px`,
      top: `${top}px`,
      left: `${left}px`,
    };
    console.log(visibility);
    return (
      <div
        id={"resizeMe" + name}
        className={"resizable" + name}
        style={resizable}
      >
        {/* {img === undefined ? "" : <img alt={"img" + name} src={img}/>} */}
        <div className={"position" + name} style={position}></div>
        {!img ? (
          ""
        ) : (
          <img alt={name} src={img} style={{ height: "100%", width: "100%" }}></img>
        )}
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
        {!Manualsetter ? (
          ""
        ) : (
          <div className="manualSetter" style={manualSetter}>
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              name="height"
              min="100"
              max="1000"
              value={height}
              onChange={(event) => {}}
            />
            <label htmlFor="top">Top</label>
            <input
              type="number"
              id="top"
              name="top"
              min="0"
              max="500"
              value={top}
              onChange={(event) => {}}
            />
            <label htmlFor="left">Left</label>
            <input
              type="number"
              id="left"
              name="left"
              min="0"
              max="500"
              value={left}
              onChange={(event) => {}}
            />
            <img
              alt="close"
              src="https://img.icons8.com/doodle/50/000000/close-sign--v1.png"
              className="close-manualSetter"
              style={closeManualSetter}
              onClick={() => {
                this.setState({ Manualsetter: false });
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default LayerElement;
