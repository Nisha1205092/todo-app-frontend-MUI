import Switch from '@mui/material/Switch';

const SimpleThemeToggler = ({ themeToggler, isDarkTheme }) => {
    return (
        <Switch onChange={themeToggler} checked={isDarkTheme} />
    )
}

export default SimpleThemeToggler