import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from '../../state/todos.recoil';
import MyDialogBox from '../custom-dialogbox/custom-dialogbox';
import Snackbar from '@mui/material/Snackbar';
import { TODO_ROUTE } from '../../routes/routes';
import { userState } from '../../state/authState.recoil';

const AddTodoDialog = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const { email } = useRecoilValue(userState)

    // for showing Snackbar when attempting empty item addition
    const [warning, setWarning] = useState(false);

    const addTodoItem = useCallback(({ title, completed, description }) => {
        let todoId;
        if (title === '' && description === '') {
            setWarning(true);
            return;
        }
        fetch(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                "Content-Type": "application/json",
                'email': email
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("data.id", data.id)
                todoId = data.id
                // no need to fetch from the server
                const newTodosArray = [...todoList];
                newTodosArray.push({ _id: todoId, title, completed, description })
                setTodoList(newTodosArray)
            })
            .catch((err) => {
                console.log({ err })
                alert('Something went wrong!')
            })
    }, [title, description])

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleCancel = useCallback(() => {
        setOpen(false);
        setTitle('')
        setDescription('')
        console.log('cancelled')
    }, [])

    const handleAdd = useCallback(() => {
        setOpen(false);
        addTodoItem({ title, completed: false, description })
        setTitle('')
        setDescription('')
        console.log('added')
    }, [title, description])

    return (
        <div>
            <IconButton
                onClick={handleClickOpen}
                sx={
                    {
                        color: "#B66FFD",
                    }
                }
                aria-label='add todo'
            >
                <AddCircleIcon sx={{ fontSize: 60 }} />
            </IconButton>

            <Snackbar
                open={warning}
                onClose={() => setWarning(false)}
                autoHideDuration={2000}
                message="Empty todo item not allowed!!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
            <MyDialogBox
                dialogTitle={'Create a Todo'}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                leftButtonText={'Cancel'}
                leftButtonHandler={handleCancel}
                rightButtonText={'Add'}
                rightButtonHandler={handleAdd}
                open={open}
                handleClose={handleClose}
            />
        </div>
    );
}

export default AddTodoDialog
