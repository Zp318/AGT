import React, { Component } from 'react';
import { Table, Icon , LocaleProvider,Popover ,Button  } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US'
import $ from "jquery";
import urls from "../config/urls";
import util from '../util/util';
import baseParams from '../util/baseParams';
import {connect} from 'react-redux';

class RightGrid extends Component{
	constructor(props){
		super(props);
		this.state={
			visible:false,
			columns:[],
			dataSource:[]
		}
	}
	
	componentWillReceiveProps(nextProps){
		const { dispatch , conditionObj } = nextProps;
		var me = this;
		$.ajax({
			type:"POST",
			url:urls.rightGrid,
			dataType:"json",
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			},
			data:$.extend({}, baseParams ,{
				...conditionObj
			})
		}).done(function(res){
			window.detailsSheetParams = res.params;
			var headerCopy = res.header;
			for(var i=0;i<headerCopy.length;i++){
				if(headerCopy[i].rillDown === true){
					headerCopy[i].render = text => <a href="#" >{text}</a>
				}
			}
			me.setState({
				columns:headerCopy,
				dataSource:res.data
			});
		}).fail(function(err){
			console.log(err)
		})
	}
	
	exportClick(e){
		const { dispatch , conditionObj } = this.props;
		$.ajax({
				type:"POST",
				url:urls.exportGridData,
				dataType:"json",
				headers:{
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
				},
				data:$.extend({},baseParams,{
					...conditionObj,
					exportType:$(e.target).attr("data-id")
				})
			}).done(function(res){
				console.log(res)
			}).fail(function(err){
				console.error(err)
			});
		this.setState({ visible : false });
	}
	
	handleVisibleChange = (visible) => {
	    this.setState({ visible });
	}
	
	onRowClick(record, index,e){
		if(e.target.nodeName.toLowerCase() === "a"){
			var id = record.ID;
			var params = window.detailsSheetParams.replace(/@DIMID@/i,id).replace(/'/gi,'"');
			window.open(urls.detailsSheet+params);
		}
	}
	
	render(){
		return (
			<div id="rightgrid">
				<div id="export">
					<Popover
			        	content={<span><a onClick={this.exportClick.bind(this)} data-id="excel">Excel</a><br/><a onClick={this.exportClick.bind(this)} data-id="csv">Csv</a></span>}
			        	trigger="click"
			        	visible={this.state.visible}
			        	onVisibleChange={this.handleVisibleChange}
			        	placement="leftTop"
			      	>
			        	<Button type="primary" title="export"><Icon type="export" /></Button>
			     	</Popover>		
				</div>	
				<LocaleProvider locale={enUS}>
					<Table
					 	columns={this.state.columns} 
					 	dataSource={this.state.dataSource}
					 	onRowClick={this.onRowClick.bind(this)}
					/>
				</LocaleProvider>
				<div id="tempBg"></div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		conditionObj:state.linkBarAndTable
	}
}

export default connect(mapStateToProps)(RightGrid);