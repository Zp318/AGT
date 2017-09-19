import React, { Component } from 'react';
import './style/antd.min.css';
import './style/App.css';
import './style/resetAntdStyle.css';
import './style/updateAntd.css';
import LeftTop from './UIComponent/LeftTop';
import LeftBottom from './UIComponent/LeftBottom';
import RightGrid from './UIComponent/RightGrid';
import BarPopup from './UIComponent/BarPopup'

class App extends Component {
  render() {
    return (
      <div id="container">
      
      	<div id="left">
      		<LeftTop />
      		<LeftBottom />
      	</div>
      	
      	<div id="right">
      		<RightGrid />
      	</div>
      	
      	<BarPopup />
      </div>
    )
  }
}

export default App;
