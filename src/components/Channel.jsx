import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import sweetAlert from 'sweetalert2';
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
  renameChannel = async () => {
    const { channel: { id }, renameChannel } = this.props;

    const { value } = await sweetAlert.fire({
      title: 'Rename channel',
      input: 'text',
      inputValidator: (inputValue) => {
        if (!inputValue) {
          return 'You need to write something!';
        }
        return '';
      },
      inputPlaceholder: 'Enter new name for the channel',
      showCancelButton: true,
      confirmButtonText: 'OK',
      showLoaderOnConfirm: true,
      preConfirm: async (newName) => {
        try {
          const response = await renameChannel(id, newName);
          if (response.status !== 204) {
            throw new Error(response.statusText);
          }
        } catch (error) {
          sweetAlert.showValidationMessage(
            `Request failed: ${error}`,
          );
        }
        return newName;
      },
      allowOutsideClick: () => !sweetAlert.isLoading(),
    });

    if (value) {
      sweetAlert.fire({
        position: 'center',
        type: 'success',
        title: `The name has been changed to "${value}"`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  deleteChannel = async () => {
    const {
      channel: { id, name },
      deleteChannel,
      generalChannel,
      changeCurrentChannel,
    } = this.props;

    const { value, dismiss } = await sweetAlert.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this channel!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await deleteChannel(id);
          if (response.status !== 204) {
            throw new Error(response.statusText);
          }
        } catch (error) {
          sweetAlert.showValidationMessage(
            `Request failed: ${error}`,
          );
        }
      },
      allowOutsideClick: () => !sweetAlert.isLoading(),
    });

    if (value) {
      changeCurrentChannel(generalChannel.id);
      sweetAlert.fire(
        'Deleted!',
        `Channel "${name}" has been deleted.`,
        'success',
      );
    } else if (dismiss === sweetAlert.DismissReason.cancel) {
      sweetAlert.fire(
        'Cancelled',
        `Channel "${name}" is safe :)`,
        'error',
      );
    }
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
