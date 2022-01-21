import {
  secondaryOrange,
  primaryDark,
  secondaryDark,
  thirthyDark,
  fourthyDark,
  primaryGrey,
  secondaryGrey,
  thirthyGrey,
  fourthyGrey,
  fifthyGrey,
  sixthyGrey,
  sevthyGrey,
  eigthyGrey,
  ninthWhite,
  white,
  secondaryWhite
} from './colors'

export const lightTheme = {
  background: ninthWhite,
  title: secondaryDark,
  subtitle: primaryGrey,
  input: primaryDark,
  fontWeightSubtitle: '700',
  text: thirthyGrey,
  nav: white,
  borderNav: fourthyGrey,
  backgroundContainerText: white,
  backgroundSelect: white,
  backgroundCard: sixthyGrey,
  backgroundTopNews: secondaryOrange,
  backgroundNewsRelated: secondaryOrange
}

export const darkTheme = {
  background: secondaryGrey,
  title: eigthyGrey,
  subtitle: sevthyGrey,
  input: secondaryWhite,
  fontWeightSubtitle: '600',
  text: fifthyGrey,
  nav: primaryDark,
  borderNav: primaryDark,
  backgroundContainerText: thirthyDark,
  backgroundSelect: 'transparent',
  backgroundCard: fourthyDark,
  backgroundTopNews: primaryDark,
  backgroundNewsRelated: primaryDark
}