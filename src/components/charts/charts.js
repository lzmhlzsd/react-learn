import React from 'react';
import _ from "lodash";

export default class charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                theme: this.props.theme,
                data: this.props.data,
                id: _.uniqueId('chart_')
            }
            //console.log('charts')
            //console.log(this.state)
    }

    componentDidMount() {
        require('./charts_theme' + this.props.theme + '.js');
        this.myChart = echarts.init(document.getElementById(this.state.id), this.props.theme);
        //注册主题

        this.drawCharts(this.state.data);
        console.log('componentDidMount')
    }

    drawCharts(dataSet) {
        var option = {
                tooltip: {},
                animation: false,
                title: {
                    text: dataSet.title
                },
                grid: {
                    x: dataSet.rem * 4,
                    y: dataSet.rem * 2,
                    x2: dataSet.rem * 2,
                    y2: dataSet.rem * 2
                },
                legend: {
                    data: ['今日', '昨日']
                },
                xAxis: {
                    data: dataSet.xAxis
                },
                yAxis: {},
                series: [{
                    name: dataSet.series[0].name,
                    type: 'line',
                    data: dataSet.series[0].data,
                    hoverAnimation: false,
                    symbolSize: dataSet.rem * 1,
                    showSymbol: true,
                }, {
                    name: dataSet.series[1].name,
                    type: 'line',
                    data: dataSet.series[1].data,
                    hoverAnimation: false,
                    showSymbol: false,
                }]
            }
            //更新chart
        this.myChart.setOption(option);

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.theme != this.theme) {
            this.setState({
                theme: nextProps.theme,
                data: nextProps.data,
            });
            require('./charts_theme' + nextProps.theme + '.js');
            this.myChart = echarts.init(document.getElementById(this.state.id), nextProps.theme);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.drawCharts(this.props.data);
    }

    componentDidUpdate(prevProps, prevState) {
        //console.log('组件完成更新')
    }

    render() {
        let divStyle = {
            height: '100%'
        }
        return ( < div className="charts" id = { this.state.id }
            style = { divStyle } > < /div> 
        )
    }
}
