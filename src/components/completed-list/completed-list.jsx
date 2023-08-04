import Button from '@mui/material/Button';
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TodoItem from '../todo-item/todo-item';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../../state/todos.recoil';
import { randomKeyGenerator } from '../../utils/utils';

const CompletedList2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const filteredLists = useRecoilValue(filteredTodoListState)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <div style={{
                width: "100%",
                marginTop: "30px"
            }}
            >
                <div style={{
                    padding: "0px 16px",
                    color: "white"
                }}>
                    <Button
                        sx={{
                            color: 'white',
                            width: '100%',
                            borderRadius: '0px',
                            borderBottom: "1px solid white",
                            justifyContent: 'space-between'
                        }}
                        endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={handleClick}
                        disableRipple
                    >
                        {`Completed List (${filteredLists.completedCount})`}
                    </Button>
                </div>
                {
                    isOpen &&
                    <div
                        style={{
                            marginTop: "15px",
                        }}
                    >
                        {
                            filteredLists.todoListCompleted.length === 0
                                ? <div style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    No completed task at this moment!!
                                </div>
                                : filteredLists.todoListCompleted.map(item => (
                                    <TodoItem
                                        key={randomKeyGenerator()}
                                        todoId={item._id}
                                        todoTitle={item.title}
                                        todoDescription={item.description}
                                        todoCompleted={item.completed}
                                    />
                                ))
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default CompletedList2