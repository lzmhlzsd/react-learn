import React from 'react';
import u from 'underscore';
import Panel1 from './panel1';
import Panel2 from './panel2';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

import './panel.css';

export default class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            api_base_url: "https://api.teegon.com/",
            token: "m3ypxoj4hbr3h2oawlbn7eom",
            playsound: "https://charging.teegon.com/static/blink/s1.wav",
            init: true,
            config: {}
        }
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
        var self = this;
        fetch('./../src/components/mocks/config.json')
            .then((res) => { 
            	//console.log(res.status);
            	return res.json() 
            })
            .then((data) => { 
                $.ajax({
                    type: "get",
                    async: false,
                    url: this.state.api_base_url + 'app/blink/status',
                    dataType: "jsonp", //数据类型为jsonp  
                    data: {
                        "token": self.state.token,
                        //"playsound": self.state.playsound,
                        "interval": self.state.interval
                    },
                    callback: "jsonp_" + self.randomString(15), //服务端用于接收callback调用的function名的参数  
                    success: function(data1) {
                        data.data = data1.result.data;
                        data.date = data1.result.date;
                        data.status = data1.result.status;
                        //console.dir(data);
                        self.setState({
                            config: data,
                            init: false
                        }) 
                        setTimeout(self.getData(), 2000);
                        //self.getUpdateData();
                        // let amount = 0, count = 0;
                        // u.each(data.result.data.current,function(item,index){
                        //     amount += parseFloat(item.amount);
                        //     count += parseInt(item.count);
                        // })
                        // self.setState({
                        //     vstate: data.result,
                        //     today_data: {
                        //         amount: amount,
                        //         count: count
                        //     }
                        // })
                    },
                    error: function() {
                        alert('获取配置文件失败');
                    }
                });
            	// this.setState({
            	// 	config: data,
            	// 	init: false
            	// }) 
            })
            .catch((e) => { 
            	console.log(e.message) 
            })
    }

    componentDidMount() {
    	let self = this;
    	//模拟数据加载
    	//setInterval(this._getdate(self), 3000);
        this.getData();
    }

    _getdate(that){
		let self = that;
    	return function(){
    		self.getData();
    	}
    }

    render() {
        let theme = 'theme02';
        let panel = '';
        if (!u.isEmpty(this.state.config)) {
            theme = 'theme' + this.state.config.panel.theme;
            switch(this.state.config.panel.type){
	        	case 1:
		        	panel = <Panel1 {...this.state}/>;
		        	break;
	        	case 2:
		        	panel = <Panel2 {...this.state}/>;
		        	break;
        	}
        }
        require('../theme/' + theme + '/' + theme + '.js');


        let loader_style, panel_style;
        if(this.state.init){
			loader_style = {
				display: 'block'
			}
			panel_style = {
				display: 'none'
			}
        }
        else{
			loader_style = {
				display: 'none'
			}
			panel_style = {
				display: 'block'
			}
        }

        return ( 
        	<div className="panel" >
	        	<div id="loader" style={loader_style}>载入中...</div>
	            <div className = { theme + ' container' } style={panel_style}>
	                {panel}
	            </div >
            </div>
        )
    }
}
