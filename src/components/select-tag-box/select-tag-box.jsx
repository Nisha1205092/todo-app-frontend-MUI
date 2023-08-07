import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';

const SelectTagBox = () => {
    const [value, setValue] = useState(tags[1]);

    return (
        <Autocomplete
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={tags}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
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
            renderInput={(params) => <TextField {...params} label="Choose a tag" />}

        />
    );
}


// todo tags
const tags = [
    { label: 'Work' },
    { label: 'Personal' },
    { label: 'Important' }
];

// const tags = [
//     'Work',
//     'Personal',
//     'Important'
// ]

export default SelectTagBox;