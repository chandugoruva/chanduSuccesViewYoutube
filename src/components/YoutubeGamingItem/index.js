import './index.css'
import {Link} from 'react-router-dom'

const YoutubeGamingItem = props => {
  const {each} = props
  return (
    <Link to={`/videos/${each.id}`} className="li">
      <div className="youtube-gaming">
        <img src={each.thumbnailUrl} alt="thumbnail" className="gaming-image" />
        <p className="gaming-title">{each.title}</p>
        <p className="view-count">{each.viewCount} Watching Worldwide</p>
      </div>
    </Link>
  )
}
export default YoutubeGamingItem
