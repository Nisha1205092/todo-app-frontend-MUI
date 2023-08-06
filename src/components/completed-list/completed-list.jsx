import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useCallback, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TodoItem from '../todo-item/todo-item';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../../state/todos.recoil';
import { getCompletedTodos, randomKeyGenerator } from '../../utils/utils';
import { useQuery } from '@tanstack/react-query';
import { useCompletedTodos } from '../../utils/tanstack-query';
import useAuth from '../../customHooks/useAuth';

const CompletedList2 = () => {
    const [user] = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    // const filteredLists = useRecoilValue(filteredTodoListState)
    // const { email } = localStorage.getItem('user');

    const { status, error, data } = useCompletedTodos(user?.email);
    // status can be ['success', 'error', 'loading']

    const handleClick = useCallback(() => {
        setIsOpen(!isOpen)
    }, [isOpen])

    if (status === 'loading') {
        return (
            <div
                style={{
                    color: 'white',
                    textAlign: 'center'
                }}>
                <CircularProgress color="secondary" />
            </div>
        )
    }

    if (status === 'error') {
        return <h1>{JSON.stringify(error)}</h1>
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
                        {`Completed List (${data.length})`}
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
                            data.length === 0
                                ? <div style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    No completed task at this moment!!
                                </div>
                                : data.map(item => (
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