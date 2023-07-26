import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyCheckbox from '../custom-checkbox/custom-checkbox';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import UpdateDialog from '../update-todo-item/update-todo-item';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../state/todos.recoil';

const TodoItem = ({ todoId, todoTitle, todoDescription, todoCompleted }) => {
    const [open, setOpen] = useState(false);
    const [todoList, setTodoList] = useRecoilState(todoListState)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeTodoItem = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`, {
            method: 'DELETE'
        })
            .then(() => {
                // console.log('delete successful')
                //no need to fetch from server
                const newTodosArray = todoList.filter(todo => todo._id !== todoId)
                setTodoList(newTodosArray)
            })
            .catch((err) => {
                console.log({ err });
                alert('Something went wrorng!')
            })
    }
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
            <Box>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label='copy to clipboard'
                    >
                        <ContentPasteIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            console.log('edit');
                            handleClickOpen();
                        }}
                        aria-label="edit todo item"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            removeTodoItem()
                        }}
                        aria-label="delete todo item"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Box>
            {open && <UpdateDialog
                todoId={todoId}
                open={open}
                handleClose={handleClose}
                setOpen={setOpen}
                oldTitle={todoTitle}
                oldDescription={todoDescription}
            />}
        </Card>
    )
}

export default TodoItem;