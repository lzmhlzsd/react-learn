import React from 'react';
import Today from './today';
import ClassNames from 'classnames';
import Chart from './chart';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';

export default class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vh: $(window).height(),
            rem: 0.03 * $(window).height(),
            head_h: 0.15,
            data_h : 0.50,
            bottom_h : 0.35,
            theme: 'theme01',
            chart: 1
        }
        console.log('rem:', this.state.rem);
    }

    // 获取配置数据
    fetchFn = () => {
        fetch('../data.json')
            .then((res) => { console.log(res.status);return res.json() })
            .then((data) => { this.setState({lists:data.listData}) })
            .catch((e) => { console.log(e.message) })
    }

    componentDidMount() {
        this.fetchFn();
    }


    render() {
        let head_view_style = {
            height: this.state.vh * this.state.head_h,
            border: '1px solid red'
        }
        let main_view_stype = {
            height: this.state.vh * this.state.data_h,
            border: '1px solid red'
        }
        let bottom_view_stype = {
            height: this.state.vh * this.state.bottom_h,
            border: '1px solid red'
        }
        const props = {
            theme: this.state.theme
        }
        console.log(props.theme);
        var classname = ClassNames({
            'container': true,
            'black' :  this.state.theme 
        })

        //require('./theme/theme01/theme01.js');
        return ( 
        	<div className = {this.state.theme + ' container'} >
        		<div className="head-view panel" style={head_view_style}>
                    <Today />
                </div>
        		<div className="main-view panel" style={main_view_stype}>
                    <Chart type={this.state.chart} />
                </div>
        		<div className="bottom-view panel" style={bottom_view_stype}>

                </div>
        	</div>
        )
    }
}
