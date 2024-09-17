import React from 'react'
import AppLogo from '../assets/logo-no-background.png'

const Logo = () => {
  return (
    <div>
      <img style={{
        width: '80px',
        height: '80px',
      }} src={AppLogo} 
       alt="" />
    </div>
  )
}

export default Logo