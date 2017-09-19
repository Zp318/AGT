import React, { Component } from 'react';
import LeftTopLeft from './LeftTopLeft';
import LeftTopRight from './LeftTopRight';


class LeftTop extends Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div id="lefttop">
				<LeftTopLeft />
				<LeftTopRight />
			</div>
		)
	}
}

export default LeftTop;