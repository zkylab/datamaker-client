import React from "react";
import ReactDOM from "react-dom";
import "./css/topBanner.css";
import Banner from 'react-js-banner';
import Button from '@material-ui/core/Button';

class TopBanner extends React.Component {
  constructor() {
    super();
    this.state = {
        bannerMessage:"Data Maker",
        bannerCss: { color: "#FFF", backgroundColor: "green" },
    };
  }



  render() {
    return (
    <div className="top-banner-container">
        <div className="title"><h1>Data Maker</h1></div>

    </div>
    );
  }
}
export default TopBanner;

