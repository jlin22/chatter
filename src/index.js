import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

class Title extends React.Component {
	render() {
		return null;
	}
}

class MessageList extends React.Component {
	render() {
		const data = this.props.data;
		const dataList = data.map((message) => 
			<li key={message.id}><div>{message.senderId}</div><div>{message.text}</div></li>
		);
		return <ul className="message-list">{dataList}</ul>
	}
}

class SendMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			message: event.target.value
		})
	}

	render() {
		return (
			<form className="send-message-form">
				<input 
					type="text" 
					value={this.state.message}
					onChange={this.handleChange}
				/>
				<p>{this.state.message}</p>
			</form>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: this.props.data
		}
	}

	componentDidMount() {
		const chatManager = new ChatManager({
			instanceLocator: instanceLocator,
			userId: username,
			tokenProvider: new TokenProvider({
				url: testToken
			})
		});

		chatManager.connect().then(currentUser => {
			currentUser.subscribeToRoom({
			roomId: roomId,
			hooks: {
				onNewMessage: message => {
					this.setState({
						messages: this.messages.concat(message)
					})}
				}	
			})
		})
	}

	render() {
		return (
			<div className="app">
				<Title />
				<MessageList data={this.state.messages}/>
				<SendMessageForm />
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

const instanceLocator = 'v1:us1:0a20a97e-0739-46dd-a807-7fb16747ead7';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0a20a97e-0739-46dd-a807-7fb16747ead7/token';
const username = 'john';
const roomId = '19613407';

ReactDOM.render(
	<App data={dummyData}/>,
	document.getElementById('root')
);
