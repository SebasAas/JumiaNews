import React from "react"
import ContentLoader from "react-content-loader"
import { secondaryWhite, thirthyWhite, thirthyGrey, fourthyDark } from '../../theme/colors'

const ImageLoader = (props) => {
  const { height, width } = props;
  const currentTheme = localStorage.getItem('theme');

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={currentTheme === 'light' ? secondaryWhite : thirthyGrey}
      foregroundColor={currentTheme === 'light' ? thirthyWhite : fourthyDark}
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
    </ContentLoader>
  )
}

export default ImageLoader