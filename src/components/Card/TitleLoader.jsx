import React from "react"
import ContentLoader from "react-content-loader"

import { secondaryWhite, thirthyWhite, thirthyGrey, fourthyDark } from '../../theme/colors'

const TitleLoader = (props) => {

  const currentTheme = localStorage.getItem('theme');

  return (
    <ContentLoader
      speed={2}
      width='100%'
      height={60}
      viewBox="0 0 315 60"
      // backgroundColor="#f3f3f3"
      // foregroundColor="#ecebeb"
      backgroundColor={currentTheme === 'light' ? secondaryWhite : thirthyGrey}
      foregroundColor={currentTheme === 'light' ? thirthyWhite : fourthyDark}
      {...props}
    >
      <rect x="21" y="-2" rx="3" ry="3" width="238" height="30" />
      <rect x="41" y="33" rx="0" ry="0" width="200" height="28" />
    </ContentLoader>
  )
}

export default TitleLoader