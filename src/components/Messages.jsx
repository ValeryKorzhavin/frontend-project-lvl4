import React from 'react';
import { createHash } from 'crypto';
import { messagesSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  render() {
    const { messages } = this.props;
    const list = messages.map(({
      author, message, id, time,
    }) => {
      const hash = createHash('md5').update(author).digest('hex');
      const avatarSize = 40;

      return (
        <div className="media mb-2" key={id}>
          <img
            src={`https://www.gravatar.com/avatar/${hash}?d=wavatar&s=${avatarSize}`}
            className="mr-2 rounded"
            alt="avatar"
          />
          <div className="media-body">
            <div className="mt-0">
              <b>
                {author}
              </b>
              <span className="text-muted" style={{ fontSize: 12 }}>
                {time}
              </span>
            </div>
            {message}
          </div>
        </div>
      );
    });
    return (
      <React.Fragment>
        {list}
      </React.Fragment>
    );
  }
}

export default Messages;
