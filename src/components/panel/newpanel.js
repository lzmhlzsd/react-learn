import React from 'react';
import u from 'underscore';
import Component from './components';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';

import './panel.css';

export default class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	vh: $(window).height(),
            rem: 0.03 * $(window).height(),
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
        fetch('../src/components/mocks/config.json')
            .then((res) => {
                //console.log(res.status);
                return res.json();
            })
            .then((data) => {
                //setTimeout(self.getData(), 2000);
                self.setState({
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

    _getdate(that) {
        let self = that;
        return function() {
            self.getData();
        }
    }

    render() {
        var theme = 'theme02';

        if (typeof this.state.config.theme != 'undefined') {
            theme = 'theme' + this.state.config.theme;
        }
        console.log(theme)
        require('../theme/' + theme + '/' + theme + '.js');


        let loader_style, panel_style;
        if (this.state.init) {
            loader_style = {
                display: 'block'
            }
            panel_style = {
                display: 'none'
            }
        } else {
            loader_style = {
                display: 'none'
            }
            panel_style = {
                display: 'block'
            }
        }

        //var panel = "";
        var rows = [];
        if (typeof this.state.config.newpanel != 'undefined') {
            // for (var i = 0; i < this.state.config.newpanel.length; i++) {
            // 	panel += '<div class="row" style="height:' + (this.state.config.newpanel[i].height * this.state.vh) + 'px;">';
            // 	for(var j = 0; j< this.state.config.newpanel[i].cols.length; j++){
            // 		panel += '<div class="col" style="border: 1px solid green;width:'+ (this.state.config.newpanel[i].cols[j].width * 100) +'%;height:100%;">';

            // 		panel += <Component type = {"today"} data = {this.props.config} rem = {this.state.rem}/>

            // 		panel += '</div>'
            // 	}
            // 	panel += '</div>';
            // }
            
            var numrows = this.state.config.newpanel;
			for (var i=0; i < numrows.length; i++) {
				var cols = [];
				var numcols = numrows[i].cols;
				for(var j=0; j < numcols.length; j++) {
					var colstyle = {
						"width": numcols[j].width * 100 + '%',
						"height": "100%",
						"border": this.state.config.border ? "1px solid green" : ""
					}
					if(typeof numcols[j].css != 'undefined'){
						var self = this;
						u.each(numcols[j].css,function(list,key){
							switch(key){
								case 'top':
								case 'right':
								case 'left':
								case 'bottom':
								case 'height':
									numcols[j].css[key] = (list * self.state.vh) + 'px';
									break;
							}
						})
						colstyle = u.extend(colstyle, numcols[j].css);
						
					}
					//根据槽号查找对应的组件
					var compopent;
					compopent = u.where(this.state.config.components, { "to_panel": numcols[j].id});
					//console.log(numcols[j])
					if(compopent.length > 0){
						cols.push(<div key={'col' + i* numcols.length + j} className="col" style={colstyle}>
							<Component type = {compopent[0].type} data = {this.state.config} rem = {this.state.rem} dstyle = {compopent[0].css} colstyle = {numcols[j]}/>
						</div>);
					}
					else{
						cols.push(<div key={'col' + i* numcols.length + j} className="col" style={colstyle}></div>);
					}
				}
				var rowstyle = {};
				if(typeof numrows[i].position == 'undefined') {
					rowstyle = {
						height: numrows[i].height * this.state.vh
					}
				}
			    rows.push(<div key={'row' + i } className="row" style={rowstyle}>{cols}</div>);
			}
        }

        return ( 
        	<div className = "panel" >
            	<div id = "loader" style = { loader_style } > 载入中... </div>
            	<div className = { theme + ' container' } style = { panel_style } > 
            		{rows}
            	</div> 
            </div>
        )
    }
}
