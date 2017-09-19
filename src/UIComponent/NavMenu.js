import React, { Component } from 'react';
import { Menu , Dropdown ,Icon } from "antd";
import $ from 'jquery';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import util from '../util/util';
import {connect} from 'react-redux';
import { changeCondition , changeDimension} from "../actions/actions.js";

class NavMenu extends Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.id,
			title:this.props.title,
			items:this.props.items
		}
	}
	
	//切换点击大维度时的样式
	onDropDown(e){
		$(e.target).parent().addClass("active");
		$(e.target).parent().siblings("span").removeClass("active");
	}
	
	onMenuClick(e){
		const {dispatch} = this.props;
		let filter = this.props.id
		let dimId = e.item.props.value;
		//选择维度重新渲染柱状图及表格
		dispatch(changeCondition({filter,dimId, andOr:"", filterList:"", LinkUp:""}));
		dispatch(changeDimension(1));
	}
	
	onTitleClick(e){
		var value = $(e.currentTarget).attr("data-id");
	}
	
	render(){
		let menuItems = this.state.items.map((value,index)=>{
			return <Menu.Item key={index} value={value.id}>{value.name}</Menu.Item>
		} );
		let menu = <Menu onClick={this.onMenuClick.bind(this)}>{menuItems}</Menu>;
		return (
			<span ref="dropDown" onClick={this.onDropDown}>
				  <Dropdown overlay={menu} trigger={['click']}>
				    <a className="ant-dropdown-link" href="#" onClick={this.onTitleClick.bind(this)} data-id={this.state.id}>
				      {this.state.title} <Icon type="down" />
				    </a>
				  </Dropdown>
			</span>
		)
	}
}

export default connect()(NavMenu);
