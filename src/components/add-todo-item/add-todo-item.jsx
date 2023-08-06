import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoListState } from '../../state/todos.recoil';
import MyDialogBox from '../custom-dialogbox/custom-dialogbox';
import Snackbar from '@mui/material/Snackbar';
import { TODO_ROUTE } from '../../routes/routes';
import { userState } from '../../state/authState.recoil';
import axios from 'axios';
import { useCreateTodo } from '../../utils/tanstack-query';
import useAuth from '../../customHooks/useAuth';

const AddTodoDialog = () => {
    const [user] = useAuth();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [warning, setWarning] = useState(false);

    const { isError, isSuccess, mutate } = useCreateTodo(user, { title, description })
    // const [todoList, setTodoList] = useRecoilState(todoListState)
    // const { email } = useRecoilValue(userState)

    // for showing Snackbar when attempting empty item addition

    // const addTodoItem = useCallback(({ title, completed, description }) => {
    //     let todoId;
    //     if (title === '' && description === '') {
    //         setWarning(true);
    //         return;
    //     }
    //     axios.post(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}`,
    //         {
    //             title,
    //             description
    //         }, {
    //         headers: {
    //             'email': email
    //         }
    //     })
    //         // .then(res => res.json())
    //         .then(res => {
    //             console.log("res.data.id", res.data.id)
    //             todoId = res.data.id
    //             // no need to fetch from the server
    //             const newTodosArray = [...todoList];
    //             newTodosArray.push({ _id: todoId, title, completed, description })
    //             setTodoList(newTodosArray)
    //         })
    //         .catch((err) => {
    //             // console.log({ err })
    //             // alert('Something went wrong!')
    //             if (err.response) {
    //                 // Request made and server responded
    //                 const { status, config } = err.response;

    //                 if (status === 404) {
    //                     alert(`${config.url} not found`);
    //                 }
    //                 if (status === 500) {
    //                     alert("Server error");
    //                 }
    //             } else if (err.request) {
    //                 // Request made but no response from server
    //                 alert("Error", err.message);
    //             } else {
    //                 // some other errors
    //                 alert("Error", err.message);
    //             }
    //         })
    // }, [title, description])

    const addTodoItem = ({ title, description }) => {
        if (title === '' && description === '') {
            setWarning(true);
            return;
        }
        mutate(user, { title, description })
        if (isError) {
            console.log('todo creation faced some error')
        }
        if (isSuccess) {
            console.log('todo created successfully')
        }
    }

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
