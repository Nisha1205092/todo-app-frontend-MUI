import MaterialUISwitch from './theme-toggler';

const SimpleThemeToggler = ({ themeToggler, isDarkTheme }) => {
    return (
        // <ThemeToggler onChange={themeToggler} checked={isDarkTheme} />
        <MaterialUISwitch sx={{ m: 1 }} onChange={themeToggler} checked={isDarkTheme} />
    )
}

export default SimpleThemeToggler