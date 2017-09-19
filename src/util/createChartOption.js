import Date from "./DateExtend";
import util from "./util";

function getMainIndex(legend,isMain){
    var indexs = [];
    var temp = legend.map(function(value,index){
             value.index = index;
             return value;
    }).filter(function(value,index){
        return value.isMain === isMain;
    });
    temp.forEach(function(value,index){
        indexs.push(value.index);
    });
    return indexs;
};

function getMainData(series,indexs){
    var result = [];
    for(var i=0;i<indexs.length;i++){
        result = result.concat(series[indexs[i]])
    };

    var min = Math.min.apply(null,result);
    var max = Math.max.apply(null,result);
    return {
        min,
        max
    };
};

const crtLineOpt = (opts)=>{
    function _createSeries() {
        var series = [];
        for (var i = 0; i < opts.series.length; i++) {
            series.push({
                name: opts.legend[i].name,
                type: ( function(){
                        if( opts.type instanceof Array ){
                            return opts.type[i]
                        }else{
                            if(opts.type){
                                return opts.type
                            }else{
                                return "line"
                            }
                        }
                } )(),
                data: opts.series[i],
                yAxisIndex:opts.legend[i].isMain === true ? 0 : 1,
                barWidth: 10,
                barGap:"2%",
                barCategoryGap:"2%",
                symbol:"emptyCircle",
                barMinHeight:10,
                symbolSize:10
            })
        };
        return series;
    };	
	
    function _tipFormat(is) {
        var interval = "900";
        var r = null
        var tempIn = null;
        function createColorSymbol(color){
             var symbol = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${color}"></span>`;
             return symbol;
        }
       
        switch (interval) {
            case "900":
                tempIn = "hh:mm";
                break;
            case "3600":
                tempIn = "hh:00";
                break;
            case "86400":
                tempIn = "MM:DD";
                break;
            default:
                tempIn = "hh:mm"
        };
        if (true) {
            r = function(p) {
                var tips = p.map(function(value, index) {
                    return value.value;
                });
                var axises = p.map(function(value, index) {
                    return value.seriesName
                });
                var names = p.map(function(value, index) {
                    return value.name;
                });
                var colors = p.map(function(value,index){
                    return value.color;
                })
                if(is){
                    var result = new Date(names[0] * 1000).format(tempIn) + "</br>";
                }
                if(!is){
                    var result = names[0] + "</br>";
                }
                for (var i = 0; i < p.length; i++) {
                    result += (createColorSymbol(colors[i]) + axises[i] + " : " + tips[i] + "<br/>")
                }
                return result;
            }
        }

        return r
    };	
	
	var option ={
		background:"#ffffff",
		color:opts.color || ["#74DEED", "#FFC57A", "#A3E06A", "#379CF8","#52C8C4","#7FBD46","#F585EF"],
		title: {
	        text: opts.title,
	        top: "3%",
	        left: 20,
	        textStyle: {
	            fontSize: 12,
	            color: "#595959"
	        }
	    },
	    tooltip: {
	    	trigger: 'axis',
	        formatter: _tipFormat(opts.interval),
	        confine:true
	    },
	    legend: {
	        data: opts.legend,
	        top: opts.legendTop ||"4%",
	        right: 40,
	        textStyle:{
	            fontSize:12,
	            color:"#36383C",
	            fontWeight:400,
	            fontFamily:"MicrosoftYaHei"
	        },
	        formatter:function(value){
	            if(opts.legend.length>2){
	                return value.length > 25 ? (value.slice(0,25)+"...") : value;
	            }
	            return value;
	        },
	        tooltip:{
	            show:true
	        }
	    },
	    grid: {
	        top: opts.gridTop ||"25%",
	        left: '3%',
	        right: '8%',
	        bottom: '11%',
	        containLabel: true
	    },
	    toolbox: {
	        show: false
	    },
	    xAxis: {
	        type: 'category',
		    axisLabel: {
		        formatter: opts.interval ? function(p) {
		             return util.utc2string(p, opts.interval || "900");
		        } : function(p){
		            return util.string.dealMoreChars(p,6)
		        },
		        textStyle: {
		            fontSize: opts._fontSize ? opts._fontSize :10,
		            fontFamily:"MicrosoftYaHei",
		            color: "#666666",
		            fontWeight:500
		        },
		        interval:0,
		        rotate:45
		    },
		    boundaryGap:["2%","2%"],
		    axisLine: {
		        show: true,
		        lineStyle: {
		            color: ['#ddd'],
		            width: 1
		        }
		    },
		    axisTick: {
		        show: true
		    },
		    data: opts.xAxis
		},
		yAxis: opts.unit.length >1 ? [{
			show :true,
	        type: 'value',
	        min: getMainData(opts.series,getMainIndex(opts.legend,true)).min,
	        max: getMainData(opts.series,getMainIndex(opts.legend,true)).max,
	        name: opts.unit[0] || "",
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	            lineStyle: {
	                color: ['#ddd'],
	                width: 1
	            }
	        },
	        splitLine: { 
	            show: true, 
	            lineStyle: {
                    color: '#999', 
                    type: 'dashed'
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: "#36383C",
	                fontFamily:"MicrosoftYaHei",
	                fontSize:12,
	                fontWeight:400
	            }
	        }
	    },{
	        show:(function(){
	            if(opts.unit instanceof Array && opts.unit.length>1){
	                return true;
	            }else{
	                return false;
	            }
	        })(),
	        type: 'value',
	        min: getMainData(opts.series,getMainIndex(opts.legend,false)).min,
	        max: getMainData(opts.series,getMainIndex(opts.legend,false)).max,
	        name: opts.unit[1] || "",
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	            lineStyle: {
	                color: ['#ddd'],
	                width: 1
	            }
	        },
	        splitLine: { 
	            show: false, 
	            lineStyle: {
                 	color: '#999', 
                 	type: 'dashed'
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: "#36383C",
	                fontFamily:"MicrosoftYaHei",
	                fontSize:12,
	                fontWeight:400
	            },
	        }
	    }] :[{
			show :true,
	        type: 'value',
	        min: getMainData(opts.series,getMainIndex(opts.legend,true)).min,
	        max: getMainData(opts.series,getMainIndex(opts.legend,true)).max,
	        name: opts.unit[0] || "",
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false,
	            lineStyle: {
	                color: ['#ddd'],
	                width: 1
	            }
	        },
	        splitLine: { 
	            show: true, 
	            lineStyle: {
                    color: '#999', 
                    type: 'dashed'
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: "#36383C",
	                fontFamily:"MicrosoftYaHei",
	                fontSize:12,
	                fontWeight:400
	            }
	        }
	    }],
	    series: _createSeries()
	}
	return option;
}

export default crtLineOpt;