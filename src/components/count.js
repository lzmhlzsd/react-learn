import React from 'react';

export default class Today extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
    		<div className="count">
    			今日 <span className="num"></span> 笔
    		</div>

        	)
    }
}
