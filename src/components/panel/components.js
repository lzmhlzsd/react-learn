import React from 'react';
import Today from '../today/today';
import Charts from '../charts/charts';
import History from '../history/history';
import Barrage from '../barrage/barrage';
import Count from '../count/count';
import Amount from '../amount/amount';
import u from 'underscore';

export default class component extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		let child_comp;
		switch(this.props.type){
			// case "today":
			// 	let amount = 0, count = 0;
			// 	var current = this.props.data.data.current;
			// 	for(var i=0; i< current.length; i++){
			// 		amount += parseFloat(current[i].amount);
			// 		count += parseInt(current[i].count);
			// 	}
			// 	console.log('rem: ', this.props.rem)
			// 	child_comp = <Today amount = {amount} count = {count} rem = {this.props.rem}/>;
			// 	break;
			case "charts_today":
			case "charts_week":
			case "charts_month":
				//通过类型计算x\y轴数据
				let x = [], y = [];
				var current = this.props.data.data.current;
				var prev = this.props.data.data.prev;
				var option = {
					rem: this.props.rem,
					title: '',
					legend: [],
					xAxis: [],
					series: [
						{
							name: '',
							data: []
						},
						{
							name: '',
							data: []
						}
					]
				}
				if(this.props.type == "charts_today"){
					option.title = '交易流水(今日/昨日环比)';
					option.legend = ['今日', '昨日'];
					option.series[0].name = '今日交易额';
					option.series[1].name = '昨日交易额';
					for(var k = 0; k < 24; k++){
						option.xAxis.push(k);
						var t_current = u.where(current,{"item": k.toString()});
						var t_prev = u.where(prev,{"item": k.toString()});

						if(t_current.length > 0){
							option.series[0].data.push(parseFloat(t_current[0].amount));
						}
						else{
							option.series[0].data.push(null);
						}
						if(t_prev.length > 0){
							option.series[1].data.push(parseFloat(t_prev[0].amount));
						}
						else{
							option.series[1].data.push(null);
						}
					}
					//console.log('更新主题： ', this.props.data.panel.theme)
					child_comp = <Charts data = {option} theme = {this.props.data.theme} dstyle={this.props.dstyle}/>;
				}
				else if(this.props.type == "charts_month"){

				}


				else if(this.props.type == "charts_week"){

				}
				//<Today amount = {0} count = {0} /> //<Chartstoday />;
				break;
			case "history":
				child_comp = <History {...this.props.data.status}/>
				break;
			case "barrage":
			console.log(this.props.colstyle.css)
				child_comp = <Barrage orderlist = {this.props.data.orderlist} rem = {this.props.rem} theme = {this.props.data.panel.theme} height = {this.props.colstyle.css.height}/>;
				break
			case "count":
				var count = 0;
				var current = this.props.data.data.current;
				for(var i=0; i< current.length; i++){
					count += parseInt(current[i].count);
				}
				child_comp = <Count data = {count} dstyle={this.props.dstyle}/>
				break
			case "amount":
				var amount = 0;
				var current = this.props.data.data.current;
				for(var i=0; i< current.length; i++){
					amount += parseFloat(current[i].amount);
				}
				console.log('rem: ', this.props.rem)
				child_comp = <Amount data = {amount} rem ={this.props.rem}/>
				break
		}
		return (
			<div className = "component" >
				{child_comp}
			</div>
			)
	}
}