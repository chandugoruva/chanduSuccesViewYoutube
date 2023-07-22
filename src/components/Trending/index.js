import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {MdHome, MdClose, MdSearch} from 'react-icons/md'
import {AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import YoutubeItem from '../YoutubeItem'
import {
  HomeDiv,
  OptionsDiv,
  Paragraph,
  ContactHeading,
  ImageLogo,
  ContactParagraph,
  PremiumDiv,
  BannerImage,
  BannerHeading,
  BannerButton,
  BannerCloseButton,
  InputSearch,
  SearchButton,
} from './styledComponent'
import Header from '../Header'
import './index.css'

const apiYoutube = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}
const Trending = () => {
  const [isBanner, setBanner] = useState(true)
  const [youtubeData, setYoutubeData] = useState()
  const [youtubeStatus, setYoutubeStatus] = useState(apiYoutube.initial)
  const [colors, setColors] = useState({
    home: false,
    trending: false,
    gaming: false,
    savedVideos: false,
  })
  const [trending, setYoutubeTrendingData] = useState()

  const [urls, setUrl] = useState('')
  const getYoutubeData = async () => {
    setYoutubeStatus(apiYoutube.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(formattedData)
      setYoutubeData(formattedData)
      setYoutubeStatus(apiYoutube.success)
    } else {
      setYoutubeStatus(apiYoutube.failure)
    }
  }

  const changeHome = () => {
    setColors(prevState => ({
      ...prevState,
      home: true,
      trending: false,
      gaming: false,
      savedVideos: false,
    }))
  }

  const changeTrending = () => {
    setColors(prevState => ({
      ...prevState,
      trending: true,
      home: false,
      gaming: false,
      savedVideos: false,
    }))
  }

  const changeGaming = () => {
    setColors(prevState => ({
      ...prevState,
      gaming: true,
      home: false,
      trending: false,
      savedVideos: false,
    }))
  }

  const changeSaved = () => {
    setColors(prevState => ({
      ...prevState,
      gaming: false,
      home: false,
      trending: false,
      savedVideos: true,
    }))
  }
  useEffect(() => {
    getYoutubeData()
    changeTrending()
  }, [urls])

  const getSuccessYoutubeData = () => (
    <ul className="ul">
      {youtubeData.map(each => (
        <YoutubeItem each={each} key={each.id} />
      ))}
    </ul>
  )
  const renderYoutube = () => {
    switch (youtubeStatus) {
      case apiYoutube.success:
        return getSuccessYoutubeData()
      default:
        return null
    }
  }
  const changeBanner = () => {
    setBanner(false)
  }
  const bannerSection = () => (
    <PremiumDiv>
      <div className="banner-flex">
        <BannerImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="watch logo"
        />
        <BannerCloseButton onClick={changeBanner}>
          <MdClose className="icon3" />
        </BannerCloseButton>
      </div>
      <BannerHeading>
        Buy Nxt Watch Premium prepaid plans With UPI
      </BannerHeading>
      <BannerButton>GET IT NOW</BannerButton>
    </PremiumDiv>
  )

  return (
    <Link to="/" className="link">
      <Header />
      <HomeDiv>
        <div className="options-div2">
          <div>
            <OptionsDiv onClick={changeHome}>
              {colors.home ? (
                <MdHome className="icon2 clicked-item" />
              ) : (
                <MdHome className="icon2" />
              )}

              <Paragraph>Home</Paragraph>
            </OptionsDiv>

            <OptionsDiv onClick={changeTrending}>
              {colors.trending ? (
                <AiTwotoneFire className="icon2 clicked-item" />
              ) : (
                <AiTwotoneFire className="icon2" />
              )}

              <Paragraph>Trending</Paragraph>
            </OptionsDiv>
            <Link to="/gaming-videos" className="link">
              <OptionsDiv onClick={changeGaming}>
                {colors.gaming ? (
                  <SiYoutubegaming className="icon2 clicked-item" />
                ) : (
                  <SiYoutubegaming className="icon2" />
                )}

                <Paragraph>Gaming</Paragraph>
              </OptionsDiv>
            </Link>
            <Link to="/saved-videos" className="li">
              <OptionsDiv onClick={changeSaved}>
                {colors.savedVideos ? (
                  <RiMenuAddFill className="icon2 clicked-item" />
                ) : (
                  <RiMenuAddFill className="icon2" />
                )}

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
          {isBanner && bannerSection()}
          <div className="youtube-div">
            <InputSearch placeholder="Search" />
            <SearchButton>
              <MdSearch className="icon4" />
            </SearchButton>
            {renderYoutube()}
          </div>
        </div>
      </HomeDiv>
    </Link>
  )
}
export default Trending
