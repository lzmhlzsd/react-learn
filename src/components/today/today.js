import React from 'react';
import Mainamount from './main-amount';
import Count from './count';
import './today.css';

export default class Today extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    		<div className="today">
    			<Mainamount data = { this.props.data.amount } />
    			<Count data = { this.props.data.count } />
    		</div>

        	)
    }
}
