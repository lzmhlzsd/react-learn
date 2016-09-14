import React from 'react';
import Mainamount from './main-amount';
import Count from './count';

export default class Today extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    		<div className="today">
    			<Mainamount />
    			<Count />
    		</div>

        	)
    }
}
