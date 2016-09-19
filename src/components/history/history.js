import React from 'react';

import './history.css';

export default class history extends React.Component {
    constructor(props) {
        super(props);
    }

    fixed_money_html(f){
        if(f>10000){
            f = (f/10000).toFixed(2);
            f+="万";
        }
        return f;
    }

    render() {
    	return (
    		<div className="history">
    			<table>
                    <tbody>
        				<tr>
        					<td>本周：</td><td className="cnt">{this.props.week.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.week.amount)}</td><td className="splid">&nbsp;</td>
                            <td>上周：</td><td className="cnt">{this.props.lastweek.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.lastweek.amount)}</td>
        				</tr>
                        <tr>
                            <td>本月：</td><td className="cnt">{this.props.month.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.month.amount)}</td><td className="splid">&nbsp;</td>
                            <td>上月：</td><td className="cnt">{this.props.lastmonth.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.lastmonth.amount)}</td>
                        </tr>
                        <tr>
                            <td>昨日：</td><td className="cnt">{this.props.yesterday.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.yesterday.amount)}</td><td className="splid">&nbsp;</td>
                            <td>总计：</td><td className="cnt">{this.props.total.count}笔</td><td className="money">&yen; {this.fixed_money_html(this.props.total.amount)}</td>
                        </tr>
                    </tbody>
    			</table>
    		</div>
    		)
    }
}
