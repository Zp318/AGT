import React, { Component } from 'react';
import { Input  } from 'antd';
import params from "../util/baseParams.js";
import urls from '../config/urls';
import $ from "jquery";
import {connect} from 'react-redux';

class Indicator extends Component{
	constructor(props){
		super(props);
		this.state={
			value:"",
			kqiName:"",
			percent:"",
			msg:""
		}
	}
	
	handleChange(e){
		let me=this;
		const number = parseFloat(e.target.value || 0);
        if (isNaN(number) || (number > 999999)) {
            return;
        }
        this.setState({ value: number });
	}
	
	inputEnter(e){
		if(e.target.value != 0){
			let me=this;
			const { dispatch , conditionObj , dimenName } = me.props;
			$.ajax({
				url: urls.rejectDataQuery,
	            type: "POST",
	            dataType: "json",
	            headers:{
	                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	                    "X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
	            },
	            data: $.extend({}, params, {
					...conditionObj,
					rejectNum:+e.target.value
				})
			}).done(function(res){
				me.setState({
					kqiName:res.kqiName,
					percent:res.kqiValue
				});
				$("#bottomfilter_c label").css("width","5rem");
			}).fail(function(err){
				console.log(err);
			});
			me.setState({
	            msg:"indicator_msg_animation"
	        })
		}
	}
	
	componentWillReceiveProps(nextProps){
		const { dispatch , conditionObj , dimenName } = nextProps;
		if(dimenName === 1){
			$("span.indicator_msg").hide();
		}
		this.setState({ value: 0 });
	}
	
	render(){
		let me = this;
		return(
			<div className="bottomfilter" id="bottomfilter_c">
				<div style={{"float":"left"}}>
                    <b className="indicator_title">Indicator( Excl.TOP)</b>
                    <Input
                       type="text"
                       className="indicator_input"
                       placeholder="0"
                       value={this.state.value}
                       onChange={me.handleChange.bind(this)}
                       onPressEnter={me.inputEnter.bind(this)}
                    />
                </div>
                <label style={{"height":".28rem","width":"0rem","overflow":"hidden","display":"inline-block","float":"left","lineHeight":"0.3rem","marginLeft":"0.1rem"}}
                    className={this.state.msg}>
                    <span className="indicator_msg">({me.state.kqiName}:   <span className="indicator_percent">  {this.state.percent}</span>)</span>
                </label>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		conditionObj:state.linkBarAndTable,
		dimenName:state.linkDimensionState
	}
}

export default connect(mapStateToProps)(Indicator);
