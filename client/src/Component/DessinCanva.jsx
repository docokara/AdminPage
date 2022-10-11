import React, { Component } from "react";
import "../css/cardGenerator.css";
import axios from "axios";
import { UtilsButton, PopupMessage } from "./Utils";

class DessinCanva extends Component {
  state = {
    backgroundLink: undefined,
    addItem: false,
    background: false,
    layers: [],
  };
  addLayer = async (e) => {
    let response = false;
    if (e.target.classList[1] === "setBackground") {
      const { backgroundLink } = this.state;
      if (backgroundLink !== "")
        await axios
          .get(this.state.backgroundLink, {
            headers: {
              Authorization: "image/*"
            },
          })
          .then((res) => {
            if (res.status === 200) {
              response = true;
            }
          })
          .catch((error) => {
            console.log("error");
          });
    }
    return response;
  };
  calculDimensions = (e) => {
    console.log(e.path[0].height);
    let height 
    let width 
    if(e.path[0].height < 400) height = e.path[0].height * 2
    else height = e.path[0].height
    width = height * 0.5
    return { width, height };
  };

  setBackground = () => {
    const UpperThis = this
    const { layers, backgroundLink } = this.state;
    this.setState({
      background: true,
      addItem: false,
      width : 0,
      height : 0
    });
    /************************************** Add layer *****************************************************/
    const layer = document.createElement("div");
    layer.className = `layerItem${layers.length}`;
    layer.innerHTML = `layer${layers}`;
 
    layer.addEventListener("dblclick", function(e){this.LayerParams(e)}.bind(this))
    const layersList = document.getElementById("layersItems");
    layersList.appendChild(layer);
    /************************************** Add background to canva ***************************************/
    const name = `image${layers.length}`
    const canvas = document.getElementById("canva");
    var ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = backgroundLink;
    img.id = name;

    img.onload = function (img) {
      const dimensions = UpperThis.calculDimensions(img);
      const { width, height } = dimensions;
      UpperThis.setState({width,height, layers : [...layers, name]})
      ctx.drawImage(this, 0, 0, width, height ); // ajouter l'img dans le canva
      console.log(this);
    }
  };

  handleClick = async (e) => {
    switch (e.target.classList[1]) {
      case "addItem":
        this.setState({ addItem: !this.state.addItem });
        break;
      case "addBackground":
        this.setState({ backgroundLink: "" });
        break;
      case "addLayer":
        console.log(e);
        break;
      case "setBackground":
        const isGoodLayer = await this.addLayer(e);
        if (isGoodLayer) this.setBackground(e);
        break;
      default:
        break;
    }
  };
  getImg = (e) => {
    const url = this.state[e.target.id];
    axios({
      method: "GET",
      url: url,
      responseType: "stream",
    }).then((res) => {
      console.log(res);

      this.setState({ EmptyCard: this.state.EmptyCardLink });
    });
  };
  LayerParams = (e) =>{
    const canvas = document.getElementById("canva")
    var ctx = canvas.getContext("2d");
    var sourceData = ctx.getImageData(0, 0, 450, 225 );
    ctx.fillRect(0 , 0 , 500, 100)
  }
  render() {
    const { EmptyCardLink, EmptyCard, addItem, background, backgroundLink, height, width } =
      this.state;
      console.log(this.state);
    return (
      <div className="card-generator">
        <div className="parameter-nav">
          <UtilsButton
            handleClick={this.handleClick}
            text={"+"}
            className={"addItem"}
          />  
          {addItem ? (
            <div className="addItemView">
              {!background ? (
                backgroundLink === undefined ? (
                  <UtilsButton
                    handleClick={this.handleClick}
                    text={"Ajouter un background"}
                    className={"addBackground"}
                  />
                ) : (
                  <div className="setBackgroundByUrl">
                    <input
                      type="text"
                      className="backgroundLink"
                      value={backgroundLink}
                      onChange={(e) => {
                        this.setState({ backgroundLink: e.target.value });
                      }}
                    />
                    <UtilsButton
                      handleClick={this.handleClick}
                      className={"setBackground"}
                      text={"ajouter"}
                    />
                  </div>
                )
              ) : (
                <UtilsButton
                  handleClick={this.handleClick}
                  text={"addLayer"}
                  className={"addLayer"}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="canva-zone">
          <canvas className="canva" id="canva" height={height} width={width}
          
          ></canvas>
        </div>
        <div className="layers" id="layers">
          <div className="params" >
            
          </div>
          <div className="layersItems" id="layersItems"></div>
        </div>
      </div>
    );
  }
}

export default DessinCanva;
