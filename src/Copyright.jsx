import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="primary.contrastText" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Amina Rahman
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
