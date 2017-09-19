import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import $ from "jquery";   
import {connect} from 'react-redux';
import { getNameMapping } from "../actions/actions.js";

class LeftBottomChart extends Component{
	constructor(props){
		super(props);
		this.state={
			series:[],
			unit:[""],
			legend:[],
			xAxis:[],
			type:this.props.type || ["bar","line"],
			color:["#379CF8","#A3E06A"]
		}
	}
	
	componentWillReceiveProps(nextProps){
		const { dispatch , conditionObj } = nextProps;
		var me = this;
		$.ajax({
			type:"POST",
			url:urls.leftBottomChart,
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			},
			data:$.extend({}, baseParams ,{
				...conditionObj
			})
		}).done(function(res){
			me.setState({
				unit : [res.charts.others.leftUnit,res.charts.others.rightUnit],
				legend: [{index:0,isMain:true,name:res.charts.others.legend.SERVERSIDEROUNDTRIPTIME},{index:1,isMain:false,name:res.charts.others.legend.proportion}],
				xAxis : res.charts.xAxis,
				series : [res.charts.series.SERVERSIDEROUNDTRIPTIME,res.charts.series.proportion]
			});
			var myarr = [];
			res.charts.xAxis
			for(var i = 0;i<res.charts.xAxis.length;i++){
				myarr.push(res.nameMapping[res.charts.xAxis[i]])
			}
			dispatch(getNameMapping(myarr));
		}).fail(function(err){
			console.log(err)
		})
	}
	
	render(){
		return (
			<div id="leftbottomchart">
				<ChartComponent {...{
										color:this.state.color,
										legendTop:"7%",
										gridTop:"16%",
										type:this.state.type,
										series:this.state.series,
										unit:this.state.unit,
										legend:this.state.legend,
										xAxis:this.state.xAxis
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

export default connect(mapStateToProps)(LeftBottomChart);
