import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoItem = () => {
    return (
        <Card sx={{ minWidth: 275, m: 2, bgcolor: 'primary.main', borderRadius: 4 }}>
            <Box sx={{ display: 'flex' }} >
                <Checkbox component='span' {...label} />
                <CardContent>
                    <Typography variant='h5' sx={{ color: 'primary.contrastText' }} >
                        Get Grocery
                    </Typography>
                    <Typography variant='p' sx={{ color: 'primary.contrastText' }} >
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis nulla natus est porro fuga nesciunt incidunt quae eveniet,
                        laudantium adipisci! Reiciendis, laboriosam unde?
                        Illo facere, ipsum totam libero odit rerum.
                    </Typography>
                </CardContent>

            </Box>
        </Card>
    )
}

export default TodoItem;