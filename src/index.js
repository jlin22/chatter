import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const instanceLocator = 'v1:us1:0a20a97e-0739-46dd-a807-7fb16747ead7';
const testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0a20a97e-0739-46dd-a807-7fb16747ead7/token';
const username = 'john';
const roomId = 19613407;

class Title extends React.Component {
	render() {
		return <p class="title">Chatter</p>
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
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			message: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
//		this.props.sendMessage(this.state.message);
		this.setState({
			message: ''
		});
	}

	render() {
		return (
			<form 
				onSubmit={this.handleSubmit}
				className="send-message-form">
				<input 
					type="text" 
					value={this.state.message}
					onChange={this.handleChange}
				/>
				{this.state.message}
			</form>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [] 
		}
		this.sendMessage = this.sendMessage.bind(this)
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
			this.currentUser = currentUser
			this.currentUser.subscribeToRoom({
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

	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: roomId
		});
	}

	render() {
		return (
			<div className="app">
				<Title />
				<MessageList data={this.state.messages}/>
				<SendMessageForm sendMessage={this.sendMessage}/>
			</div>
		);
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('root')
);
