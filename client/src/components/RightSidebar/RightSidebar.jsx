import React from 'react'

import './RightSidebar.css'
import Widget from './Widget.jsx'
import WidgetTags from './WidgetTags.jsx'

const RightSlidebar = () => {
  return (
    <aside className='right-sidebar'>
      <Widget/>
      <WidgetTags/>
    </aside>
  )
}

export default RightSlidebar
