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
        fetch('../src/components/mocks/config.json')
            .then((res) => { 
            	//console.log(res.status);
            	return res.json() 
            })
            .then((data) => { 
            	this.setState({
            		config: data,
            		init: false
            	}) 
            })
            .catch((e) => { 
            	console.log(e.message) 
            })
    }

    componentDidMount() {
    	let self = this;
    	//模拟数据加载
    	setInterval(this._getdate(self), 3000);
        //this.getData();
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
            theme = 'theme' + this.state.config.theme;
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
