import React from "react";
import uuid from "node-uuid";
import _ from "lodash";

export default class charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            id: _.uniqueId('chart_') //uuid.v4()
        }
        console.log(this.state)
    }

    componentDidMount() {
        this.drawCharts(this.state.data);
        var that = this;
        //setInterval(that.getdate, 1000);
        //that.getdate();
        console.log('组件创建完成')
        setInterval(that._getdate(that), 1000);
    }

    _getdate(that) {
    	let self = that;
    	return function(){
    		self.getdate(that);
    	}
    }

    getdate(that) {
        var dataSet = that.props.data.map(function(ele) {
            return Math.random() * ele;
        })
        //console.log(dataSet);
        console.log('组件变更状态')
        that.setState({
            data: dataSet
        });
    }

    drawCharts(dataSet) {
        var myChart = echarts.init(document.getElementById(this.state.id));

        var option = {
                title: {
                    text: 'echarts demo'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫1", "羊毛衫1", "雪纺衫1", "裤子1", "高跟鞋1", "袜子1"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: dataSet
                }]
            }
        //更新chart
        myChart.setOption(option);
    }

    componentWillUpdate(nextProps, nextState) {
        //console.log(this.state.data);
        console.log('组件即将更新')


        this.drawCharts(this.state.data);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('组件完成更新')
    }

    render() {
        let divStyle = {
            height: '100%'
        }
        return ( 
            < div id = {this.state.id}
            style = { divStyle } > < /div> 
        )
    }
}
