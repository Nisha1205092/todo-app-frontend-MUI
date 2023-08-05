import * as React from 'react';
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../../state/todos.recoil";
import MyDialogBox from '../custom-dialogbox/custom-dialogbox';
import { TODO_ROUTE } from '../../routes/routes';
import { userState } from '../../state/authState.recoil';
import { useCallback } from 'react';
import axios from 'axios';

const UpdateDialog = ({ todoId, open, setOpen, handleClose, oldTitle, oldDescription }) => {
    const [title, setTitle] = useState(oldTitle);
    const [description, setDescription] = useState(oldDescription)
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const { email } = useRecoilValue(userState)

    const replaceItemAtIndex = (arr, index, newValue) => {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    const updateTodoItem = (todoId, title, description) => {
        console.log(`update todo of id: ${todoId}`)
        // save in DB
        axios.put(`${import.meta.env.VITE_SERVER_URL}${TODO_ROUTE}/${todoId}`,
            { title, description },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'email': email
                }
            })
            .then(res => {
                console.log(res.data);
                // const newTodosArray = [...todoList];
                const index = todoList.findIndex(item => item._id === todoId);
                if (index !== -1) {
                    const item = todoList[index];
                    console.log('before setting title')
                    const newList = replaceItemAtIndex(todoList, index, {
                        ...item,
                        title,
                        description
                    });

                    setTodoList(newList);
                }
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
    }

    const handleCancel = useCallback(() => {
        setOpen(false);
        console.log('cancelled')
    }, [])

    const handleSave = useCallback(() => {
        setOpen(false);
        console.log('before updateTodoItem')
        updateTodoItem(todoId, title, description)
        console.log('after updateTodoItem')
    }, [title, description])

    return (
        <MyDialogBox
            dialogTitle={'Edit the Todo'}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            leftButtonText={'Cancel'}
            leftButtonHandler={handleCancel}
            rightButtonText={'Save'}
            rightButtonHandler={handleSave}
            open={open}
            handleClose={handleClose}
        />
    )
}

export default UpdateDialog