import React from 'react'

const Avatar = ({children, backgroundColor, px, py, color, borderRadius, fontSize, textAlign, cursor, imageUrl }) => {
  const style ={
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
    backgroundImage: `url(${imageUrl})`, // Set background image
    backgroundSize: 'cover',
    backgroundPosition: 'center'
    // borderRadius: round ? '50%' : borderRadius
  }

  

  
  return (
    <div style={style}>
      { children }
    </div>
  )
}

export default Avatar
