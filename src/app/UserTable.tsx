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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { css } from "@emotion/react";
import { useDispatch, useSelector } from 'react-redux';
import User from './userModal';
import { retrieveUsers } from '../actions/users';
import PostService from '../services/PostService';

import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
// Icons
import EditIcon from "@mui/icons-material/EditOutlined";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Form from './UserEditForm';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
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
    const users: User[] = useSelector((state: any) => state.users);
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };
    const onToggleEditMode = (id: any) => {
        console.log("edit")
        // setRows(state => {
        //   return rows.map(row => {
        //     if (row.id === id) {
        //       return { ...row, isEditMode: !row.isEditMode };
        //     }
        //     return row;
        //   });
        // });
    };

    const handleClick = (id: any, name: any) => {
        navigate(`/posts/${id}`)
    };
    const onSubmit = (event: { preventDefault: (arg0: any) => void; target: { name: { value: any; }; email: { value: any; }; }; }) => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target.email.value);
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
        <ClipLoader loading={loading} size={150} css={override} />
    ) : (
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
                    {users && users.map((user, index) => <StyledTableRow key={index} >

                        <StyledTableCell align="center">{user.id}</StyledTableCell>
                        <StyledTableCell align="center">{user.name}</StyledTableCell>
                        <StyledTableCell align="center">{user.username}</StyledTableCell>
                        <StyledTableCell align="center">
                            <IconButton
                                aria-label="delete"
                                onClick={handleOpen}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleClick(user.id, user.name)}
                            >

                                <DynamicFeedIcon />
                            </IconButton>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Form onSubmit={onSubmit}/>
                                </Box>
                            </Modal>
                        </StyledTableCell>
                    </StyledTableRow>)}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
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

