import React from 'react'
import { CFooter } from '@coreui/react'
import { Link } from 'react-router-dom'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <Link to="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</Link>
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <Link to="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</Link>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
