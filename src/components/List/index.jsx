import React, { useState, memo } from 'react'
import { useInView } from 'react-intersection-observer';

// Styles
import styled from 'styled-components';
import { primaryOrange } from '../../theme/colors.js'

function List({ getNewSection }) {
  const [optionSelected, setOptionSelected] = useState('Sports');

  const [sections] = useState([
    'Sports',
    'Politics',
    'Health',
    'Technology',
    'World',
    'Business',
    'Magazine',
  ]);

  const handleChangeSection = (section) => {
    setOptionSelected(`${section}`)
    getNewSection(`${section.toLowerCase()}`)
  }

  return (
    <div className='flex flex-column justify-between h-100 relative'>
      <UnorderList className='flex flex-column justify-between'>
        {
          sections.map((section, i) => (
            <Section key={i} active={section === optionSelected} onClick={() => handleChangeSection(section)}>{section}</Section>
          ))
        }
      </UnorderList>
    </div>
  )
}

const Section = styled.li`
  cursor: pointer;
  width: min-content;
  border-bottom: ${({ active }) => active && `2px solid ${primaryOrange}`};
`

const UnorderList = styled.ul`
  height: 400px;
  top: 100px;
  margin-top: 50px;

  @media (max-width: 420px) {
    height: 200px;
    margin-top: 20px;
    padding-left: 20px;
  }
`

const DummyComponent = styled.div`
    position: absolute;
    height: 450px;
    width: 50px;
    top: 80%;

  @media (max-width: 980px) {
    top: 1070px;
    height: 1680px;
  }
`

export default memo(List)
