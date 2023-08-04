import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const tomorrow = dayjs().add(1, 'day');

const MyDateTimePicker = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
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
                    "& .MuiTypography-root": {
                        color: 'white'
                    },
                }}
                components={[
                    'DatePicker',
                    'DateTimePicker',
                    'TimePicker',
                    'DateRangePicker',
                ]}
            >

                <DateTimePicker
                    label="Deadline (Optional)"
                    defaultValue={today}
                    disablePast
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default MyDateTimePicker