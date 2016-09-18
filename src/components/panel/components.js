import React from 'react';

export default class component extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		// switch(this.props.type){
		// 	case ""
		// }
		return (
			<div>{this.props.type}</div>
			)
	}
}