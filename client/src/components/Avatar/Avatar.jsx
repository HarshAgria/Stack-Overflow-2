import React from 'react'

const Avatar = ({children, backgroundColor, px, py, color, borderRadius, fontSize, textAlign, cursor, backgroundImage }) => {
  const style ={
    backgroundColor,
    padding: `${py} ${px}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
    textDecoration: "none",
    backgroundImage: `url(${backgroundImage})`, // Set background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // borderRadius: round ? '50%' : borderRadius
  }

  

  
  return (
    <div style={style}>
      {backgroundImage ? null : children}
    </div>
  )
}

export default Avatar
