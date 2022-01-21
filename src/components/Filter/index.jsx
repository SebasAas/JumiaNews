import React from 'react'
// Styles
import styled from 'styled-components';

function Filter({ setSortBy, setPage }) {

  const handleFilter = (e) => {
    setPage(1)
    setSortBy(e.target.value)
  }

  return (
    <FilterContainer>
      <SelectCont onChange={(e) => handleFilter(e)}>
        <Option value="relevance" defaultValue>Relevance</Option>
        <Option value="newest">Newest</Option>
        <Option value="oldest">Oldest</Option>
      </SelectCont>
    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  position: absolute;
  top: 5px;
  width: 87%;
  display: flex;
  justify-content: end;

  @media (max-width: 920px) {
    position: initial;
  }
`

const SelectCont = styled.select`
  position: relative;
  display: flex;
  width: 12em;
  height: 3em;
  padding: 10px;
  border-radius: .25em;
  overflow: hidden;
`

const Option = styled.option`
  color: #1a1a1a;
`

export default Filter
