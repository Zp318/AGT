import React,{ Component } from 'react';
import $ from "jquery";
import ChartComponent from "./ChartComponent";
import {connect} from 'react-redux';

class BarPopup extends Component{
	constructor(props){
		super(props);
		this.state = {
			display:false,
			x:"",
			y:"",
			title:"",
			unit:"",
			legend:[],
			xAxis:"",
			series:""
		}
	}
	
	clickHandle(){
		this.setState({
			display:false
		});
	}
	
	componentWillReceiveProps(nextProps){
		let me = this;
		const {dispatch , popObj } = nextProps;
		me.setState({
			...popObj
		});
	}
	
	render(){
		return(
			<div id="barPopup" style={{
								width:"40%",
								height:300,
								zIndex:10000,
								position:"absolute",
								background:"white",
								display: this.state.display === true ? "block" : "none",
								top:this.state.y,
								left:this.state.x
							}}>
				<div className="close-mask"><i className = "ant-modal-close-x" onClick={this.clickHandle.bind(this)} title="close"></i></div>
				<ChartComponent {...{
										title:this.state.title,
										unit:this.state.unit,
										legend:this.state.legend,
										xAxis:this.state.xAxis,
										series:this.state.series,
										interval:"900",
										legendTop:"1%",
										gridTop:"20%"
									}}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		popObj:state.linkChartBar
	}
}

export default connect(mapStateToProps)(BarPopup);