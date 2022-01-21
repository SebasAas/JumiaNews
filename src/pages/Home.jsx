import React, { useState, useEffect } from 'react'

// Components
import Card from '../components/Card'
import List from '../components/List';

// Utils
import scrollToTop from '../utils/scrollToTop';

// Queries
import { useQuery } from 'react-query'
import { getTopStories, getSection } from '../queries'

// Styles
import styled from 'styled-components';
import { primaryOrange, white } from '../theme/colors.js'

function Home() {
  // The initial value is 12 because the four first news are in banner highlight
  const [limitTopNews, setLimitTopNews] = useState(12);
  const [limitSectionNews, setLimitSectionNews] = useState(6);
  // Array with top news
  const [dataTopNews, setDataTopNews] = useState([]);
  // Array with section news
  const [dataCategory, setDataCategory] = useState([]);
  // Section selected
  const [fetchSection, setFetchSection] = useState('sports');

  const { data: dataHome,
    error: errorDataHome,
    isLoading: isLoadingDataHome,
    isError: isErrorDataHome } = useQuery('home', getTopStories, {
      // keepPreviousData: true,
      onSuccess: (data) => {
        setDataTopNews(data.results)
        setLimitTopNews(12)
      }
    })

  const { data: dataSection,
    error: errorDataSection,
    isLoading: isLoadingDataSection,
    isError: isErrorDataSection,
    refetch } = useQuery(fetchSection, getSection, {
      onSuccess: (data) => {
        setDataCategory(data.results)
        setLimitSectionNews(6)
      }
    })

  useEffect(() => {
    if (fetchSection) {
      refetch()
    }
  }, [fetchSection])

  useEffect(() => {
    scrollToTop()
  }, [])

  const stylesBigBanner = {
    width: '100%',
    margin: '0',
    padding: '0',
    flexDirection: 'column-reverse',
  }

  const stylesSmallBanner = {
    width: '100%',
    height: '10.625rem',
    margin: '0',
    padding: '0',
    flexDirection: 'row-reverse',
    overflow: 'hidden',
  }

  const stylesSmallTopNew = {
    width: '45%',
    height: '10.625rem',
    margin: '1rem',
    padding: '0',
    flexDirection: 'row-reverse',
    overflow: 'hidden'
  }

  const stylesSection = {
    width: '23.125rem',
    height: 'fit-content',
    maxHeight: '23.437rem',
    overflow: 'hidden'
  }

  const stylesImageBanner = {
    objectFit: 'fill',
  }

  const handleShowMoreTopNews = () => {
    // Show 8 more news
    setLimitTopNews(prev => prev + 8)
  }

  const showTopNews = () => {
    // show 8 news per page
    if (dataTopNews.length > 0) {
      return (
        dataTopNews?.slice(4, limitTopNews)?.map((story, i) => (
          <Card key={story.uri}
            imageWidth='40%'
            loading={isLoadingDataSection && dataTopNews.length === 0}
            news={story}
            origin='home'
            isError={isErrorDataHome}
            styles={stylesSmallTopNew}
            sizeLoader='small' />
        ))
      )
    } else if (isErrorDataHome) {
      return <p>Oh! {errorDataHome.message}</p>
    } else {
      // If data doesn't exist yet, return loader
      return (
        [0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <Card key={i}
            imageWidth='40%'
            loading={true}
            origin='home'
            styles={stylesSmallTopNew}
            isError={isErrorDataHome}
            sizeLoader='small' />
        ))
      )
    }
  }

  const showSection = () => {
    // show 8 news per page
    if (dataCategory.length > 0) {
      return (
        dataCategory?.slice(limitSectionNews - 6, limitSectionNews)?.map((story, i) => (
          <Card key={story.uri}
            loading={isLoadingDataSection}
            styles={stylesSection}
            imageHeight='40%'
            news={story}
            isError={isErrorDataSection}
            origin='home'
            sizeLoader='small' />
        ))
      )
    } else if (isErrorDataSection) {
      return <p>Oh! {errorDataSection.message}</p>
    } else {
      // If data doesn't exist yet, return loader
      return (
        [0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <Card key={i}
            loading={true}
            styles={stylesSection}
            isError={isErrorDataSection}
            imageHeight='40%'
            origin='home'
            sizeLoader='small' />
        ))
      )
    }
  }

  const showThreeHighlight = () => {
    // show 8 news per page
    if (dataTopNews.length > 0) {
      return (
        dataTopNews?.slice(1, 4)?.map((story, i) => (
          <div key={i} style={{ marginBottom: '30px' }} >
            <Card
              loading={isLoadingDataHome}
              news={story}
              origin='home'
              styles={stylesSmallBanner}
              isError={isErrorDataHome}
              sizeLoader='small'
            />
          </div>
        ))
      )
    } else if (isErrorDataHome) {
      return <p>Oh! {errorDataHome.message}</p>
    } else {
      // If data doesn't exist yet, return loader
      return (
        [0, 1, 2].map((_, i) => (
          <div key={i} style={{ marginBottom: '30px' }} >
            <Card
              key={i}
              loading={true}
              styles={stylesSmallBanner}
              isError={isErrorDataHome}
              imageHeight='40%'
              origin='home'
              sizeLoader='small'
            />
          </div>
        ))
      )
    }
  }

  return (
    <HomeContainer>
      {/* 
      *
      * Highlight News Section 
      * 
      * */}
      <HighlightContainer data-cy="highlight-news">
        <BigNewContainer>
          <Card
            news={dataTopNews[0]}
            origin='home'
            loading={isLoadingDataHome}
            styles={stylesBigBanner}
            imageHeight='23.75rem'
            stylesImage={stylesImageBanner}
            isError={isErrorDataHome}
            sizeLoader='big'
          />
        </BigNewContainer>
        <SmallNewContainer>
          {showThreeHighlight()}
        </SmallNewContainer>
      </HighlightContainer>
      {/* 
      *
      * Top News Section
      * 
      * */}
      <TopNewsContainer data-cy="top-news" className="topnew__container">
        <Title>Top News</Title>
        <div className='flex justify-around flex-wrap w-100 mt4'>
          {showTopNews()}
        </div>
        <div>
          <Button onClick={() => handleShowMoreTopNews()}>See more</Button>
        </div>
      </TopNewsContainer>
      {/* 
      *
      * Categories Section
      * 
      * */}
      <SectionNewsContainer data-cy="section-news">
        <Title>Section News</Title>
        <Container>
          <ListContainer className="w-10-ns w-30-m w-100 overflow-hidden pl1 pl2-ns" >
            {/* List of options */}
            <List getNewSection={setFetchSection} />
          </ListContainer>
          <div className='flex flex-wrap justify-center w-90-ns w-100'>
            <div className='flex flex-wrap justify-center w-100' style={{ minHeight: '850px' }}>
              {/* List of news by section */}
              {showSection()}
            </div>
            <div>
              <Button className="mr2" disabled={limitSectionNews <= 6} onClick={() => setLimitSectionNews(prev => prev - 6)}>Back</Button>
              <Button className="ml2" disabled={limitSectionNews >= dataCategory?.length} onClick={() => setLimitSectionNews(prev => prev + 6)}>Forward</Button>
            </div>
          </div>
        </Container>
      </SectionNewsContainer>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

const HighlightContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

const BigNewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 50%;
  padding: 10px 15px;

  @media (max-width: 1080px) {
    width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 10px 0px;
  }
`

const SmallNewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px 15px;
  
  @media (max-width: 1080px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 10px 0px;
  }
`

const ListContainer = styled.div`
  @media (max-width: 480px) {
    padding: 10px 0px;
  }
`

const TopNewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  padding: 2.25rem 0;
`

const SectionNewsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 2.25rem 0;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 400px;
  padding-top: 30px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`

const Title = styled.h1`
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 2.1rem;
  display: flex;
  align-items: center;
  text-align: center;
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
    width: 15%;
    height: 3px;
    background-color: ${primaryOrange};
    border-radius: 2px;
  }
`

const Button = styled.button`
  background: ${primaryOrange};
  margin-top: 20px;
  padding: 12px 28px;
  color: ${white};
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.825rem;

  &:disabled {
    background: #e5d1ba;
  }
`


export default Home
