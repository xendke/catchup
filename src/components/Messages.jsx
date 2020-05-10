import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import './Messages.css';

const Messages = (props) => {
  const messageFromSelf = (message) => (message.align === "left");

  return (
    <Segment.Group>
      { 
        props.messages.map((message) =>
          (
            <Segment size='small' key={message.key} textAlign={message.align}>
              {
                messageFromSelf(message)
                  ? (
                    <div>
                      <Icon name='user circle' style={{color: 'red'}}/>
                      <span className="username">{message.data.username || message.data.uid}</span>
                    </div> 
                  ) : null
              }
              <p className={`${messageFromSelf(message) ? 'message' : 'message-self'}`}>
                { message.data.text }
              </p>
              { messageFromSelf(message) ? null : (<Icon size='large' name='chevron left'/>) }
            </Segment>
          )
        )
      }
    </Segment.Group>
  )
}

Messages.defaultProps = {
  messages: []
};

export default Messages;