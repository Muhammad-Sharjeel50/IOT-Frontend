import { ListItem } from '@mui/material';
import React from 'react';

const ChatItem = ({ message, author }) => {
  const isOwnMessage = message.author === author;

  return (
    <ListItem style={styles.listItem(isOwnMessage)}>
      <div style={styles.author}>{message.author}</div>
      <div style={styles.container(isOwnMessage)} className=" py-2 px-5 overflow-x-hidden h-auto">
        {message.body}
        <div style={styles.timestamp}>
          {new Date(message.dateCreated?.toISOString()).toLocaleString()}
        </div>
      </div>
    </ListItem>
  );
};

const styles = {

  listItem: (isOwnMessage) => ({

    flexDirection: 'column',
    alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
    height: '100%'

  }),
  container: (isOwnMessage) => ({
    maxWidth: '75%',
    height: 'auto',
    borderRadius: 12,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
    color: 'white',
    fontSize: 12,
    backgroundColor: isOwnMessage ? '#0284C7' : '#375e66',

  }),
  author: { fontSize: 10, color: 'gray' },
  timestamp: { fontSize: 8, color: 'white', textAlign: 'right', paddingTop: 4 },
};

export default ChatItem;
