import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  console.log('inside copyright')
  return (
    <footer>
      <Typography
        variant="body2"
        color="primary.contrastText"
        bgcolor="primary.dark"
        align="center"
        paddingBottom="10px"
      >
        {'Copyright © '}
        <Link
          color="inherit"
          href="https://github.com/Nisha1205092"
        >
          Amina Rahman
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </footer>
  );
}
