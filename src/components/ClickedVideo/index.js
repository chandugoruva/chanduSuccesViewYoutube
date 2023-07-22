import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {MdHome, MdSearch} from 'react-icons/md'
import {AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import ThemeContext from '../../context/ThemeContext'
import {
  HomeDiv,
  OptionsDiv,
  Paragraph,
  ContactHeading,
  ImageLogo,
  ContactParagraph,
  InputSearch,
  SearchButton,
  LikeButton,
  UnlikeButton,
  SaveButton,
} from './styledComponent'
import Header from '../Header'
import './index.css'

const apiClicked = {
  initial: 'INITIAL',
  loading: 'LOADING',
  hi: 'HI',
  hello: 'HELLO',
  hii: 'HII',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const ClickedVideo = props => {
  const [ClickedVideoData, setClickedVideo] = useState()
  const [clickedStatus, setApiStatus] = useState(apiClicked.initial)
  const [likeButton, setLike] = useState(false)
  const [unlikeButton, setUnlike] = useState(false)
  const [saveButton, setSave] = useState(false)
  const getClickedYoutubeData = async () => {
    setApiStatus(apiClicked.loading)
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
      }
      console.log(data)
      console.log(formattedData)
      setClickedVideo(formattedData)
      setApiStatus(apiClicked.success)
    }
  }
  console.log(saveButton)
  const likeClicked = () => {
    setLike(prevState => !prevState)
    setUnlike(false)
  }
  const unlikeClicked = () => {
    setUnlike(prevState => !prevState)
    setLike(false)
  }

  const getClickedSuccessData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {savedVideosButton} = value
        const savedClicked = () => {
          setSave(prevState => !prevState)
          savedVideosButton(ClickedVideoData)
        }
        return (
          <>
            <ReactPlayer
              url={ClickedVideoData.videoUrl}
              width="900px"
              height="460px"
            />
            <p className="profile-title">{ClickedVideoData.title}</p>
            <div className="options-like">
              <div className="flex">
                <p className="view-count">{ClickedVideoData.viewCount} views</p>
                <p className="li published">
                  &#8226;{' '}
                  {formatDistanceToNow(new Date(ClickedVideoData.publishedAt))}
                </p>
              </div>

              <div className="like-main-div">
                <LikeButton likeButton={likeButton} onClick={likeClicked}>
                  <BiLike className="icon-like" />
                  <p className="like">Like</p>
                </LikeButton>
                <UnlikeButton
                  unlikeButton={unlikeButton}
                  onClick={unlikeClicked}
                >
                  <BiDislike className="icon-like" />
                  <p className="like">Dislike</p>
                </UnlikeButton>
                <SaveButton saveButton={saveButton} onClick={savedClicked}>
                  <RiMenuAddFill className="icon-like" />
                  <p className="like">Save</p>
                </SaveButton>
              </div>
            </div>
            <hr />
            <div className="channel-div">
              <img
                src={ClickedVideoData.channel.profileImageUrl}
                alt="profile"
                className="profile-image"
              />
              <div>
                <p className="channel-name">{ClickedVideoData.channel.name}</p>
                <p className="subscriber-count">
                  {ClickedVideoData.channel.subscriberCount}
                </p>
                <p className="description">{ClickedVideoData.description}</p>
              </div>
            </div>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  const clickedLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  const renderClicked = () => {
    switch (clickedStatus) {
      case apiClicked.success:
        return getClickedSuccessData()
      case apiClicked.loading:
        return clickedLoadingView()
      default:
        return null
    }
  }
  useEffect(() => {
    getClickedYoutubeData()
  }, [])
  return (
    <>
      <Header />
      <HomeDiv>
        <div className="options-div1">
          <div>
            <Link to="/" className="li">
              <OptionsDiv>
                <MdHome className="icon2" />
                <Paragraph className="clicked-option">Home</Paragraph>
              </OptionsDiv>
            </Link>
            <Link to="/trending-videos" className="li">
              <OptionsDiv>
                <AiTwotoneFire className="icon2" />

                <Paragraph>Trending</Paragraph>
              </OptionsDiv>
            </Link>
            <Link to="/gaming-videos" className="li">
              <OptionsDiv>
                <SiYoutubegaming className="icon2" />

                <Paragraph>Gaming</Paragraph>
              </OptionsDiv>
            </Link>
            <Link to="/saved-videos" className="li">
              <OptionsDiv>
                <RiMenuAddFill className="icon2" />

                <Paragraph>Saved videos</Paragraph>
              </OptionsDiv>
            </Link>
          </div>

          <div>
            <ContactHeading>CONTACT US</ContactHeading>
            <ImageLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <ImageLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <ImageLogo
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
            <ContactParagraph>
              Enjoy! Now to see your channels and recommendations!
            </ContactParagraph>
          </div>
        </div>
        <div>
          <div className="youtube-div1">{renderClicked()}</div>
        </div>
      </HomeDiv>
    </>
  )
}
export default ClickedVideo
