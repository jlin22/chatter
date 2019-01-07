import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class Title extends React.Component {
	render() {
		return null;
	}
}

class MessageList extends React.Component {
	render() {
		return null;
	}
}

class SendMessagesForm extends React.Component {
	render() {
		return null;
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		}
	}
	render() {
		return (
			<div className="app">
				<Title />
				<MessageList data={this.state.data}/>
				<SendMessagesForm />
			</div>
		);
	}
}

const dummyData = [
	{
		senderId: 'john',
		text: 'why is programming fun?'
	},
	{
		senderId: 'computer',
		text: 'wrong question to ask.'
	}
];

ReactDOM.render(
	<App data={dummyData}/>,
	document.getElementById('root')
);
