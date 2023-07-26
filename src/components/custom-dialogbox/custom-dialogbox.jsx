import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

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