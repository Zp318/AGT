import React, { Component } from 'react';
import $ from "jquery";
import { Popover, Button } from 'antd';
import OpenDefinition from './OpenDefinitionForm';

class DegradationDefinition extends Component{
	constructor(props){
		super(props);
		this.state = {
		    visible: false,
		    isOkprop:true
		}
	}
	
	hide = () => {
	    this.setState({
	      	visible: false,
	    });
	}
	  
	handleVisibleChange = (visible) => {
	    this.setState({ 
	    	visible:true
	    });
	}
	
	render(){
		const content = (
            <div>
                <OpenDefinition hide={this.hide.bind(this)}/>
            </div>
        );
		
		return(
			<div className="bottomfilter" id="bottomfilter_b">
				<Popover
					placement="bottomLeft"
			        content={content}
			        trigger="click"
			        visible={this.state.visible}
			        onVisibleChange={this.handleVisibleChange}
			    >
			        <Button type="ghost">Degradation Definition</Button>
			    </Popover>
			</div>
		)
	}
}

export default DegradationDefinition;
