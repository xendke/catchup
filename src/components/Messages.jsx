import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

const Messages = (props) => (
  <Segment.Group>
    { 
    	props.messages.map((message) =>
        (
          <Segment size='small' key={message.key} textAlign={message.align}>
            {
              message.align === "left"
                ? (
                  <div>
                    <Icon size='large' name='user circle' />
                    {message.data.username || message.data.uid}
                  </div> 
                ) : null
            }
            { message.data.text }
            { message.align === "left" ? null : (<Icon size='large' name='chevron left'/>) }
          </Segment>
        )
      )
    }
  </Segment.Group>
)

Messages.defaultProps = {
  messages: []
};

export default Messages;