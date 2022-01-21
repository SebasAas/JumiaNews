import React from "react"
import ContentLoader from "react-content-loader"

import { secondaryWhite, thirthyWhite, thirthyGrey, fourthyDark } from '../../theme/colors'

const SubtitleLoader = (props) => {
  const currentTheme = localStorage.getItem('theme');

  return (
    <ContentLoader
      speed={2}
      width='100%'
      height={80}
      viewBox="0 0 350 80"
      // backgroundColor="#f3f3f3"
      // foregroundColor="#ecebeb"
      backgroundColor={currentTheme === 'light' ? secondaryWhite : thirthyGrey}
      foregroundColor={currentTheme === 'light' ? thirthyWhite : fourthyDark}
      {...props}
    >
      <rect x="6" y="12" rx="3" ry="3" width="286" height="13" />
      <rect x="6" y="53" rx="0" ry="0" width="310" height="13" />
      <rect x="6" y="32" rx="0" ry="0" width="299" height="13" />
    </ContentLoader>
  )
}

export default SubtitleLoader