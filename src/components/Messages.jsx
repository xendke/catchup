import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import './Messages.css';

const Messages = (props) => {
  const messageFromSelf = (message) => (message.align === "right");

  return (
    <Segment.Group>
      { 
        props.messages.map((message) =>
          (
            <Segment size='small' key={message.key} textAlign={message.align}>
              {
                messageFromSelf(message)
                  ? null
                  : (
                    <div>
                      <Icon name='user circle' style={{color: 'red'}}/>
                      <span className="username">{message.data.username || message.data.uid}</span>
                    </div> 
                  )
              }
              <p className={`${messageFromSelf(message) ? 'message-self' : 'message'}`}>
                { message.data.text }
              </p>
              { messageFromSelf(message) ? (<Icon size='large' name='chevron left'/>) : null }
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