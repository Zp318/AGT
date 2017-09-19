import React, { Component } from 'react';
import SelectCondition from './SelectCondition';
import DegradationDefinition from './DegradationDefinition';
import Indicator from './Indicator';

class LeftBottomFilter extends Component{
	constructor(props){
		super(props);
		this.state={
		
		}
	}
	
	render(){
		return (
			<div id="leftbottomfilter">
				< SelectCondition / >
                < DegradationDefinition />
                < Indicator />
			</div>
		)
	}
}

export default LeftBottomFilter;
