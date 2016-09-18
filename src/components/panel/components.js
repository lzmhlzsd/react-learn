import React from 'react';
import Today from '../today/today';

export default class component extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		let child_comp;
		switch(this.props.type){
			case "today":
				child_comp = <Today />;
				break;
		}
		return (
			<div>
				{child_comp}
			</div>
			)
	}
}