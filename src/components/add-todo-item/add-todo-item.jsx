import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../state/todos.recoil';
import MyDialogBox from '../custom-dialogbox/custom-dialogbox';

const AddTodoDialog = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [todoList, setTodoList] = useRecoilState(todoListState)

    const addTodoItem = ({ title, completed, description }) => {
        let todoId;

        fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                completed: false
            }),
            headers: {
                "Content-Type": "application/json"
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
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setTitle('')
        setDescription('')
        console.log('cancelled')
    }

    const handleAdd = () => {
        setOpen(false);
        addTodoItem({ title, completed: false, description })
        setTitle('')
        setDescription('')
        console.log('added')
    }

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
