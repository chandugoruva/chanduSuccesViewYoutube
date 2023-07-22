import React from 'react'

const ThemeContext = React.createContext({
  savedVideos: [],
  savedVideosButton: () => {},
})
export default ThemeContext
