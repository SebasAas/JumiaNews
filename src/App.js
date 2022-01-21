import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

// Layout
import Header from './layout/Header';
import Footer from './layout/Footer';

// Components
import Home from './pages/Home'
import News from './pages/News';
import Section from './pages/Section';
import NotFound from './pages/NotFound';

// Styles
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/themes';
import GlobalStyle from './theme/globalStyles';
import styled from 'styled-components';

// Icons
import { SunIcon, MoonIcon } from './assets/Icons'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  });

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      localStorage.setItem('theme', theme)
    }
  }, [])

  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
    else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="news/:id" element={<News />} />
            <Route path="section/:name" element={<Section />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ButtonThemeContainer>
            <ButtonTheme data-cy="theme-mode" theme={theme} onClick={() => themeToggler()}>
              {theme === 'light' ? MoonIcon() : SunIcon()}
            </ButtonTheme>
          </ButtonThemeContainer>
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}

const Container = styled.div`
  position: relative;
  margin: 30px 100px;
  min-height: 100vh;

  @media (max-width: 1080px) {
    margin: 30px 30px;
  }
`

const ButtonThemeContainer = styled.div`
  position: fixed;
  right: 0;
  top: 70%;
`
const ButtonTheme = styled.button`
  height: 60px;
  width: 70px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme === 'light' ? '#323232' : '#ededed'};
  cursor: pointer;
`

export default App;