import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import TablePaginationActions from './tablePaginationActions';
import ClipLoader from "react-spinners/ClipLoader";


import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux';
import User from './userModal';
import { retrieveUsers } from '../actions/users';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





const UsersTable: FunctionComponent = () => {
    const users: User[] = useSelector((state:any) => state.users);
    let [loading, setLoading] = useState(true);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    console.log("Users",users)
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch<any>(retrieveUsers());
        setLoading(false);
    }, [dispatch]);


    return loading ? (
        <ClipLoader loading={loading}  size={150} css={override} />
     ) :(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            ID
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            NAME
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            USERNAME
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => <StyledTableRow key={user.name}>
                        <StyledTableCell align="center">{user.id}</StyledTableCell>
                        <StyledTableCell align="center">{user.name}</StyledTableCell>
                        <StyledTableCell align="center">{user.username}</StyledTableCell>
                    </StyledTableRow>)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={users.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table></TableContainer>
    )
}

export default UsersTable;
