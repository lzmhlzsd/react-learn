import React from 'react';
import './count.css';

export default class Today extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('11'+this.props.dstyle)
        return (
    		<div className="count" style={this.props.dstyle}>
    			今日 <span className="num">{this.props.data}</span> 笔
    		</div>

        	)
    }
}
