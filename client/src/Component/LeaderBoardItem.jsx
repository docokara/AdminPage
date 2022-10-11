import React from "react";
import "../css/leaderBoardItem.css";
import FakeProps from "./Utils/FakeProps";
const tabProps = [
  ["name", "nbrOfCard"],
  ["PKS", 2154],
  ["VXI", 1675],
  ["JBE", 5752],
  ["DVN", 7069],
  ["FPE", 9072],
  ["DMI", 1899],
  ["EOF", 3013],
  ["MIZ", 9433],
  ["LTL", 7617],
  ["PCX", 762],
  ["CVC", 9678],
  ["AMU", 2855],
  ["IVL", 6535],
  ["DCT", 1960],
  ["KPL", 9905],
  ["WKD", 7055],
  ["ORE", 9603],
  ["NPQ", 6618],
  ["VKF", 7488],
  ["MYF", 6576],
  ["WLH", 4862],
  ["PRN", 1268],
  ["MID", 8328],
  ["XAA", 3608],
  ["FNV", 4112],
  ["RDC", 6460],
  ["SBQ", 2725],
  ["EUP", 3248],
  ["BHS", 735],
  ["XTD", 6278],
];
class LeaderBoardItem extends React.Component {
  state = {
    tab: tabProps,
    sortColumn: this.props.sortColumnm || 0,
    sortInvert: false,
  };
  componentDidMount = () => {
    const tab = tabProps;
    const header = tab.shift();
    this.setState({ tab, header });
  };

  basicOrder = () => {};

  changeOrder = (column, invert) => {
    let { tab, header } = this.state;
    const index = header.indexOf(column);
    tab.sort((a, b) => {
      if (a[index] > b[index]) return invert ? -1 : 1;
      if (a[index] <= b[index]) return invert ? 1 : -1;
      if (a[index] === b[index]) {
        const oIndex = column === 0 ? 1 : 0;
        if (a[oIndex] > b[oIndex]) return invert ? -1 : 1;
        if (a[oIndex] <= b[oIndex]) return invert ? 1 : -1;
      }
    });
    this.setState({ tab, sortColumn: column, sortInvert: invert });
  };
  render() {
    const { tab, header } = this.state;

    return (
      <div className="leaderBoard-container">
        <table>
          <tr>
            {!header
              ? null
              : header.map((el, i) => (
                  <th
                    key={`${i}`}
                    onClick={(event) => {
                      this.changeOrder(el, !this.state.sortInvert);
                    }}
                  >
                    {el}
                  </th>
                ))}
          </tr>

          {!tab
            ? null
            : tab.map((ta, i) => (
                <tr key={i}>
                  {ta.map((el, ii) => (
                    <td key={`${i}${ii}`}>{el}</td>
                  ))}
                </tr>
              ))}
        </table>
      </div>
    );
  }
}
export default LeaderBoardItem;
