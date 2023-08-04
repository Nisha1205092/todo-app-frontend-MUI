import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SelectTagBox from '../select-tag-box/select-tag-box';
import MyDateTimePicker from '../date-time-picker/date-time-picker';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React from 'react'
import { MuiFileInput } from 'mui-file-input'; //https://viclafouch.github.io/mui-file-input/docs/api-reference/
import Divider from '@mui/material/Divider';

const MyDialogBox = ({
    dialogTitle,
    title,
    setTitle,
    description,
    setDescription,
    leftButtonText,
    rightButtonText,
    leftButtonHandler,
    rightButtonHandler,
    open,
    handleClose
}) => {
    // image upload
    const [file, setFile] = React.useState(null)
    // image upload
    const handleChange = (newFile) => {
        setFile(newFile)
    }

    return (
        <Dialog
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: 'primary.main',
                    width: '30%',
                    minWidth: '300px'
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
                {dialogTitle}
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
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        console.log(title)
                    }}
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
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                        console.log(description)
                    }}
                />
                <br />
                {/* for selecting tags */}
                <br />
                <SelectTagBox />
                {/* for selecting deadline */}
                <br />
                <MyDateTimePicker />
                {/* for image upload */}
                <br />
                {/* <IconButton>
                    <CameraAltIcon />
                    <InputLabel htmlFor="image">Upload Image</InputLabel>
                    <input hidden id='image' accept="image/*" type='file' />
                </IconButton> */}
                <MuiFileInput
                    id='image'
                    label='Upload multiple images (Optional)'
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
                    multiple
                    value={file}
                    onChange={handleChange}
                />

            </DialogContent>
            <DialogActions >
                <Button
                    aria-label='left-button'
                    sx={
                        {
                            color: "white",
                        }
                    }
                    onClick={leftButtonHandler}>{leftButtonText}</Button>
                <Button
                    aria-label='right-button'
                    sx={
                        {
                            color: "white",
                        }
                    }
                    onClick={rightButtonHandler}>{rightButtonText}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default MyDialogBox;