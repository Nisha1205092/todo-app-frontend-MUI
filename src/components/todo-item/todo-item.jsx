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
import Snackbar from '@mui/material/Snackbar';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from '../../state/todos.recoil';
import { useConfirm } from "material-ui-confirm";
import { TODO_ROUTE } from '../../routes/routes';
import { userState } from '../../state/authState.recoil';
import axios from 'axios';

const TodoItem = ({ todoId, todoTitle, todoDescription, todoCompleted }) => {
    const confirm = useConfirm();
    const [open, setOpen] = useState(false);
    const [copy, setCopy] = useState(false);
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const { email } = useRecoilValue(userState)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleDelete = useCallback(() => {
        confirm({ description: 'This will permanently delete the item' })
            .then(() => { removeTodoItem() })
            .catch(() => console.log('Deletion cancelled'))
    }, [])

    const removeTodoItem = useCallback(() => {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`, {
            headers: {
                'email': email
            }
        })
            .then(() => {
                // console.log('delete successful')
                //no need to fetch from server
                const newTodosArray = todoList.filter(todo => todo._id !== todoId)
                setTodoList(newTodosArray)
            })
            .catch((err) => {
                // console.log({ err })
                // alert('Something went wrong!')
                if (err.response) {
                    // Request made and server responded
                    const { status, config } = err.response;

                    if (status === 404) {
                        alert(`${config.url} not found`);
                    }
                    if (status === 500) {
                        alert("Server error");
                    }
                } else if (err.request) {
                    // Request made but no response from server
                    alert("Error", err.message);
                } else {
                    // some other errors
                    alert("Error", err.message);
                }
            })
    }, [todoId, todoList])

    const editHandler = useCallback(() => {
        console.log('edit');
        handleClickOpen();
    }, [])

    const copyHandler = useCallback(() => {
        setCopy(true);
        navigator.clipboard.writeText(`${todoTitle} ${todoDescription}`)
    }, [todoTitle, todoDescription])

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
                        onClick={copyHandler}
                        aria-label='copy to clipboard'
                    >
                        <ContentPasteIcon />
                    </IconButton>
                    <Snackbar
                        open={copy}
                        onClose={() => setCopy(false)}
                        autoHideDuration={2000}
                        message="Copied to clipboard"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    />
                    <IconButton
                        onClick={editHandler}
                        aria-label="edit todo item"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            handleDelete()
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