import React, { Component } from 'react';
import LeftBottomNav from './LeftBottomNav';
import LeftBottomFilter from './LeftBottomFilter';
import LeftBottomChart from './LeftBottomChart';

class LeftBottom extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div id="leftbottom">
				<LeftBottomNav />
				<LeftBottomFilter />
				<LeftBottomChart />
			</div>
		)
	}
}

export default LeftBottom;
