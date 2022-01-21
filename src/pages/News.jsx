import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"

// Components
import Card from '../components/Card/index.jsx';

// Utils
import scrollToTop from '../utils/scrollToTop';

// Queries
import { useQuery } from 'react-query'
import { getCategoryByTerm } from '../queries'

// Styles
import styled from 'styled-components';
import { primaryOrange, white } from '../theme/colors.js'

function News() {
  const { state } = useLocation();
  const [relatedCard] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [url, setUrl] = useState(() => news?.section || news?.section_name);
  const news = state?.news || [];



  const { data, error, isLoading, isError, refetch } = useQuery([1, url, 'relevance'], getCategoryByTerm, {
    keepPreviousData: true,
  })

  useEffect(() => {
    scrollToTop()
    refetch()
  }, [])

  useEffect(() => {
    setUrl(news?.section || news?.section_name)
  }, [])

  const sourceImage = () => {
    // image link to be attached will be different depending on the request
    // if the information comes from 'home' (top stories) then the img has the full url to the image
    // if the information comes from 'section' (article) then the img hasn't the full url and we need to add  https://www.nytimes.com/
    // if the new doesn't have multimedia, then we render a default image of The New York Time
    if (!news?.multimedia) {
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
    <ContainerNews>
      {news?.length === 0 ?
        <h1>No News Available</h1>
        :
        <>
          <InformationNew>
            <TitleNew>{news?.headline?.main || news?.title || 'No title found'}</TitleNew>
            <Image
              loading="lazy"
              imageWidth="100%"
              imageHeight="380px"
              decoding="async"
              src={sourceImage()}
              alt={news?.multimedia[0]?.caption || ''}
            />
            <ImageInfo>{news?.snippet || news?.abstract || ''}</ImageInfo>
            <Paragraph>{news?.lead_paragraph}</Paragraph>
            <cite>{news?.source ? `By ${news?.source}` : news?.byline}</cite>
            <ContainerLinkArticle>
              <Link href={news?.web_url || news?.short_url}>Read full article</Link>
            </ContainerLinkArticle>
          </InformationNew>
          <ContainerRelatedNews className='relatednew__container'>
            <TitleRelatedNew>Related News</TitleRelatedNew>
            <RelatedNewsCards>
              {
                relatedCard.map((i, card) => (
                  <Card
                    key={i}
                    loading={isLoading}
                    news={data?.response?.docs[card]}
                    origin='section'
                    sizeLoader='small'
                    isError={isError}
                    stylesImage={{ maxHeight: '230px' }}
                  />
                ))
              }
            </RelatedNewsCards>
          </ContainerRelatedNews>
        </>
      }
    </ContainerNews>

  )
}

const ContainerNews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InformationNew = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 190px;
  
  @media (max-width: 680px) {
    padding: 0px 10px;
  }
`

const TitleNew = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 54px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  margin-bottom: 15px;

  @media (max-width: 1080px) {
    font-size: 22px;
    line-height: 28px;
  }
`

const TitleRelatedNew = styled.h1`
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 2.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  padding-top: 10px;

  &:after {
    content: '';
    position: absolute;
    top: 0; 
    right: 0; 
    left: 0; 
    margin-left: auto; 
    margin-right: auto;
    width: 8%;
    height: 3px;
    background-color: ${primaryOrange};
    border-radius: 2px;
  }
`

const ImageInfo = styled.figcaption`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  letter-spacing: 0.05em;
  margin: 5px 0px 30px;
`

const Link = styled.a`
  background: ${primaryOrange};
  padding: 15px;
  color: ${white};
  border-radius: 3px;
  cursor: pointer;
`

const Paragraph = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  text-align: justify;
  letter-spacing: 0.05em;
  margin: 0px 0px 15px 0;
`

const Image = styled.img`
    width: ${({ imageWidth }) => imageWidth ? imageWidth : ''};
    height: ${({ imageHeight }) => imageHeight ? imageHeight : ''};
    object-fit: cover;
    min-width: 208px;
    padding: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    @media (max-width: 680px) {
      width: 100%;
      height: auto;
    }
`

const ContainerLinkArticle = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 90px;
`

const ContainerRelatedNews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 60px;
  padding: 40px 0;
`

const RelatedNewsCards = styled.div`
  display: flex;
  overflow: scroll;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 7px;
}
 &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
}
`

export default News
