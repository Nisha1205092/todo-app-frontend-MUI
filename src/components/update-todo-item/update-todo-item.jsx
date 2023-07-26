import * as React from 'react';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../../state/todos.recoil";
import MyDialogBox from '../custom-dialogbox/custom-dialogbox';

const UpdateDialog = ({ todoId, open, setOpen, handleClose, oldTitle, oldDescription }) => {
    const [title, setTitle] = useState(oldTitle);
    const [description, setDescription] = useState(oldDescription)
    const [todoList, setTodoList] = useRecoilState(todoListState)

    const replaceItemAtIndex = (arr, index, newValue) => {
        return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    };

    const updateTodoItem = (todoId, title, description) => {
        // save in DB
        fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${todoId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
                    // editItem(
                    //     todoList[index],
                    //     data.title,
                    //     data.description,
                    //     index
                    // )
                    // newTodosArray[index].title = data.title;
                    // newTodosArray[index].description = data.description;
                    // setTodoList(newTodosArray)
                }
                // console.log('title and description updated')
            })
            .catch((err) => {
                console.log({ err });
                alert('Something went wrong! Please refresh!')
            })
    }

    const handleCancel = () => {
        setOpen(false);
        console.log('cancelled')
    }

    const handleSave = () => {
        setOpen(false);
        console.log('before updateTodoItem')
        updateTodoItem(todoId, title, description)
        console.log('after updateTodoItem')
    }

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