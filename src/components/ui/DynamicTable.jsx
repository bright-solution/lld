import React, { useState, useMemo } from "react";
import { alpha } from "@mui/material/styles";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    FormControlLabel,
    Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

// 🔥 Comparator
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// 🔥 HEAD (Dynamic)
const EnhancedTableHead = ({
    columns,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
}) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>

                {columns.map((col) => (
                    <TableCell key={col.id} align={col.numeric ? "right" : "left"}>
                        <TableSortLabel
                            active={orderBy === col.id}
                            direction={order}
                            onClick={createSortHandler(col.id)}
                        >
                            {col.label}
                            {orderBy === col.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

// 🔥 TOOLBAR
const EnhancedTableToolbar = ({ numSelected }) => {
    return (
        <Toolbar
            sx={[
                { pl: 2, pr: 1 },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.2),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: 1 }}>
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: 1 }}>
                    Dynamic Table
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

// 🔥 MAIN COMPONENT
const DynamicEnhancedTable = ({ columns, data }) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState(columns[0]?.id || "");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(data.map((row) => row.id));
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) newSelected = [...selected, id];
        else newSelected = selected.filter((item) => item !== id);

        setSelected(newSelected);
    };

    const visibleRows = useMemo(() => {
        return [...data]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [data, order, orderBy, page, rowsPerPage]);

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%" }}>

                <EnhancedTableToolbar numSelected={selected.length} />

                <TableContainer>
                    <Table size={dense ? "small" : "medium"}>

                        <EnhancedTableHead
                            columns={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />

                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isSelected = selected.includes(row.id);

                                return (
                                    <TableRow
                                        hover
                                        key={row.id || index}
                                        selected={isSelected}
                                        onClick={(e) => handleClick(e, row.id)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>

                                        {columns.map((col) => (
                                            <TableCell key={col.id}>
                                                {row[col.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            </Paper>

            <FormControlLabel
                control={
                    <Switch
                        checked={dense}
                        onChange={(e) => setDense(e.target.checked)}
                    />
                }
                label="Dense padding"
            />
        </Box>
    );
};

export default DynamicEnhancedTable;