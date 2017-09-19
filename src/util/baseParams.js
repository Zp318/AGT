import util from './util'
var now = new Date();
var baseParams = util.parseURL();


var getDimValues = (function(){
	if(baseParams.fromPage === "SP"){
		return JSON.stringify({sub_protocol:"62031"})
	}
	if( baseParams.fromPage === "NE" ){
		return JSON.stringify({sgw:"101002"})
	}
	else{
		return (baseParams.dimValues || "")
	}
})();


var params = {
	kqiId:baseParams.kqiId || "",
	kqiValue:baseParams.kqiValue || "",
	dimType:document.querySelector("#dimType") ? document.querySelector("#dimType").value : "",
	dimValues:baseParams.dimValues || "",
	startTime:baseParams.startTime || parseInt(now.getTime()/1000) - 900,
	timeType:baseParams.timeType || "900",
	fromPage:baseParams.fromPage || "KQI"	 
} 

export default params