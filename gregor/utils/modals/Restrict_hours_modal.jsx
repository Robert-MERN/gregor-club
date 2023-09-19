import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import styles from "@/styles/Home.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, FormControl, Select, FormHelperText, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';

const Select_players_modal = ({ open, close }) => {
    const {
        cookieUser,
    } = useStateContext();

    const router = useRouter();



    const [selected_players, set_selected_players] = useState("");


    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleClose = () => {
        close("restrict_hours_modal");
        // set_selected_players("");
    };

    const handle_next_button = () => {
        close("restrict_hours_modal");
        // set_booking_modal("duration_booking");
        // router.push("/home/available-booking-time-slots")

    }

    const [formState, setFormState] = useState({
        startDuration: '',
        endDuration: '',
        errors: {
            startDuration: '',
            endDuration: '',
        },
    });

    const validateField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'startDuration':
                if (!value) {
                    error = 'Please select start duration';
                }
                break;
            case 'endDuration':
                if (!value) {
                    error = 'Please select end duration';
                }
                break;
            default:
                break;
        }
        return error;
    }

    const handleBlur = (event) => {
        const { name, value } = event.target;
        const error = validateField(name, value);
        setFormState((prevState) => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        Object.keys(formState).forEach((fieldName) => {
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                errors[fieldName] = error;
            }
        });
        setFormState((prevState) => ({
            ...prevState,
            errors,
        }));
        if (Object.values(errors).every((error) => !error)) {
            // Form is valid, submit it
            handleClose()
        }
    }

    const generateTimeOptions = () => {
        const timeOptions = [];
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0); // Set to midnight
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999); // Set to 11:59:59 PM

        while (startDate <= endDate) {
            const timeLabel = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timeValue = startDate.toTimeString().slice(0, 8); // Format as "hh:mm"
            timeOptions.push({ label: timeLabel, value: timeValue });
            startDate.setMinutes(startDate.getMinutes() + 60); // Increment by 30 minutes
        }

        return timeOptions;
    };

    const timeOptions = generateTimeOptions();



    return (

        <Dialog
            open={open.restrict_hours_modal}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className={`h-[70vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${styles.scrollBar}`} >
                <div
                    onClick={handleClose}
                    className='absolute right-3 top-2 cursor-pointer select-none'
                >
                    <IconButton >
                        <CloseIcon className='scale-[.9] md:scale-[1.1] text-stone-500' />
                    </IconButton>
                </div>
                <div>
                    <p className='text-[15px] md:text-[17px] text-stone-600 font-bold' >
                        Restrict Hours/Slots
                    </p>
                    <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-3">
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                Date*
                            </label>
                            <DatePicker
                                selected={selectedDate}
                                // onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className='text-[17px] cursor-pointer outline-none text-stone-500 font-semibold transition-all '
                            />
                        </div>

                        <div>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold'>
                                Start duration*
                            </label>
                            <FormControl
                                className='w-full mt-1'
                                variant="outlined"
                                size='small'
                            >
                                <Select
                                    name="startDuration"
                                    error={Boolean(formState.errors.startDuration)}
                                    onChange={handleChange}
                                    value={formState.startDuration}
                                    onBlur={handleBlur}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {timeOptions && timeOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formState.errors.startDuration && <FormHelperText error>{formState.errors.startDuration}</FormHelperText>}
                            </FormControl>
                        </div>

                        <div>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2'>
                                End duration*
                            </label>
                            <FormControl
                                className='w-full mt-1'
                                variant="outlined"
                                size='small'
                            >
                                <Select
                                    name="endDuration"
                                    error={Boolean(formState.errors.endDuration)}
                                    onChange={handleChange}
                                    value={formState.endDuration}
                                    onBlur={handleBlur}
                                    displayEmpty
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {timeOptions && timeOptions.map((option, index) => (
                                        <MenuItem key={index} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formState.errors.endDuration && <FormHelperText error>{formState.errors.endDuration}</FormHelperText>}
                            </FormControl>
                        </div>



                        {/* Note */}
                        < label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-3 mt-2' > Please note that by selecting a restricted time duration, you can later unrestrict that duration by selecting it again.</label>

                    </div>
                </div>

                <div id="scroll_to_bottom" className='w-full flex justify-end' >
                    <div className='flex gap-6 items-center' >


                        <button type="button"
                            onClick={handleClose}
                            className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]' >
                            Cancel
                        </button>
                        <button
                            // disabled={!selected_players}
                            onClick={handle_next_button}
                            className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] ${selected_players ? "bg-blue-500 hover:opacity-75" : "bg-stone-300"}`}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </form>
        </Dialog >
    )
}

export default Select_players_modal;
