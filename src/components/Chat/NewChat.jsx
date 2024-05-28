import { Send } from '@mui/icons-material'

import {
	Backdrop,
	CircularProgress,
	Container,
	List,
	TextField,
} from '@mui/material'
import { Client } from '@twilio/conversations'
import React, { useEffect, useRef, useState } from 'react'
import ChatItem from './ChatItem'

const NewChat = ({ conversationId, token, link, setLink }) => {
	const [conversationsClient, setConversationsClient] = useState(null)
	const [conversation, setConversation] = useState(null)
	const [messages, setMessages] = useState([])
	const [text, setText] = useState('')
	const [loading, setLoading] = useState(false)
	const scrollDiv = useRef(null)
	let user = JSON.parse(localStorage.getItem('user'))

	useEffect(() => {
		 setLoading(true)
		const initConversationsClient = async () => {
			const client = new Client(token)

			try {
				client.on('initialized', () => {
					setConversationsClient(client)
				})

				client.on('connectionStateChanged', (state) => {
					if (state === 'connecting') {
					}
					if (state === 'connected') {
						console.log('connected')
						handleJoinConversation(client, conversationId, 4000)
					}
					if (state === 'disconnecting') {
					}
					if (state === 'disconnected') {
					}
					if (state === 'denied') {
						console.log('denied')
					}
				})
			} catch (error) {
				console.error('Error initializing ConversationsClient:', error)
			}
		}

		const handleConversationChange = async () => {
			try {
				// Leave the current conversation
				if (conversation) {
					await conversation.leave()
				}
			} catch (error) {
				console.error('Error handling conversation change:', error)
			} finally {
				// setLoading(false)
			}
		}

		initConversationsClient()
		handleConversationChange()
		return () => {
			// Cleanup ConversationsClient on component unmount
			if (conversationsClient) {
				conversationsClient.shutdown()
			}
			setMessages('')
		}
	}, [conversationId])

	useEffect(() => {
		if (!conversation) {
			return
		} else {
			messageGetter()
		}

		const handleMessageAdded = (message) => {
			setMessages((prev) => [...prev, message])
		}
		conversation.on('messageAdded', handleMessageAdded)

		return () => {
			conversation?.removeListener('messageAdded', handleMessageAdded)
		}
	}, [conversation])

	const messageGetter = async () => {
		const conversationMessages = await conversation.getMessages()
		console.log('convoMessages========>', conversationMessages, messages)
		setMessages(conversationMessages.items)
		setLoading(false)
	}

	const handleJoinConversation = async (
		client,
		conversationSid,
		retryDelay
	) => {
		let existingConversation
		try {
			if (client) {
				existingConversation = await client.peekConversationBySid(
					conversationSid
				)
				setConversation(existingConversation)
			} else {
				// Handle the case when there is no client
			}

			if (existingConversation) {
				for (let attempt = 1; attempt <= 3; attempt++) {
					try {
						await existingConversation.join()
						// Fetch messages directly from the conversation
						const conversationMessages =
							await existingConversation.getMessages()
						setMessages(conversationMessages.items)
						setLoading(false)
						break
					} catch (e) {
						if (attempt < 3) {
							sleep(retryDelay)
						} else {
							throw e
						}
					}
				}
			} else {
				// Handle the case when there is no existing conversation
			}
		} catch (error) {
			console.error('Error joining conversation:', error)
		}
	}
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	useEffect(() => {
		// Scroll to the bottom when messages change
		if (scrollDiv.current) {
			scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight
		}
	}, [messages])

	const sendMessage = async () => {
		if (text) {
			setLoading(true)
			conversation && (await conversation.sendMessage(text))
			setText('')
			setLoading(false)
		}
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			
			sendMessage()
	
		}
	}

	const sendLink = () => {
		setText(link)

		sendMessage()

		setLink('')
	}

	useEffect(() => {
		sendLink()
	}, [link])

	return (
		<Container component="main" maxWidth="md" className="h-full">
			<Backdrop open={loading} style={{ zIndex: 99999 }}>
				<CircularProgress style={{ color: 'black' }} />
			</Backdrop>

			<div className="h-[90%] flex flex-col flex-wrap justify-end">
				<div className="h-[90%] overflow-y-scroll" ref={scrollDiv}>
					<List dense={true}>
						{messages &&
							messages.map((message, key) => (
								<ChatItem key={key} message={message} author={user.email} />
							))}
					</List>
				</div>

				<div className="py-auto h-[10%]">
					<div className="flex items-center justify-center py-2 pr-5 w-full flex-wrap">
						<div className="w-11/12 pr-2">
							<TextField
								required
								id="inputField"
								className="w-full p-1"
								placeholder="Enter message"
								variant="outlined"
								multiline
								rows={1}
								value={text}
								disabled={!conversation}
								onChange={(event) => setText(event.target.value)}
								onKeyDown={handleKeyPress}
							/>
						</div>
						<div className="w-1/12 p-1">
							<button
								className="w-full bg-sky-700 mx-auto rounded-full h-[2.5rem] text-center"
								onClick={sendMessage}
								disabled={!conversation || !text}
							>
								<Send style={styles.sendIcon} className="my-auto text-center" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

const styles = {
	textField: {
		width: '100%',
		borderWidth: 0,
		borderColor: 'transparent',
		padding: 0,
	},
	textFieldContainer: { flex: 1, marginRight: 5 },
	gridItem: { paddingTop: 12, paddingBottom: 12 },
	gridItemChatList: { overflow: 'scroll', height: '100%' },
	gridItemMessage: { marginTop: 0, marginBottom: 0 },
	sendIcon: { color: 'white', fontSize: '1.2rem ', textAlign: 'center' },
	mainGrid: { paddingTop: 0, height: '20%' },
}

export default NewChat
