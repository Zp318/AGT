import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import $ from "jquery";       
import {connect} from 'react-redux';
import { clickLeftLine } from "../actions/actions.js";

class LeftTopLeft extends Component{
	constructor(props){
		super(props);
		this.state = {
			series:[],
			unit:[""],
			legend:[],
			xAxis:[],
			leftKqis:"",
			rightKqis:"",
		}
	}
	
	componentDidMount(){
		const { dispatch , conditionObj} = this.props;
		var me = this;
		$.ajax({
			type:"POST",
			url:urls.leftTopChartLeft,
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			},
			data:$.extend({}, baseParams ,{
				leftKqis:this.state.leftKqis,
				rightKqis:this.state.rightKqis,
				andOr:conditionObj.andOr,
				filterList:conditionObj.filterList,
				LinkUp:conditionObj.LinkUp
			})
		}).done(function(res){
			//初次渲染右边趋势图时，selectValue默认为res.legend[0].name
			dispatch(clickLeftLine(res.legend[0].name));
			me.setState({
				series:res.series,
				unit:res.unit,
				legend:res.legend,
				xAxis:res.xAxis
			});
		}).fail(function(err){
			console.log(err)
		})
	}
	
	render(){
		return (
			<div id="lefttopleft" className={ window.isRatePage == "false" ? "show" : ""}>
				<ChartComponent {...{
										series:this.state.series,
										unit:this.state.unit,
										legend:this.state.legend,
										xAxis:this.state.xAxis,
										interval:"900"
									}
				}/>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		conditionObj:state.linkBarAndTable
	}
}

export default connect(mapStateToProps)(LeftTopLeft);