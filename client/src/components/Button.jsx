import React from 'react'

function Button({icon, btn_title, action, act_arg1, act_arg2}) {
  return (
    <div className='like-icon' onClick={() => action(act_arg1, act_arg2)}>{icon} {btn_title}</div>
  )
}

export default Button;
