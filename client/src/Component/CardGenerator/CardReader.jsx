import React, { Component } from "react";

class CardReader extends Component {
  state = {
    card: this.props.cardType,
  };
  render() {
    const { card } = this.state;
    const layers = card.map((e, i) => {
      return e.content.type === "text" ? (
        <div
          className={e.name}
          id={e.name}
          key={`${e.name}${i}`}
          style={{
            position: "absolute",
            ...e.position.style,...e.content.style
          }}
        >
          {e.content.text}
        </div>
      ) : (
        <img
          alt={e.name}
          className={e.name}
          id={e.name}
          key={`${e.name}${i}`}
          style={{
            position: "absolute",
            ...e.position.style
          }}
          src={e.content.url}
        />
      );
    });
    console.log(this.state.card);
    return (
      <div
        className={`Card-number${this.state}`}
        style={{position: "absolute" }}
      >
        {layers}
      </div>
    );
  }
}

export default CardReader;
