import React from 'react';
import Today from './today/today';
import ClassNames from 'classnames';
import Chart from './charts';
import u from 'underscore';


// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';


export default class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vh: $(window).height(),
            rem: 0.03 * $(window).height(),
            head_h: 0.15,
            data_h: 0.50,
            bottom_h: 0.35,
            interval: 2,
            theme: 'theme01',
            chart: 1,
            api_base_url: "https://api.teegon.com/",
            token: "m3ypxoj4hbr3h2oawlbn7eom",
            today_data: {
                amount: 0,
                count: 0
            },
            chart_data: {}
        }
        console.log('rem:', this.state);
    }

    randomString = (length) => {
        var str;
        str = '';   
        while (str.length < length) {
          str += Math.random().toString(36)[2];
        }
        return str;
    };

    // 获取配置数据
    getData = () => {
        // $.get(this.state.api_base_url + 'app/blink/status',{
        //                     "token": this.state.token,
        //                         "playsound": "https://charging.teegon.com/static/blink/s1.wav",
        //                         "interval": 2,
        //                         "callback": "jsonp_7vo47kt33rfrq38"

        // })

        var self = this;
        $.ajax({
            type: "get",
            async: false,
            url: this.state.api_base_url + 'app/blink/status',
            dataType: "jsonp", //数据类型为jsonp  
            data: {
                "token": self.state.token,
                "playsound": "https://charging.teegon.com/static/blink/s1.wav",
                "interval": self.state.interval
            },
            callback: "jsonp_" + self.randomString(15), //服务端用于接收callback调用的function名的参数  
            success: function(data) {
                //console.dir(data);
                let amount = 0, count = 0;
                u.each(data.result.data.current,function(item,index){
                    amount += parseFloat(item.amount);
                    count += parseInt(item.count);
                })
                self.setState({
                    vstate: data.result,
                    today_data: {
                        amount: amount,
                        count: count
                    }
                })
            },
            error: function() {
                alert('获取配置文件失败');
            }
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        var theme = '02';
        if (typeof this.state.vstate != 'undefined') {
            theme = this.state.vstate.config.theme;
        }
        require('./theme/theme' + theme + '/theme' + theme + '.js');
        let head_view_style = {
            height: this.state.vh * this.state.head_h,
            border: '0px solid red'
        }
        let main_view_stype = {
            height: this.state.vh * this.state.data_h,
            border: '0px solid red'
        }
        let bottom_view_stype = {
            height: this.state.vh * this.state.bottom_h,
            border: '0px solid red'
        }

        // var classname = ClassNames({
        //     'container': true,
        //     'black': this.state.theme
        // })

        // let today_data = {
        //     count : typeof this.state.vstate != 'undefined' : this.state.vstate.config.
        // } 


        return ( 
            < div className = { this.state.theme + ' container' } >
                < div className = "head-view panel" style = { head_view_style } >
                    < Today data= {this.state.today_data }/ >
                < /div>
                < div className = "main-view panel" style = { main_view_stype } >
                    < Chart type = { this.state.chart } /> 
                < /div > 
                < div className = "bottom-view panel" style = { bottom_view_stype } >            
                < /div> 
            < /div >
        )
    }
}
