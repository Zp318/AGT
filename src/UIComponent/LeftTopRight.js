import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import $ from "jquery";  
import {connect} from 'react-redux';

class LeftTopRight extends Component{
	constructor(props){
		super(props);
		this.state = {
			series:[],
			unit:[""],
			legend:[],
			xAxis:[],
			selectedValue:""
		}
	}
	
	//接收到当参数seriesName发生改变时重新渲染趋势图
	componentWillReceiveProps(nextProps){
		const { dispatch, seriesName } = nextProps;
		var me = this;
		$.ajax({
			type:"POST",
			url:urls.leftTopChartRight,
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			},
			data:$.extend({}, baseParams ,{
				selectedValue:seriesName
			})
		}).done(function(res){
			me.setState({
				series:res.series,
				unit:res.unit,
				legend:res.legend,
				xAxis:res.xAxis
			})
		}).fail(function(err){
			console.log(err)
		})
	}
	
	render(){
		
		return (
			<div id="lefttopright">
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
		seriesName:state.linkChartLine
	}
}

export default connect(mapStateToProps)(LeftTopRight);