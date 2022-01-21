import React from 'react'

// Styles
import styled from 'styled-components';

// Loaders
import TitleLoader from './TitleLoader'
import SubtitleLoader from './SubtitleLoader'
import ImageLoader from './ImageLoader'

// Routes
import { Link } from "react-router-dom";

function Card({ news, pathname, loading = false, styles, stylesImage, sizeLoader = 'middle', stylesTitle, isError, imageWidth, imageHeight }) {


  const handleSizeLoader = () => {
    if (sizeLoader === 'big') {
      return (
        <ImageLoader data-testid="image-loader" height='370px' width='100%' />
      )
    } else if (sizeLoader === 'small') {
      return (
        <ImageLoader data-testid="image-loader" height='170px' width='100%' />
      )
    } else {
      return (
        <ImageLoader data-testid="image-loader" height='240px' width='100%' />
      )
    }
  }

  const sourceImage = () => {
    // image link to be attached will be different depending on the request
    // if the information comes from 'home' (top stories) then the img has the full url to the image
    // if the information comes from 'section' (article) then the img hasn't the full url and we need to add  https://www.nytimes.com/
    // if the new doesn't have multimedia, then we render a default image of The New York Time
    if (!news?.multimedia) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/1125px-New_York_Times_logo_variation.jpg'
    }
    if (news?.multimedia.length === 0) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/1125px-New_York_Times_logo_variation.jpg'
    }
    if (news?.multimedia[0]?.url.includes('http')) {
      return `${news?.multimedia[0]?.url}`
    } else if (!news?.multimedia[0]?.url.includes('http')) {
      return `https://www.nytimes.com/${news?.multimedia[0]?.url}`
    } else {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_York_Times_logo_variation.jpg/1125px-New_York_Times_logo_variation.jpg'
    }
  }

  return (
    <CardContainer className="card__container" style={{ ...styles }}>
      {
        loading ?
          <>
            <TextLoader>
              <TitleLoader data-testid="title-loader" />
              <SubtitleLoader data-testid="subtitle-loader" />
            </TextLoader>
            <ImageLoaderContainer>
              {handleSizeLoader()}
            </ImageLoaderContainer>
          </>
          :
          <>
            <Link
              // Remove all special characters and encode url
              to={`/news/${news?.title ? encodeURI(news?.title?.replace(/[^\w\s]/gi, '')) : encodeURI(news?.headline?.main?.replace(/[^\w\s]/gi, ''))}`}
              state={{ from: pathname, news }}
              style={{ width: '100%', height: 'max-content' }}
            >
              <Text>
                <Title style={{ ...stylesTitle }}>{news?.headline?.main || news?.title}{isError && 'No title found'}</Title>
                <Subtitle>{news?.snippet || news?.abstract}{isError && 'No description found'}</Subtitle>
              </Text>
            </Link>
            <Image
              loading="lazy"
              decoding="async"
              style={{ ...stylesImage }}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              src={sourceImage()}
            />
          </>
      }
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 15px;
  width: 400px;

  @media (max-width: 780px) {
    width: 100% !important;
    height: auto !important;
    flex-direction: column-reverse !important;
  }
`

const Image = styled.img`
    width: ${({ imageWidth }) => imageWidth ? imageWidth : ''};
    height: ${({ imageHeight }) => imageHeight ? imageHeight : ''};
    object-fit: cover;
    min-width: 208px;
    padding: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    @media (max-width: 780px) {
      width: 100%;
      height: auto;
    }
`

const ImageLoaderContainer = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px;
`

const Text = styled.div`
    height: 100%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const TextLoader = styled.div`
    height: 100%;
    min-width: 55%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 40px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`

const Title = styled.h2`
    width: 100%;
    text-align: initial;
    padding-top: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    margin: 0 0 10px;
    font-size: 24px;
    line-height: 28px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 780px) {
      -webkit-line-clamp: 4;
    }
`

const Subtitle = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 35px;
`

export default React.memo(Card)
