import { Button } from 'antd'
import React, { JSX } from 'react'

const NewWindow = (props: { onUnload: () => void, title: string }): JSX.Element => {

  const { onUnload, title } = props

  return <div className="popout-mock">
    <div>
      Title: {title}
    </div>
    <div>
      <Button onClick={onUnload}>{'onUnload'}</Button>
    </div>
  </div>
}

export default NewWindow
