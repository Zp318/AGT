import React, { Component } from 'react';
import urls from '../config/urls';
import $ from "jquery";
import baseParams from '../util/baseParams';
import NavMenu from './NavMenu';
import {connect} from 'react-redux';
import { changeCondition } from "../actions/actions.js";

class LeftBottomNav extends Component{
	constructor(props){
		super(props);
		this.state={
			navs:[]
		}
	}
	
	componentDidMount(){
		const { dispatch } = this.props;
		let me = this;
		$.ajax({
			url :urls.leftBottomNav,
			type:"POST",
			dataType:"json",
			headers:{
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						"X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
			},
			data:$.extend({}, baseParams)
		}).done(function(data){
			me.setState({
				navs:data
			});
			
			$("#leftbottomnav").children("span").eq(0).addClass("active");
			if( (data instanceof  Array) && data.length === 0 ){
				dispatch(changeCondition());
			}else{
				dispatch(changeCondition({filter:data[0].id, dimId:data[0].item[0].id }));
			}
			
		}).fail(function(err){
			console.log(err);
		})
	}
	
	render(){
		var navSelect = [];
		this.state.navs.forEach(function(v,i){
			navSelect.push(<NavMenu key={i} id={v.id} title={v.name} items={v.item}/>)
		})
		return (
			<div id="leftbottomnav">
				{navSelect}
			</div>
		)
	}
}

export default connect()(LeftBottomNav);
