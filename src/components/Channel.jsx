import React from 'react';
import connect from '../connect';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { generalChannelSelector } from '../selectors';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const mapStateToProps = state => {
  const props = {
    generalChannel: generalChannelSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
export default class Channel extends React.Component {

  renameChannel = () => {
    const { channel: { id, name }, renameChannel } = this.props;

    Swal.fire({
      title: 'Rename channel',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      },
      inputPlaceholder: 'Enter new name for the channel',
      showCancelButton: true,
      confirmButtonText: 'OK',
      showLoaderOnConfirm: true,
      preConfirm: newName => renameChannel(id, newName).then(console.log),
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          type: 'success',
          title: `The name has been changed to "${result.value}"`,
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  };

  deleteChannel = () => {
    const { 
      channel: { id, name }, 
      deleteChannel, 
      generalChannel, 
      changeCurrentChannel,
    } = this.props;
    
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this channel!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => deleteChannel(id),
    })
    .then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          `Channel "${name}" has been deleted.`,
          'success'
        )
      changeCurrentChannel(generalChannel.id);  
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `Channel "${name}" is safe :)`,
          'error'
        )
      }
    });
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