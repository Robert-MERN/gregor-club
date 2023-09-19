import React from 'react'
import style from "@/styles/Home.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const Players_booking_content_1 = ({
    selected_players,
    set_selected_players,
    handleClose,
    handle_next_button,
}) => {
    const handle_select_players = (params) => {
        set_selected_players(params);
        const element = document.getElementById("scroll_to_bottom")
        element && element.scrollIntoView({ behavior: "smooth" })
    }

    const players_slots = [
        {
            label: "Member & Member with Guest(s)*",
            slots: [
                { button: "Single Member", players: 1, fee: null },
                { button: "Member with 1 Guest", players: 2, fee: 25 },
                { button: "Member with 2 Guests", players: 3, fee: 35 },
                { button: "Member with 3 Guests", players: 4, fee: 50 },

            ]
        },
        {
            label: "Only Guest(s)*",
            slots: [
                { button: "1 Guest", players: 1, fee: 25 },
                { button: "2 Guests", players: 2, fee: 30 },
                { button: "3 Guests", players: 3, fee: 40 },
                { button: "4 Guests", players: 4, fee: 45 },
            ]
        }
    ]
    return (
        <div className={`h-[70vh] md:w-[500px] md:h-[450px] p-5 md:p-7 pt-8 md:pt-12 pb-6 relative flex flex-col gap-4 md:gap-10 justify-between overflow-x-hidden ${style.scrollBar}`} >
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
                    Select Players
                </p>
                <div className="flex flex-col w-full mt-4 md:mt-6 gap-2 md:gap-4">
                    {players_slots.map((slots, index) => (
                        <React.Fragment key={index}>
                            <label htmlFor="" className='text-[12px] md:text-[14px] text-stone-500 font-semibold mb-2'>
                                {slots.label}
                            </label>

                            <div className="flex flex-col w-full gap-4">
                                {slots.slots.map((slot, i) => (
                                    < button key={i} onClick={() => handle_select_players(slot.button)} className={`py-[10px] text-[12px] md:text-[14px] hover:bg-blue-400 hover:text-white w-full rounded-md select-none flex gap-3 px-4 items-center text-center justify-center ${selected_players === slot.button ? "bg-blue-500 text-white" : "bg-stone-300 text-stone-700"}`} >
                                        {slot.button} {slot.fee && <span className={`font-semibold`}>${slot.fee}</span>}
                                    </button>
                                ))
                                }
                            </div >
                        </React.Fragment>
                    ))}

                    < label htmlFor="" className='text-[11px] md:text-[13px] text-stone-500 md:mt-6 mt-4' > Please note that additional fees for guests will apply, determined by the chosen session duration </label>

                </div>
            </div>

            <div id="scroll_to_bottom" className='w-full flex justify-end' >
                <div className='flex gap-6 items-center' >


                    <button type="button"
                        onClick={handleClose}
                        className='bg-red-500 hover:bg-red-400 px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px]' >
                        Cancel
                    </button>
                    <button disabled={!selected_players} onClick={() => handle_next_button(false)} className={`px-4 py-[6px] rounded-md text-white text-[12px] md:text-[15px] ${selected_players ? "bg-blue-500 hover:opacity-75" : "bg-stone-300"}`} >Next</button>
                </div>
            </div>
        </div>
    )
}

export default Players_booking_content_1