import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import { useRouter } from 'next/router';
import useStateContext from '@/context/ContextProvider';
import Players_bookiing_content_1 from './Players_booking_content_1';
import Players_bookiing_content_2 from './Players_booking_content_2';


const Select_players_modal = ({ open, close }) => {
    const {
        cookieUser,
    } = useStateContext();

    const router = useRouter();

    const [selected_players, set_selected_players] = useState("");

    const [booking_modal, set_booking_modal] = useState("players_booking");



    const handleClose = () => {
        close("select_players_modal");
        set_booking_modal("players_booking");
        set_selected_players("");
    };

    const handle_next_button = (last) => {
        if (!last) {
            set_booking_modal("duration_booking");
        } else {
            set_booking_modal("players_booking");
            close("select_players_modal");
        }
        // router.push("/home/available-booking-time-slots")
    }



    return (

        <Dialog
            open={open.select_players_modal}
            onClose={handleClose}
            className='overflow-hidden'
        >
            {booking_modal !== "duration_booking" ?


                <Players_bookiing_content_1
                    selected_players={selected_players}
                    set_selected_players={set_selected_players}
                    handleClose={handleClose}
                    handle_next_button={handle_next_button}
                />
                :
                <Players_bookiing_content_2
                    selected_players={selected_players}
                    set_selected_players={set_selected_players}
                    handleClose={handleClose}
                    handle_next_button={handle_next_button}
                />
            }
        </Dialog >
    )
}

export default Select_players_modal;
