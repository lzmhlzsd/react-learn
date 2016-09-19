import React from 'react';
import Today from '../today/today';
import Chart from '../charts';
import u from 'underscore';
import Component from './components';

// 引入标准Fetch及IE兼容依赖
import './panel.css';

export default class panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vh: $(window).height(),
            rem: 0.03 * $(window).height(),
            head_h: 0.15,
            data_h: 0.50,
            bottom_h: 0.35,
            interval: 2
        }
        //console.log('rem:', this.state.rem);
    }


    render() {
        let head_view_style = {
            height: this.state.vh * this.state.head_h,
            border: '0px solid red'
        }
        let main_view_stype = {
            height: this.state.vh * this.state.data_h,
            border: '0px solid red'
        }
        let bottom_view_stype = {
            height: this.state.vh * this.state.bottom_h,
            border: '0px solid red'
        }

        //console.log(this.props);

        let compents = [], panel_ids = this.props.config.panel.panel_ids;
        for(var i = 0; i < panel_ids.length; i++ ){
            let find = u.where(this.props.config.components, {to_panel: panel_ids[i]});
            if(find.length > 0){
                compents.push(find[0].type);
            }
            else{
                compents.push(null);
            }
        }

        return ( 
            <div>
                <div className = {'head-view panel' + this.props.config.panel.panel_ids[0]} style = { head_view_style } >
                    <Component type = {compents[0]} data = {this.props.config} rem = {this.state.rem}/>
                </div>
                <div className = {'main-view panel' + this.props.config.panel.panel_ids[1]} style = { main_view_stype } >
                    <Component type = {compents[1]} data = {this.props.config} rem = {this.state.rem}/>
                </div > 
                <div className = {'bottom-view panel' + this.props.config.panel.panel_ids[2]} style = { bottom_view_stype } > 
                    <Component type = {compents[2]} data = {this.props.config} rem = {this.state.rem}/>
                </div> 
            </div>
        )
    }
}
