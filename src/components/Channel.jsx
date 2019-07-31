import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { generalChannelSelector } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    generalChannel: generalChannelSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
class Channel extends React.Component {
  renameChannel = () => {
    const { showModal } = this.props;
    showModal({ renameChannel: true });
  };

  deleteChannel = () => {
    const { showModal } = this.props;
    showModal({ removeChannel: true });
  };

  render() {
    const { channel: { id, name, removable } } = this.props;

    return (
      <Nav.Item>
        <Nav.Link eventKey={id}>
          <Row>
            <Col>
              {name}
            </Col>
            <Col md="auto">
              {removable && <FontAwesomeIcon icon={faTimesCircle} onClick={this.deleteChannel} className="mr-2" />}
              <FontAwesomeIcon icon={faEdit} onClick={this.renameChannel} />
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
    );
  }
}

export default Channel;
