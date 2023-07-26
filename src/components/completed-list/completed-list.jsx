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
                minHeight: "200px",
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
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={() => setIsOpen(!isOpen)}
                        disableRipple
                    >
                        Completed List
                    </Button>
                </div>
                {
                    isOpen &&
                    <div
                        style={{
                            maxHeight: "600px",
                            overflowY: "auto",
                            marginTop: "15px",
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