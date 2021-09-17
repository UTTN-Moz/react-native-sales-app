import { StyleSheet } from "react-native";

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const Typography = StyleSheet.create({
  header: {
    fontSize: 34,
    fontWeight: '700'//FontWeight.bold,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700'//FontWeight.bold,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700'//FontWeight.bold,
  },
  title3: {
    fontSize: 20,
    fontWeight: '700'//FontWeight.bold,
  },
  headline: {
    fontSize: 17,
    fontWeight: '700'//FontWeight.bold,
  },
  body1: {
    fontSize: 17,
    fontWeight: '400'//FontWeight.regular,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400'// FontWeight.regular,
  },
  callout: {
    fontSize: 17,
    fontWeight: '400'// FontWeight.regular,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400'// FontWeight.regular,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400'// FontWeight.regular,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400'// FontWeight.regular,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400'// FontWeight.regular,
  },
  overline: {
    fontSize: 10,
    fontWeight: '400'// FontWeight.regular,
  },
});
