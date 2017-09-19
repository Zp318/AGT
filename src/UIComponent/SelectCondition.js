import React, { Component } from 'react';
import $ from 'jquery';
import { Select } from 'antd';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import util from '../util/util';
import {connect} from 'react-redux';
import { changeCondition } from "../actions/actions.js";

class SelectCondition extends Component{
	constructor(props){
		super(props);
		this.state={
			filterValue:[],
			placeholder:""
		}
	}
	
	handleChange(value){
		const {dispatch} = this.props;
		this.setState({
			placeholder:value
		});
		//下拉框选择切换值
		dispatch(changeCondition({subKqiId: value}));
	}
	
	componentWillMount() {
		const {dispatch} = this.props;
        $.ajax({
            url: urls.initFilterData,
            type:"POST",
            dataType: "json",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                "X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
            },
            data: baseParams
        })
        .done(function(data){
        	let place = data.sort.length > 0 ? data.sort[0].id : "Select conditions";
            this.setState({
            	filterValue:data.sort,
            	placeholder: place
            });
            //初始默认情况的subKqiId的值
            dispatch(changeCondition({subKqiId: data.sort.length > 0 ? data.sort[0].id : ""}));
        }.bind(this))
        .fail(function(err){
            console.log(err);
        })
	}
	
	
	render(){
		const Option = Select.Option;
        let me = this;
        let Options = [];
        for(let i = 0, len = me.state.filterValue.length; i < len; i++){
            Options.push(<Option key={i} style={{ width: "1.58rem",textOverflow: "ellipsis" }} title={me.state.filterValue[i].name} value={me.state.filterValue[i].id}>{me.state.filterValue[i].name}</Option>);
        }
		
		return(
			<div className="bottomfilter" id="bottomfilter_a">
				<Select size="large" value={this.state.placeholder} style={{ width: "1.58rem" }} onChange={this.handleChange.bind(this)}>
			        {Options}
			    </Select>
			</div>
		)
	}
}

export default connect()(SelectCondition);
