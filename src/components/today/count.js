import React from 'react';
import './count.css';

export default class Today extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    		<div className="count">
    			今日 <span className="num">{this.props.data}</span> 笔
    		</div>

        	)
    }
}
