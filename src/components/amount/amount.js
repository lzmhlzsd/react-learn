import React from 'react';
import _ from "lodash";

import './amount.css';

export default class Amount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: _.uniqueId('_')
        }
        //console.log('Amount:', this.state);
    }
    
    componentDidMount() {
        var a = $('.main-amount .a');
        var sub = $('.main-amount .b');
        var mask_a = $('.main-amount .m-a');

        var v_amount = parseFloat(this.props.data);
        var rem = this.props.rem;
        // var $ = require('jquery');
        this.widgets_amount = $.MoneyJump(a, sub, mask_a, v_amount, rem);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.data != nextProps.data){
           this.widgets_amount.to(parseFloat(nextProps.data));
        }
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
