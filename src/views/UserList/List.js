import React, { Component } from "react"
import CIcon from '@coreui/icons-react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { CButton, CModalHeader, CModalBody, CModalFooter, CModal } from '@coreui/react';
import '../pages/login/login.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
    }
  }
  render() {
    const { list, editUser, handleDeleting, toggle, modal } = this.props;
    return (
      <div className="container">
        <div className="row">
          <h2 className="col-9">User listing</h2>
          <div className="col-3 col-auto">
            <Link to="/register" className="col-sm-2 btn btn-success">ADD A NEW USER</Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Role for</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.data && list.data.length > 0 && list.data.map((value) => {
                return <tr key={value._id}>
                  <td>{value.name}</td>
                  <td>{value.role}</td>
                  <td>{value.email}</td>
                  <td>{moment(value.createdAt).format("MMM Do YY")}</td>
                  <td>{<><CButton type="submit" color="success" onClick={() => editUser(value._id)}>Edit</CButton>
                    &nbsp;<CButton click="warningModal = true" type="submit" className="bg-danger" onClick={() => toggle(value._id)}><CIcon name="cil-trash" /><i className="cil-trash"></i> Delete</CButton>
                  </>
                  }</td>
                </tr>
              })
            }
          </tbody>
        </table>
        <CModal show={modal} onClick={() => toggle()} >
          <CModalHeader className="p-3 mb-2 bg-warning text-white">Warning</CModalHeader>
          <CModalBody>Make sure that you want to delete</CModalBody>
          <CModalFooter>
            <CButton onClick={() => handleDeleting()} color="primary">Yes</CButton>{' '}
            <CButton color="secondary" onClick={this.toggle}>Cancel</CButton>
          </CModalFooter>
        </CModal>
      </div>
    )
  }
}
export default List