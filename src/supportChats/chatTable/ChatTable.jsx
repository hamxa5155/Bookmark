import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { Link } from "@material-ui/core";
import "./ChatTable.css";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export const ChatTable = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table-heading">Name</TableCell>
            <TableCell className="table-heading">Updated On</TableCell>
            <TableCell align="center" className="table-heading">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loading && (
            <TableRow>
              <TableCell component="th" scope="row" align="center" colSpan={5}>
                Loading...
              </TableCell>
            </TableRow>
          )}
          {props.users.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {/* <div className="" style={{ width: 100 }}></div> {row.user_id ? row.user_id.name : 'Guest user'} */}
                <div className="d-flex">
                  {"Guest user"}
                  {/* {row._doc.user_id ? row._doc.user_id.name : 'Guest user'} */}
                  {row.chats.length > 0 && (
                    <p className="chat-count">{row.chats.length}</p>
                  )}
                </div>
              </TableCell>
              <TableCell component="th" scope="row">
                <div className="" style={{ width: 100 }}></div>
                {moment(row._doc.updated_on).format("DD-MM-YYYY HH:mm")}
              </TableCell>
              <TableCell align="right">
                <div className="dis-flex justify-end align-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="st-my-10 st-btn bg-primary-color"
                    size="small"
                    style={{ width: 70 }}
                    onClick={() => history.push(`/chat-box/${row._doc._id}`)}
                  >
                    Chat
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state) => ({
  loading: state.supportChats.loading,
  users: state.supportChats.users,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTable);
