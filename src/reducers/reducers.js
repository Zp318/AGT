import {combineReducers} from 'redux';
import { CLICK_LEFT_LINE , CLICK_BOTTOM_BAR , CHANGE_CONDITION , CHANGE_DIMENSION , NAME_MAPPING} from '../actions/actions';

//点击左上角趋势图reducer
function linkChartLine(state="",action){
	switch (action.type){
		case CLICK_LEFT_LINE : 
			return action.seriesName
		default: 
			return state
	}
}

//点击下部柱状图reducer
function linkChartBar(state={title:"" , x:"" , y:"" , display:false, legend:[], xAxis:"", unit:"", series:""},action){
	switch (action.type){
		case CLICK_BOTTOM_BAR : 
			return Object.assign({} , state , action.popObj)
		default: 
			return state
	}
}

//选择维度、counter、筛选条件更新柱状图及表格reducer
function linkBarAndTable(state={filter:"", dimId:"", subKqiId:"",andOr:"",filterList:"",LinkUp:""},action){
	switch (action.type){
		case CHANGE_CONDITION : 
			return Object.assign({} , state , action.conditionObj)
		default: 
			return state
	}
}

//切换维度获得点击状态
function linkDimensionState(state=0,action){
	switch (action.type){
		case CHANGE_DIMENSION : 
			return action.dimenName
		default: 
			return state
	}
}

//获取nameMapping数组
function linkNameMapping(state=[],action){
	switch (action.type){
		case NAME_MAPPING : 
			return state.concat(...action.nameMappingArr)
		default: 
			return state
	}
}

const appReducers = combineReducers({
	linkChartBar,
	linkChartLine,
	linkBarAndTable,
	linkDimensionState,
	linkNameMapping
})

export default appReducers;

