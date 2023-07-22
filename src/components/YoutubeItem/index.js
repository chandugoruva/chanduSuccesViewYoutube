import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

const YoutubeItem = props => {
  const {each} = props

  return (
    <Link to={`/videos/${each.id}`} className="li">
      <div className="youtube-item-div">
        <img
          src={each.thumbnailUrl}
          alt="thumbnail"
          className="thumbnail-image"
        />
        <br />
        <div className="profile-div">
          <img
            src={each.channel.profileImageUrl}
            alt="profile"
            className="profile"
          />
          <div>
            <p className="title">{each.title}</p>
            <p className="channel-name">{each.channel.name}</p>
            <div className="flex">
              <p className="view-count1">{each.viewCount} views</p>
              <li className="li published">
                {formatDistanceToNow(new Date(each.publishedAt))}
              </li>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default YoutubeItem
