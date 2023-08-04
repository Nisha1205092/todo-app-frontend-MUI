import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectTagBox = () => {
    return (
        <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={tags}
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
            renderInput={(params) => <TextField {...params} label="tags" />}
        />
    );
}

// todo tags
const tags = [
    { label: 'Important' },
    { label: 'Personal' }
];

export default SelectTagBox;