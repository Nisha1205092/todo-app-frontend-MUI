import Button from '@mui/material/Button';
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TodoItem from '../todo-item/todo-item';

const CompletedList2 = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div style={{
                width: "100%",
                padding: "30px 16px 0 16px",
                minHeight: "200px"
            }}
            >
                <div style={{
                    padding: "0px",
                    color: "white"
                }}>
                    <Button
                        sx={{
                            color: 'white',
                            width: '100%',
                            borderBottom: "1px solid white",
                            justifyContent: 'space-between'
                        }}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={() => setIsOpen(!isOpen)}
                        disableRipple="true"
                    >
                        Completed List
                    </Button>
                </div>
                {
                    isOpen &&
                    <div
                        style={{
                            maxHeight: "600px",
                            overflowY: "auto"
                        }}
                    >
                        <TodoItem />
                        <TodoItem />
                        <TodoItem />
                        <TodoItem />
                    </div>
                }
            </div>
        </>
    )
}

export default CompletedList2