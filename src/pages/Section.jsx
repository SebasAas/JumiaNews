import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

// Components
import Pagination from '../components/Pagination';
import Filter from '../components/Filter';
import Card from '../components/Card';

// Utils
import scrollToTop from '../utils/scrollToTop';

// Queries
import { useQuery } from 'react-query'
import { getCategoryByTerm } from '../queries'

// Styles
import styled from 'styled-components';
import { primaryOrange } from '../theme/colors.js'

function Section() {
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const [termToSearch, setTermToSearch] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [pagesLoader] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const { data, error, isLoading, isError, refetch } = useQuery([page, termToSearch, sortBy], getCategoryByTerm, {
    enabled: false
  })

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    setTermToSearch(decodeURIComponent(pathname?.split('/')[2]))
    if (termToSearch) {
      refetch()
    }
  }, [page, termToSearch, sortBy, pathname])

  const listNews = () => {
    const stylesImage = {
      maxHeight: '250px'
    }

    // If is loading return Loader
    if (isLoading) {
      return (
        pagesLoader.map((_, i) => (
          <div key={i}>
            <Card loading={true} stylesImage={stylesImage} origin="section" />
          </div>
        ))
      )
    }

    // If is error return message
    if (isError) {
      return (
        <div>Error... {error.message}</div>
      )
    }

    const stylesTitle = {
      width: '90%',
      textAlign: 'center'
    }

    // if fetch status 200 and brought information 
    if (data?.response?.docs.length > 0) {
      return (
        data?.response?.docs?.map(news => (
          <div key={news._id}>
            <Card news={news} stylesImage={stylesImage} stylesTitle={stylesTitle} origin='section' />
          </div>
        ))
      )
    } else if (data?.response?.docs.length === 0 && !isLoading) {
      // if fetch status 200 and no news was found
      return (
        <h1>No result found</h1>
      )
    }
  }



  return (
    <SectionContainer data-cy="section-search">
      <Title>{termToSearch} NEWS</Title>
      <Filter setSortBy={setSortBy} setPage={setPage} />
      <div className='flex flex-wrap justify-center min-vh-100'>
        {listNews()}
      </div>
      {
        data?.response?.docs.length > 0 ?
          // If exist news then render the pagination component
          <Pagination setPage={setPage} page={page} hits={data?.response?.meta?.hits} />
          :
          false
      }
    </SectionContainer>
  )
}

const SectionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Title = styled.h1`
  position: relative;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 2.25rem;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1.875rem;
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

export default Section
