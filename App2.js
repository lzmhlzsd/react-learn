import React from 'react';

var App2 = React.createClass({
        getInitialState: function() {
            return {
                data: this.props.data
            };
        },
        componentDidMount: function() {
            this.drawCharts(this.state.data);
            var that = this;
            setInterval(that.getData, 1000);
        },
        /**
         * @return {[type]}
         */
        getData: function() {
            var dataSet = this.props.data.map(function(ele) {
                return Math.random() * ele;
            })
            console.log(dataSet);
            this.setState({
                data: dataSet
            });
        },
        drawCharts: function(dataSet) {
            var myChart = echarts.init(document.getElementById('charts'));

            var option = {
                    title: {
                        text: 'echarts demo'
                    },
                    tooltip: {},
                    legend: {
                        data: ['销量']
                    },
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: dataSet
                    }]
                }
                // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        componentWillUpdate: function() {
            //var dataset=[10,20,30,50,30,70];
            console.log(this.state.data);
            this.drawCharts(this.state.data);
        },
        /*注意return后面的js有自动加；的习惯*/
        render: function() {
        	let divStyle = {
        		height: '300px'
        	}
            return ( < div >
                < h1 > Hello { this.props.name } < /h1> < div id = "charts" style={divStyle}>> < /div > < /div>)
            }
        })
        export default App2
