/**
 * @description:chart.on("click")  action.type
 */
export const CLICK_LEFT_LINE = "CLICK_LEFT_LINE";
export const CLICK_BOTTOM_BAR = "CLICK_BOTTOM_BAR";
export const CHANGE_CONDITION = "CHANGE_CONDITION";
export const CHANGE_DIMENSION = "CHANGE_DIMENSION";
export const NAME_MAPPING = "NAME_MAPPING";


//点击左上角趋势图
export function clickLeftLine(seriesName){
	return {
		type:CLICK_LEFT_LINE,
		seriesName
	}
}

//点击下部柱状图
export function clickBottomBar(obj){
	return {
		type:CLICK_BOTTOM_BAR,
		popObj:obj
	}
}

//选择维度更新柱状图及表格
export function changeCondition(obj){
	return {
		type:CHANGE_CONDITION,
		conditionObj:obj
	}
}

//点击维度，记录点击状态
export function changeDimension(dimenName){
	return {
		type:CHANGE_DIMENSION,
		dimenName
	}
}

//获取nameMapping数组
export function getNameMapping(arr){
	return {
		type:NAME_MAPPING,
		nameMappingArr:arr
	}
}