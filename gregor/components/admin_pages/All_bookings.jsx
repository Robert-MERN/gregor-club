import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useStateContext from '@/context/ContextProvider';

function createData(date, bay, session, startTime, endTime, players, member, guests) {
    return { date, bay, session, startTime, endTime, players, member, guests };
}

const rows = [
    createData('17/04/23', 1, "4-hour", "12:00 am", "04:00 pm", 3, 1, 2),
    createData('18/04/23', 1, "2-hour", "12:00 am", "02:00 pm", 1, 1, 2),
    createData('18/04/23', 2, "2-hour", "06:00 am", "08:00 pm", 2, 0, 2),
    createData('01/06/23', 1, "2-hour", "09:00 am", "11:00 am", 1, 1, 0),
    createData('08/06/23', 2, "1-hour", "01:00 pm", "02:00 pm", 1, 1, 0),
];

const headers = [
    "Bay (field No.)",
    "Session (g)",
    "Start Time",
    "End Time",
    "Player(s)",
    "Member",
    "Guest(s)",
]

export default function All_bookings() {

    const { openSidebar } = useStateContext();

    return (
        <div className={`w-full h-[calc(100vh-60px)] overflow-y-auto ${openSidebar ? "px-[20px] md:px-[40px]" : "px-[80px]"} pt-24 lg:pt-6 transition-all duration-300`}>

            <TableContainer className='w-[400px] md:w-full overflow-x-auto' component={Paper}>
                <Table  size="medium" aria-label="My Booking">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className='text-stone-500 font-semibold text-[15px]'
                            >
                                Date (g)
                            </TableCell>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    align="right"
                                    className='text-stone-500 font-semibold text-[14px]'
                                >
                                    {header}
                                </TableCell>
                            ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='text-stone-500' component="th" scope="row">
                                    {row.date}
                                </TableCell>
                                <TableCell className='text-stone-500' align="right">{row.bay}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.session}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.startTime}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.endTime}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.players}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.member}</TableCell>
                                <TableCell className='text-stone-500' align="right">{row.guests}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}