import React, { Component } from 'react';
import {removingItem} from '../common/localStorage';
// import { Link ,useHistory} from "react-router-dom";
import { withRouter } from 'react-router';

import {
  CButton,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
class TheHeaderDropdown extends Component{
  constructor(){
    super()
    this.state={
    }
  }
  
logOutHeader=()=>{
    removingItem('user');
    window.location.href = '/'
  }
render(){
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CButton>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CButton onClick={()=>this.logOutHeader()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log out
        </CButton>
      </CDropdownMenu>
      </CButton>
    </CDropdown>
  )

}
}


export default withRouter(TheHeaderDropdown)

