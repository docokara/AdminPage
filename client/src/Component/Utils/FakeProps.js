class FakeProps {
    constructor() {
      this.alphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      this.praups = [];
      this.setPraups();
    }
    setPraups() {
      let els = [["name","nbrOfCard"]];
      for (let index = 0; index < 30; index++) {
        els.push(
          [this.alphabet[Math.round(Math.random() * 25)]+this.alphabet[Math.round(Math.random() * 25)]+this.alphabet[Math.round(Math.random() * 25)],Math.round(Math.random() * 10000)]
        );
      }
      this.praups = els;
    }
  }
  export default FakeProps