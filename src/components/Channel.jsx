import React from 'react';
import connect from '../connect';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import DeleteChannelModal from './modals/DeleteChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';

const mapStateToProps = state => {
  const props = {
  };
  return props;
};

@connect(mapStateToProps)
export default class Channel extends React.Component {

  renameChannel = () => {
    const { showModal } = this.props;
    showModal({ renameChannel: true });
  };

  deleteChannel = () => {
    const { showModal } = this.props;
    showModal({ deleteChannel: true });
  };  

  render() {
    const { id, name, removable } = this.props.channel;

    return (
      <Nav.Item>
        <Nav.Link eventKey={id}>
          <Row>
            <Col>
              {name}
            </Col>
            <Col md="auto">
              {removable ? <FontAwesomeIcon icon={faTimesCircle} onClick={this.deleteChannel} className="mr-2" /> : null}
              <FontAwesomeIcon icon={faEdit} onClick={this.renameChannel} />  
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
    );
  }

};