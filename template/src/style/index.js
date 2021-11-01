import theme from "./theme";
import themeDark from "./themeDark";

export const fonts = {
   primary: 'Futura Book',
   heading: 'Futura Bold',
}
export const themes = {
   system: theme,
   dark: themeDark
}
export default {
   themes,
   bgSource: require('../../assets/background.jpg'),
}
