import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import AddTodoDialog from '../../components/add-todo-item/add-todo-item';
import CompletedList from '../../components/completed-list/completed-list';
import TodoList from '../../components/todo-list/todo-list';
import { ConfirmProvider } from 'material-ui-confirm';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/authState.recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../customHooks/useAuth';

const Home = () => {
    const [user] = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        console.log(user);
        if (user.email.length) {
            navigate('/') //if user is already signed in, then it automatically takes to the home page
        } else {
            navigate('/signin')
        }
    }, [user]);

    return (
        <ConfirmProvider>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 'md',
                    p: 0,
                }}
            >
                <Stack
                    bgcolor="primary.dark"
                    display="grid"
                    gridTemplateColumns="1fr"
                    gridTemplateRows="min-content auto 1fr min-content"
                    justifyItems="center"
                    justifyContent="flex-start"
                    height='100%'
                    overflow="auto"
                    alignItems="start"
                >
                    <Stack
                        padding={2}
                        width='100%'
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            borderBottom="3px solid white"
                        >
                            <Typography sx={{ color: 'primary.contrastText' }} variant="h4" component="h1" gutterBottom>
                                My Todo List
                            </Typography>
                        </Stack>
                    </Stack>
                    <TodoList />
                    <CompletedList />
                    <AddTodoDialog />
                </Stack>
            </Container>
        </ConfirmProvider>
    )
}

export default Home;