import React, { Component } from "react";

import Analysis from "./Analysis";

// 使用的语法版本不相同
// import Monitor from "./Monitor";
// import Search from "./Search";
// import Statistics from "./Statistics";

export default class Admin extends Component {
  render() {
    return (
      <div>
        <Analysis />
        {/* <Monitor />
        <Search />
        <Statistics /> */}
      </div>
    );
  }
}
