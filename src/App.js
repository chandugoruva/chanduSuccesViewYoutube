import './App.css'
import {Switch, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ClickedVideo from './components/ClickedVideo'
import ThemeContext from './context/ThemeContext'

// Replace your code here
const App = () => {
  const [savedVideos, setSavedVideos] = useState()
  const savedVideosButton = data => {
    setSavedVideos(data)
  }
  console.log(savedVideos, 'hiii')
  return (
    <ThemeContext.Provider
      value={{
        savedVideos,
        savedVideosButton,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/trending-videos" component={Trending} />
        <Route exact path="/gaming-videos" component={Gaming} />
        <Route exact path="/saved-videos" component={SavedVideos} />
        <Route exact path="/videos/:id" component={ClickedVideo} />
      </Switch>
    </ThemeContext.Provider>
  )
}

export default App
