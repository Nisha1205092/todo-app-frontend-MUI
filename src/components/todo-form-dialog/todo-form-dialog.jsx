import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

const FormDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        console.log('cancelled')
    }

    const handleAdd = () => {
        setOpen(false);
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
                aria-label='add'
            >
                <AddCircleIcon sx={{ fontSize: 60 }} />
            </IconButton>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: "#433c6e",
                        width: "30%",
                        minWidth: "300px"
                    },
                }}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle sx={
                    {
                        color: "white",
                    }
                }>
                    Create a Todo
                </DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'white'
                            },
                            "& .MuiInputLabel-root": { color: 'white' },//styles the label
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "white" },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: "white"
                                }
                            },
                            "& .MuiFormLabel-root.Mui-focused": {
                                color: 'white'
                            },
                        }}
                        variant="outlined"
                        id="title"
                        label="Title"
                        fullWidth
                    />
                    <br />
                    <br />
                    {
                        /*
                        * customizing TextField colors 
                        * https://smartdevpreneur.com/how-to-set-mui-textfield-text-alignment-text-color-and-label-color/#MUI_TextField_Label_Color
                        * https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/#Resources_and_Related_Links 
                        */
                    }
                    <TextField
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'white'
                            },
                            "& .MuiInputLabel-root": { color: 'white' },//styles the label
                            "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "white" },
                            },
                            "& .MuiOutlinedInput-root.Mui-focused": {
                                "& > fieldset": {
                                    borderColor: "white"
                                }
                            },
                            "& .MuiFormLabel-root.Mui-focused": {
                                color: 'white'
                            },
                        }}
                        id="description"
                        label="Description"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions >
                    <Button
                        sx={
                            {
                                color: "white",
                            }
                        }
                        onClick={handleCancel}>Cancel</Button>
                    <Button
                        sx={
                            {
                                color: "white",
                            }
                        }
                        onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog
