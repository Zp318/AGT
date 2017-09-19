import React, { Component } from 'react';
import DOM from 'react-dom';
import echarts from 'echarts';
import $ from 'jquery';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import crtLineOpt from '../util/createChartOption';
import {connect} from 'react-redux';
import { clickLeftLine, clickBottomBar} from "../actions/actions.js";

class ChartComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			interval:this.props.interval,
			color:this.props.color || ["#74DEED", "#FFC57A", "#A3E06A", "#379CF8"],
			unit:this.props.unit || ["",""],
			type:this.props.type || "line",
			title:this.props.title || "",
			xAxis: this.props.xAxis || [],
			legend: this.props.legend || [],
			series: this.props.series || [],
			gridTop:this.props.gridTop || "25%",
			legendTop:this.props.legendTop || "10%"
		}
	}
	componentWillReceiveProps(nextProps){
		this.state = Object.assign({},this.state,nextProps);
		let line = DOM.findDOMNode(this.refs.line);
		let chart = echarts.init(line);
		this.chart = chart;
		window.addEventListener("resize", function(e){
			chart.resize()
		});
		chart.setOption(crtLineOpt({
				interval:this.state.interval,
				type: this.state.type,
				title: this.state.title, 
				legend: this.state.legend, 
				xAxis: this.state.xAxis, 
				series: this.state.series,
				gridTop:this.state.gridTop || "25%",
				threshold: [{
					value: 0,
					text: "a"
				}, {
					value: 0,
					text: "b"
				}],
				unit: this.state.unit,
				color:this.state.color
			}));
		
		chart.on("click",(e)=>{
			const { dispatch , conditionObj , nameMappingArr} = this.props;
			var height = $("#leftbottom .line").height();
			//点击左边的趋势图联动右边的趋势图
			if(line.parentElement.id === "lefttopleft" && $("#left-top-left").prop("className") != "show"){
				//dipatch后如果右边趋势图不是对应的关联趋势图会重新发送请求渲染折线图，否则不会再刷新
				dispatch(clickLeftLine(e.seriesName));
			}
			
			//点击柱状图弹出
			if(line.parentElement.parentElement.id === "leftbottom" && e.seriesType === "bar"){
				var x = e.event.event.pageX;
				var y = e.event.event.layerY>(height-300) ? e.event.event.pageY - 300 : e.event.event.pageY;
				var title = e.name;
				var display = true;
				$.ajax({
					url:urls.leftTopChartLeft,
					dataType:"json",
					type:"POST",
					headers:{
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
							"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
					},
					data:$.extend({},baseParams,{
						dimValue: nameMappingArr[e.dataIndex],
						filter:conditionObj.filter,
						dimId:conditionObj.dimId
					})
				}).done(function(res){
					dispatch(clickBottomBar({
						title,
						x,
						y,
						display,
						legend:res.legend,
						xAxis:res.xAxis,
						series:res.series,
						unit:res.unit}));
				}).fail(function(err){
					console.log(err);
				})	
			}
		})
	}
	
	componentDidMount() {
			let line = DOM.findDOMNode(this.refs.line);
			let chart = echarts.init(line);
			this.chart = chart;
			window.addEventListener("resize", function(e){
				chart.resize()
			})
			chart.setOption(crtLineOpt({
				interval:this.state.interval,
				type: this.state.type,
				title: this.state.title, 
				legend: this.state.legend, 
				xAxis: this.state.xAxis, 
				series: this.state.series,
				gridTop:this.state.gridTop || "25%",
				threshold: [{
					value: 0,
					text: "a"
				}, {
					value: 0,
					text: "b"
				}], 
				unit: this.state.unit
			}))
	}
	
	render(){
		return(
			<div ref = "line" className = "line">
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		conditionObj:state.linkBarAndTable,
		nameMappingArr:state.linkNameMapping
	}
}

export default connect(mapStateToProps)(ChartComponent);