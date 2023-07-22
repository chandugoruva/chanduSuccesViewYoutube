import {FaMoon} from 'react-icons/fa'
import {HeaderDiv, Image, Button} from './styledComponent'
import './index.css'
import PopupDesign from '../ReactPopUp'

const Header = () => (
  <HeaderDiv>
    <Image
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      alt="watch logo"
    />
    <div className="nav-items">
      <FaMoon className="icon1" />
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        alt="profile"
      />
      <PopupDesign />
    </div>
  </HeaderDiv>
)
export default Header
