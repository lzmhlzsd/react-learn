import React from 'react';

import './barrage.css';

export default class barrage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                theme: this.props.theme
            }
    }

    componentDidMount() {
        console.log('height: ', this.props.height)
        window.barrage.init({
            h_area: [0, parseFloat(this.props.height.split('px')[0])],
            font_size: 5 * this.props.rem,
            minSpeed: 10,
            maxSpeed: 18,
            hsl: {
                h: [0, 360],
                s: [50, 100],
                l: [50, 100]
            }
        });
        require('./barrage_theme' + this.props.theme + '.js');
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.theme != nextProps.theme) {
            require('./barrage_theme' + nextProps.theme + '.js');
        }
        if (nextProps.orderlist.length > 0) {
            window.barrage.run('.barrage', nextProps.orderlist, '&yen;{{amount}}, {{subject}}')
        }
    }

    render() {
        return <div className = "barrage" > </div>;
    }
}
