import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyCheckbox from '../custom-checkbox/custom-checkbox';

const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const TodoItem = ({ todoId, todoTitle, todoDescription, todoCompleted }) => {

    return (
        <Card
            sx={{
                minWidth: "90%",
                m: 2,
                bgcolor: 'primary.main',
                borderRadius: 4
            }}
        >
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                <MyCheckbox status={todoCompleted} todoId={todoId} />
                <CardContent>
                    <Typography
                        variant='h5'
                        sx={{
                            color: 'primary.contrastText'
                        }}
                    >
                        {todoTitle}
                    </Typography>
                    <Typography
                        variant='p'
                        sx={{
                            color: 'primary.contrastText'
                        }}
                    >
                        {todoDescription}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

export default TodoItem;