import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        //this.state = { txt: 'this is the state txt' };
        this.state ={txt:''}
        this.update = this.update.bind(this)
    }
    update(e) {
        this.setState({ txt: e.target.value })
    }
    render() {
        //let txt = this.props.txt;
        return ( 
   //      	<div>
   //      		<input type="text"
   //      		onChange = {this.update.bind(this)} />
   //      		< div > 11 { this.state.txt } < /div>
			// </div>
			<div>
				<Widget txt={this.state.txt} update={this.update} />	
				<Widget txt={this.state.txt} update={this.update} />	
				<Widget txt={this.state.txt} update={this.update} />	
				<Widget txt={this.state.txt} update={this.update} />	
				<Widget txt={this.state.txt} update={this.update} />	
			</div>
        	)
    }
}

// App.propTypes = {
//     txt: React.PropTypes.string,
//     cat: React.PropTypes.number.isRequired
// }

// App.defaultProps = {
//     txt: 'this is the default txt'
// }

const Widget = (props) => {
	return (
        	<div>
        		<input type="text"
        		onChange = {props.update} />
        		< div > 11 { props.txt } < /div>
			</div>
		)
}

export default App
