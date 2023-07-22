import {Link, Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {
  LoginDiv,
  LoginSubDiv,
  LoginImage,
  Input,
  Label,
  InputCheck,
  InputLabel,
  LoginButton,
  ErrorMsg,
} from './styledComponent'
import './index.css'

const Login = props => {
  const [username, setUser] = useState()
  const [password, setPassword] = useState()
  const [isError, setError] = useState(false)
  const [error, setErrorMsg] = useState()
  const changeUsername = event => {
    setUser(event.target.value)
  }
  const changePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setError(true)
    setErrorMsg(errorMsg)
  }

  const onShowPasswordsClicked = () => {
    const passwordEl = document.getElementById('password')
    if (passwordEl.type === 'password') {
      passwordEl.type = 'text'
    } else {
      passwordEl.type = 'password'
    }
  }

  const onSubmitData = async event => {
    event.preventDefault()
    console.log('hiiiii')
    const userData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <Link to="/login" className="li">
      <LoginDiv>
        <LoginSubDiv>
          <LoginImage
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="watch logo"
          />
          <form>
            <br />
            <Label htmlFor="username">USERNAME</Label>
            <br />
            <Input
              placeholder="Username"
              id="username"
              type="text"
              onChange={changeUsername}
            />
            <br />
            <Label htmlFor="password">PASSWORD</Label>
            <br />
            <Input
              placeholder="Password"
              id="password"
              type="password"
              onChange={changePassword}
            />
            <br />
            <input
              type="checkbox"
              id="checkbox"
              onClick={onShowPasswordsClicked}
            />
            <InputLabel htmlFor="checkbox">Show Password</InputLabel>
            <br />
            <LoginButton type="submit" onClick={onSubmitData}>
              Login
            </LoginButton>
            {isError && <ErrorMsg>{error}</ErrorMsg>}
          </form>
        </LoginSubDiv>
      </LoginDiv>
    </Link>
  )
}
export default Login
