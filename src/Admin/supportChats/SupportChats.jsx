import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { FiMessageCircle } from "react-icons/fi";
import { fetchLiveUsers } from "../../store/supportChats/actions";
import Pagination from "react-js-pagination";

// components
import ChatTable from "../../supportChats/chatTable/ChatTable";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../config/index";
import Sound from "react-sound";
import Contacttable from '../Contacttable'

export const SupportChat = (props) => {
  const socket = socketIOClient(BASE_URL);

  const [state, setState] = useState({
    activePage: 1,
    limit: 50,
    offset: 0,
    play: false,
  });
  useEffect(() => {
    const { limit, offset } = state;
    props.fetchLiveUsers(limit, offset);
    socket.on("admin_chats", () => {
      setState({ ...state, play: true });
      props.fetchLiveUsers(limit, offset);
    });
  }, []);
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    const { limit, offset } = state;
    let newOffset = (pageNumber - 1) * limit;
    props.fetchLiveUsers(limit, newOffset);
    setState({ ...state, activePage: pageNumber, offset: newOffset });
  };
  return (
    <>
      {state.play && (
        <Sound
          url={
            "https://www.stockringtone.com/download/messages-ringtones/4108/Sms_Tone_Mp3_Ringtone"
          }
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={() => setState({ ...state, play: false })}
        />
      )}
      <div
        className="container-fluid   height"
        style={{ backgroundColor: "white" }}
      >
        <div className="row text-center">
          <h2>Support Chats </h2>
        </div>
        <div className="row mlr-15">
          <ChatTable />
          <Grid
            container
            xs={12}
            item
            className="d-flex justify-content-center align-items-center mt-3"
          >
            <Pagination
              activePage={state.activePage}
              itemsCountPerPage={state.limit}
              totalItemsCount={props.userCount}
              pageRangeDisplayed={5}
              onChange={(count) => handlePageChange(count)}
              itemClass="page-item"
              linkClass="page-link"
            />
          </Grid>
        </div>
      </div>

      <Contacttable/>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.supportChats.users,
  userCount: state.supportChats.userCount,
});

const mapDispatchToProps = {
  fetchLiveUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SupportChat);
