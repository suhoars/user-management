import React, { Component } from "react"
import { CButton, CModalHeader, CModalBody, CModalFooter, CModal } from '@coreui/react';

class List extends Component{
  constructor(props) {
    super(props);
    this.state = {
        list:'',
    }
  }
  render() {
  const {handleDeleting,toggle, modal}=this.props
  return (
    <CModal show={modal} onClick={() => toggle()} >
        <CModalHeader className="p-3 mb-2 bg-warning text-white">Warning</CModalHeader>
        <CModalBody>Make sure that you want to delete</CModalBody>
        <CModalFooter>
            <CButton onClick={() => handleDeleting()} color="primary">Yes</CButton>{' '}
            <CButton color="secondary" onClick={this.toggle}>Cancel</CButton>
        </CModalFooter>
    </CModal>

  )}
}
export default List
