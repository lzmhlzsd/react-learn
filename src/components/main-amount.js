import React from 'react';
import _ from "lodash";

export default class Amount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: _.uniqueId('_')
        }
        console.log('Amount:', this.state);
    }

    componentDidMount() {
        
    }

    drawAmount(){
        
    }

    render() {
        return (
            <div className="main-amount">
        		<div className="a"></div>
                <div className="b"></div>
                <div className="m m-a"></div>
            </div>

        	)
    }
}
