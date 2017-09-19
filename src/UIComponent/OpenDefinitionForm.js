import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select } from 'antd';
import urls from '../config/urls';
import baseParams from '../util/baseParams';
import $ from "jquery";   
import {connect} from 'react-redux';
import { changeCondition } from "../actions/actions.js";

const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 0;
//大于
const gt = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAASNJREFUGBlj/v//PyMTK2vggX37bjAQAExAecb//xjWNTa1HmlpabHAp56JkZHxHxMDY+x/BgbpP/8Yjjc2t6xqbu5SxqaJESa4atUqthu3bmX9+8dQDTSAHyg+jZWZsbmqquotTA1cMUxg0qRJfO8+fCoFaigE+uc3ExNTu6y05KTExMQfGIphmrq6uiS+//g95T/D/2Cgtx5xc7KZssAkkemWlh757z9/lgIVegPFPzEw/F8kIiLyCcXk5uZO9b+MfyoY/zNEAxV9AzpjIjsr84TKysr3IMPAiltbWw1+/2OoZPj/PwRkEtC9E/h4uCYWFhZ+ACmCAUagbqbG5ta/QAXvQYrYWJgmVlRUfIQpQKbBbgb6uFaAj2dSXl4e0H24AQDammevvuyPbwAAAABJRU5ErkJggg==";
//小于
const lt = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAARxJREFUGBljYCACNLa0BP7//5+REZ/alpYWi7//GHv+M/y31tJQY2HBpri5uUv5H8Ov9j//GEKB8g+YGBhjw8LC/qIobmtrE/7993/tP4bfWf//M3xkYmIo1FBTnQZU+AtkKNgZ8+fP53j89Hnev3//KhkZGVmB7usXEuDrzsvL+4RsM2N3d7fY1++/TjMw/JdjZGBcy8nBmlNWVvYCWRGMzSQiIvIJ6M2FQIFPQI94f//5u6alpUcepgCZhodGf3+/wMfPXwuBzsgHKuD6z8iwlPk/S0dtbflNmAa4YpgASNOnL9/yge4uAIrxMTAyrmFlYmivrq6+gKEYpqmjo4P/159/YE1AjYL1tdXMMDmc9KRJk/iaWtpqgBqYACNIcX/1SPBYAAAAAElFTkSuQmCC";
//大于等于
const ge = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAALCAYAAABlNU3NAAAAAXNSR0IArs4c6QAAAVNJREFUOBFj/v//PyMTK2vggX37bjDQADABzWT8/49hXWNT65GWlhYLatvBCDKwqak15h8DQzMDw38FRkaG1UwMbJW1tWV38VnW1NZm///vfwd8ahiZGQ+AfMBQV1e9REtDVZ2JiaHw/38Gx38Mv683NrdOaGtrE8ZnADFyYB8gK5w0aRLfuw+fShkZGYGW/f/NxMTUListOSkxMfEHsjpi2RgWwDR2dXVJfP/xe8p/hv/BwGh6xM3JZlpaWvoKJk8szYJNYUtLj/z3nz9LgYZ7A+U/AeNmkYiICJAmHaD4oLm5U/0v458Kxv8M0UCjvgGDaCI7K/OEysrK9+hGExvJYB+0trYa/P7HUPn3/+8Qhv9AFzMytvLxcE0sLCz8gG4wqXxGoCuZgCnmLzBS3wPxBDYWpokVFRUfSTUIl3qwD4AppVaAj2dSXl4eWeGMy3CQOACXj3dbxOb8RAAAAABJRU5ErkJggg==";
//小于等于
const le = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAALCAYAAABlNU3NAAAAAXNSR0IArs4c6QAAAVBJREFUOBFjYCACNLa0BP7//5+RCKUYSlgwRJAEWlpaLP7+Y+z5/++/9erVq0Fq/yJJE8XEakFzc5fyP4Zf7X/+MYQCTXnAxMAYGxYWhmJ4U1ub/f+//x3w2cLIzHgAxYK2tjbh33//1/5j+J31/z/DRyYmhkINNdVpQMN/4TMInxw4XOfPn8/x+OnzvH///lUyMjKyAsO7X0iArzsvL+8TPs3EyDF2d3eLff3+6zQDw385RgbGtZwcrDllZWUviNFMjBomERGRT4yMDAuBij/9Z/jv/f3n75qWlh55YjQTowae9Pr7+wU+fv5aCAyifKBGLmCiXMr8n6Wjtrb8JjaDiI1kuAUwQ0AWffryLR8YDwVAMT4GRsY1rEwM7dXV1RdgakA02RbADOno6OD/9ecf2CKgZYL1tdXMQN/9g8lTjZ40aRJfU0tbDdASJnIMBQCH8IduH+I2qQAAAABJRU5ErkJggg==";
//同比上升
const yu = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAARCAYAAAAsT9czAAAAAXNSR0IArs4c6QAAAhVJREFUOBFjZICCvr4+oc9fvi/i5eGMKyoqegcTB9H45JDVEWIzgRSsWrWK7dPXb+v/M/z3Blq4ZubMmawwjfjkYGqIpcGWXb95ax4jA+NVkKb/jAzCz1+/mQYzAJ8cTA2xNHNDU0sj0CIVTQ3V2Ndv3tYxMzLHMfz/H+Dk7CJk7+DogUtu/769x0GW/P//n5GJlTXwwL59NwhZysTExPCSg50lPCws7C9U8S9WFsZgIJsLnxySwYz//zGsa2xqPdLS0mKBJI7BZEQWAfryP9BnjrW1lQeQxUFsfHJNTa0x/xgYmoH+VGBkZFjNxMBWWVtbdhfdDHCcoQuSyq+rq16ipaGqDgyJwv//GRz/Mfy+3tjcOqGtrU0Y2SyqWAYyEBgNv+pqaiYICfApA+OxEyiU8uvPvztNLW1l8+fP5wCpoZplIMNAIC8v71NDXU0tJzurCjBx7f3371/nw8fPbnZ3d4uxQJRQl2xp6ZH//vNnKSjfAk3+BIzLRSIiIp+oallzc6f6X8Y/FX///4wGWvINiLvYWZknVFZWvgd5hyqWtba2Gvz+x1D59//vEIb/QJ8wMrby8XBNLCws/ACyBAYotgyYGJiAKe88IyPje0YmpkY2FqaJFRUVH2EWINMUWwYyDFgy1Arw8UwCJQ5kw9HZFFsG9BEwPzO0oBuMjU/1pI/NEqxiwHqLExQH2CTxyWFTj00MAJAO35MX1TqqAAAAAElFTkSuQmCC";
//同比下降
const yd = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAQCAYAAADnEwSWAAAAAXNSR0IArs4c6QAAAe5JREFUOBFjYEACDU0t/5ub2x2QhOBMfHJwRQQYTATkqSo9tCz7//8/Y2NLSyAxQUANnzH+/8ewrrGp9UhLS4sFPksptoyRkfEfEwNj7H8GBuk//xiONza3rGpu7lLGZinFloEMraurXqKloarOxMRQ+P8/g+M/ht/XG5tbJ7S1tQkjW0oVy0AGhoWF/aqrqZkgJMCnDIzHTqBQyq8//+40tbSVzZ8/nwOkhmqWgQwDgby8vE8NdTW1nOysKowMjHv//fvX+fDxs5vd3d1iLBAl1CVbWnrkv//8Wfqf4b830ORPDAz/F4mIiHyiqmXNzZ3qfxn/VPz9/zMaaMk3IO5iZ2WeUFlZ+R7kHZbG5rZECTHhlenp6SBJMOjo6OAHhncqMLLf4pKrq6nqgalvbW01+P2PofLv/98hDP+BPmFkbOXj4ZpYWFj4AaYGRDP9//9P4/mrN0uBkQqLP5afv/6uBsqx4ZODGQLS9/vv//OMDAyuTExMjRxsLAr1tdWN6BaB1DNCSoC2VUDFj4HsQmCkngWKXquvrYnDJ4dsWXNre5UAH88kUOKAiWOjWYCZ8n9fX1/cp6/f90EV/BDk50sFsfHJwQwDZWoguwXGx0eDg66oqOg7NwebPwMjwz5WFsZAoAt/wjThk4OpIZYGAPul6q58SmUaAAAAAElFTkSuQmCC";
//环比上升
const mu = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAQCAYAAAD9L+QYAAAAAXNSR0IArs4c6QAAAilJREFUOBGllE1oE1EQx+e9jS1qXOtHwRJKDlIqFaQXRbyoqFehVrxID1GQngIBK8nGXdzsR3XxkC696bFgyaEI3oOC0JvetNCb6MWDaXPQ2M3uOK/0lWeIxaQLy8yb/8zvvdnMiwbKU6vVtLPnJpdvXL+2Vq/XvytSXy5Xqz6trS8C4p0ohje+7w+rWj/+Lrzi+g8B8J6AMAZHtuLkdRiGg/1AZc023HH8W4j4lHH+QAgc2CwDlm1sNl/IRGkpj9muOyXXe1nuuu6FBHCJMWYd09PLIhk1+JbicBMRpqkjowPAMIEVu+K9p9qLHdpfS95GmEcGr6zHhq8q5XL5g8b4DJ30ieMEY1KjQyTU2QwCZNoJrNqOWyP9tNRVy48f1adGhk/OqkHpm6axMpDiE6b5aF3GhLWs8tLEmbFxzqFA3V1NIPpsO16VhuCEmsfUhfgBf2w0WzzFL1mGsapq//KpRqeaOeqINsKIcz4/mhkJc7lca99wuWkQBKd+taJFBJymefty+ODAeVbx/csY45WdJI12N4Gzlwzhq4gxjb2lLt7t6F2N6z7Pxvh7jmrvU8IWvWF2NOOlumb/Z9Bxno3HrF0k8F0q+UlvMHhAq5ZKpYZA9PVZPM+bjBIo0W2+TYwmfe+qnj60UCgUNgRUPj2fnFrnNBkfCdigS2fTNC0Ui8VNCVRtz3BRTBNhDunpMJ/PN1VYp98zXFwigridoG7r3T+ubuJ+Y38AE+/RiwCiIqoAAAAASUVORK5CYII=";
//环比下降
const md = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAQCAYAAAD9L+QYAAAAAXNSR0IArs4c6QAAAhBJREFUOBHNU0tr1FAUPucmM0Uto+gsFBHdlIpu3FjEjboWF75WijAUwYUMzEJJ4mR08hKDwjQIOuJCxIVUqP9AKgr+BBERirgT+sjCzhBzj+fWBtJItaQbD1zueT++ey5CjqIoGplfjAdCF8c7lvUhZyrFilJRGwz6v5ITEXY97+xGmi/TOZKEma7jv/c879jfiqATBCcopZOrThp3ZoPAp0jwTelQw1l+3Ler9pXLcfzLEsAFoAOI8EpA1bTtm1/yPoov0zl0OrdeHDo4Ni4EtIjglITkY9f1e0EQ7MoXwLxQZhU5psbrewMRuRAlQoi7+/buiRqNxmDTybPmwjDcvTxIHhLQeQbz67Yt1aNCVe73+5XMqXi7bjhW1BVlz7u/f3mYtDnxabbF/BbP6/V6rM8vxa8BcY6Vk8Ug1w3OMZ4vucBhfrDPf9rvjaf400hpeIltP/iEIxWtZ5rmgvJFXqeJlHCWMfN21EYfZN+f12aYpPSOMfQ7bStQzhn5vn8kkWAC0QXWxRzbq41unWq1WouZj7pXMP/dIU3zBJMk5TMNxUUJ1OPx3ty221fyAfxogjcj5YQLKmlVF1OGYSzlfTJeV4xtWzOOFxhSyidK5sSPGb9PO7fXriq5SDyNzVNGzWaT8V2f1mzLHcd/xN1e44HmqjpOWJb1ff3Qf1vWfCL+GNcZmumKBmc2m1iV/gWE+dh+nTAP9QAAAABJRU5ErkJggg==";


class OpenDefinitionForm extends Component{
	constructor(props){
		super(props);
		this.state={
			openFiterValue:[],
			add:"add-select",
			delete: "delete-button",
			isDisabled0: false,
            isDisabled1: false,
            isDisabled2: false,
            isOk:true,
            andOr:"and"
		}
	}
	
	//判断是否可点击的函数
	isOkAble(deleteIndex){
		let that = this;
		var countO=0;
        var length = $(".myform").children().length;  
        $(".myform").children(`div:lt(${length-deleteIndex})`).each(function(index,value){
            if($(value).find(".open_server").find(".ant-select-selection-selected-value").length != 0 && $(value).find("input").val() > 0){
                countO++;
            }
        });
        if(countO > 0){
			that.setState({
				isOk:false
			});
        }else{
			that.setState({
				isOk:true
			});
        }
	}
	
	//删除筛选条件
	remove(k){
		let me = this;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length >= 2) {
            $(".delete-button").eq(0).hide();
            $(".delete-button").eq(1).show();
        }
        if(keys.length === 2){
            keys.pop();
        }
        if (keys.length === 1) {
            $(".delete-button").eq(0).show();
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
        this.setState({
            add:"add-select"
        });
        me.isOkAble(4);
        if($(".myform").children().length === 4){
        	me.setState({
        		isOk:false
        	});
        }
	}
	
	//添加筛选条件
	add(){
		let me = this;
		uuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        if(nextKeys.length >= 2){
            $(".delete-button").eq(0).hide();
            $(".delete-button").eq(1).show();
        }
        if(nextKeys.length >= 3){
            this.setState({
                add:"",
            });
            $(".delete-button").eq(0).hide();
            $(".delete-button").eq(1).hide();
            $(".delete-button").eq(2).show();
        }
        form.setFieldsValue({
            keys: nextKeys
        });
        me.isOkAble(3);
	}
	
	//选择运算符
	iconChange(value,option){
		let me = this;
        let index = option.props.icon_index;
        let str = "YUYDMUMD";
        //选择同比或环比时，其他条件不能再选择同比及环比
        switch(index){
        	case 0:
        		if(str.indexOf(value) != -1){
        			me.setState({
        				isDisabled0: false,
			            isDisabled1: true,
			            isDisabled2: true
        			})	
        		}else{
        			me.setState({
        				isDisabled0: false,
			            isDisabled1: false,
			            isDisabled2: false
        			})	
        		}
        	break;
        	case 1:
        		if(str.indexOf(value) != -1){
        			me.setState({
        				isDisabled0: true,
			            isDisabled1: false,
			            isDisabled2: true
        			})	
        		}else{
        			me.setState({
        				isDisabled0: false,
			            isDisabled1: false,
			            isDisabled2: false
        			})	
        		}
        	break;
        	case 2:
        		if(str.indexOf(value) != -1){
        			me.setState({
        				isDisabled0: true,
			            isDisabled1: true,
			            isDisabled2: false
        			})	
        		}else{
        			me.setState({
        				isDisabled0: false,
			            isDisabled1: false,
			            isDisabled2: false
        			})	
        		}
        	break;
        }
	}
	
	//输入数值
	handleChange(e){
		let me = this;
		e.target.value = e.target.value.replace(/[^\d\.]/g, "");
        if (e.target.value.split('.').length > 2) { 
            e.target.value = e.target.value.slice(0, '.'.indexOf(e.target.value)) + e.target.value.slice('.'.indexOf(e.target.value), -1).replace(/\./);
        }
        me.isOkAble(3);
	}
	
	//选择option
	serverChange(){
		let me =this;
		setTimeout(function(){
			me.isOkAble(3);
        },200)
	}
	
	//选择and/or
	andOrChange(value){
		this.setState({
            andOr:value
       });
	}
	
	//点击取消
	clickCancel(){
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		this.props.hide();
		form.setFieldsValue({
            keys: []
        });
        this.setState({
            add:"add-select",
            isOk:true
        });
	}
	
	//点击确定
	clickOk(){
		const { dispatch } = this.props;
		let me = this;
		let f = this.props.form.getFieldsValue();
		var a = "";
		var b = "";
		var c = "";
		var arr = [];
		
		var length = $(".myform").children().length-3;
		if(length > 0){
			$(".myform").children(`div:lt(${length})`).each(function(index,value){
	            if($(value).find(".open_server").find(".ant-select-selection-selected-value").length != 0 && $(value).find("input").val() > 0){
	            	arr[index] = f[`server${index}`] + "," + f[`icon${index}`] + "," + parseFloat(f[`num${index}`]);
	            }
	       });
	       for(var i=0;i<arr.length;i++){
	       		b = b + arr[i] + ";"
	       }
	       a = me.state.andOr;
	       b = b.substr(0,b.length-1);
	       c = "";
		}else{
			a = "";
			b = "";
			c = "";
		}
        dispatch(changeCondition({andOr:a,filterList:b,LinkUp:c}));
        me.props.hide();
	}
	
	componentWillMount(){
		let me = this;
		me.props.form.setFieldsValue({
            keys: [0],
        });
		$.ajax({
            url: urls.initFilterData,
            type:"POST",
            dataType: "json",
            headers:{
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        "X-CSRF-TOKEN":$("meta[name='_csrf']").attr("content")
            },
            data: baseParams
        }).done(function(data){
            me.setState({
                openFiterValue:data.operator
            })
        }).fail(function(err){
            console.log(err);
        });
	}
	
	componentWillReceiveProps(nextProps){
		const { dispatch, dimenName} = nextProps;
        if(dimenName === 1){
	        this.setState({
	            add:"add-select",
	            isOk:true
	        });
        }
        console.log("&&&&&&&&&&&&%^%%^",nextProps)
	}
	
	render(){
		let me = this;
		const { dispatch, dimenName ,form} = me.props;
		const { getFieldDecorator, getFieldValue } = me.props.form;
	    const formItemLayout = {
	        labelCol: { span: 4 },
	        wrapperCol: { span: 20 }
	    };
	    const formItemLayoutWithOutLabel = {
	        wrapperCol: {span: 20, offset: 4}
	    };
	    getFieldDecorator('keys', { initialValue: [] });
	    const keys = getFieldValue('keys');
	    
//	    if(dimenName === 1){
//	    	form.setFieldsValue({
//	            keys: []
//	        });
//	    }
	    
	    //选择and/or的下拉框
	    if(keys.length <= 1){
             var andOr = <div></div>
        }else{
            var andOr = <div>
                    <Select size="small"
                        className="andOr"
                        key="andOr"
                        defaultValue="and"
                        style={{ width:"0.7rem" }}
                        onSelect={this.andOrChange.bind(this)}
                    >
                        <Option style={{ width:"0.69rem" }} key="and" value="and">and</Option>
                        <Option style={{ width:"0.69rem" }} key="or" value="or">or</Option>
                    </Select>
            </div>
        }
	    
	    
	    //生成每个条件选项
	    let Options = [];
        for(let i = 0, len = me.state.openFiterValue.length; i < len; i++){
            Options.push(<Option style={{ width: "1.4rem",textOverflow: "ellipsis" }} title={me.state.openFiterValue[i].name} key={i} value={me.state.openFiterValue[i].id}>{me.state.openFiterValue[i].name}</Option>);
        }
  
        const formItems = keys.map((k, index) => {
          return (
              <div key={index}>
                <FormItem {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)} label={index === 0 ? '' : ''} required={false} key={k} className="open_form">
                    <div className="delete_btn">
                        <Icon
                            className={this.state.delete}
                            type="close"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    </div>
                    {getFieldDecorator('server'+index, {
                        initialValue: undefined,
                        trigger:"onChange"
                    })(
                        <Select size="small"
                            className="open_server"
                            placeholder = "Name of index"
                            key="server"
                            style={{ width: "1.4rem",marginLeft:"0.15rem" }}
                            onSelect={this.serverChange.bind(this)}
                            >
                                {Options}
                        </Select>
                    )}
                    {getFieldDecorator('icon'+index, {
                        initialValue:"GT",
                        trigger:"onChange"
                    })(
                        <Select size="small"
                            className="open_icon"
                            placeholder = "Contrast"
                            key="icon"
                            style={{ width: "1rem",marginLeft:".15rem" }}
                            onSelect={this.iconChange.bind(this)}
                        >
                                <Option icon_index={index} style={{ width: ".99rem"}} className="option_icon" value="GT">
                                    <img className="compare" src={gt}/>
                                </Option>
                                <Option icon_index={index} style={{ width: ".99rem"}} className="option_icon" value='LT'>
                                    <img className="compare" src={lt}/>
                                </Option>
                                <Option icon_index={index} style={{ width: ".99rem"}} className="option_icon" value="GE">
                                    <img className="compare" src={ge}/>
                                </Option>
                                <Option icon_index={index} style={{ width: ".99rem"}} className="option_icon" value="LE">
                                    <img className="compare" src={le}/>
                                </Option>
                                <Option title="Great than week ago" icon_index={index} disabled={this.state["isDisabled"+index]} style={{ width: ".99rem",textOverflow:"ellipsis"}} className="option_icon" value="YU">
                                    Great than week ago
                                </Option>
                                <Option title="Less than week ago" icon_index={index} disabled={this.state["isDisabled"+index]} style={{ width: ".99rem",textOverflow:"ellipsis"}} className="option_icon" value="YD">
                                    Less than week ago
                                </Option>
                                <Option title="Great than last time" icon_index={index} disabled={this.state["isDisabled"+index]} style={{ width: ".99rem",textOverflow:"ellipsis"}} className="option_icon" value="MU">
                                    Great than last time
                                </Option>
                                <Option title="Less than last time" icon_index={index} disabled={this.state["isDisabled"+index]} style={{ width: ".99rem",textOverflow:"ellipsis"}} className="option_icon" value="MD">
                                    Less than last time
                                </Option>
                        </Select>
                    )}
                    {getFieldDecorator('num'+index, {
                        trigger:"onChange",
                        initialValue:""
                    })(
                        <Input
                            className="open_num"
                            style={{ width: "1.3rem",marginLeft:".1rem"}}
                            placeholder="Enter a number."
                            onChange={me.handleChange.bind(this)}
                        />
                    )}
                </FormItem>
            </div>
            );
        });
		
		return(
			<div>
				<Form className="myform">
					{formItems}
					<FormItem {...formItemLayoutWithOutLabel}>
                        <div type="dashed" className={this.state.add} onClick={me.add.bind(this)}></div>
                    </FormItem>
                    {andOr}
					<div className="prpover_btn">
	                    <Button key="OK" type="primary" onClick={this.clickOk.bind(this)} disabled={this.state.isOk}>OK</Button>
	                    <Button key="Cancel" onClick={this.clickCancel.bind(this)}>Cancel</Button>
	                </div>
				</Form>
			</div>
		)
	}
}
const OpenDefinition = Form.create()(OpenDefinitionForm);

function mapStateToProps(state){
	return {
		dimenName:state.linkDimensionState
	}
}

export default connect(mapStateToProps)(OpenDefinition);
