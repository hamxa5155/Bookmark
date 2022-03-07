import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import {
  fetchChats,
  sendMessage,
  fetchLiveUsers,
} from "../../store/supportChats/actions";
import { useRouteMatch } from "react-router-dom";
import moment from "moment";
import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../config/index";
import axios from "axios";
import { API_URL } from "../../config/index";
import $ from "jquery";
import "./chatBox.scss";
export const ChatBox = (props) => {
  const match = useRouteMatch();
  const socket = socketIOClient(BASE_URL);

  useEffect(() => {
    console.log("ssssssssssssss");
    props.fetchChats(match.params.id);
    socket.on("admin_chats", () => {
      props.fetchChats(match.params.id);
    });

    var $target = $(".card-body");
    $target.animate({ scrollTop: $target.height() + 2000000 }, 1000);
  }, []);
  useEffect(() => {
    if (props.chats.length) {
      axios
        .post(`${API_URL}chat/mark-as-seen`, {
          chatIds: JSON.stringify(
            props.chats
              .filter((c) => c.sender === "user" && c.seen === false)
              .map((d) => d._id)
          ),
        })
        .then(() => {
          props.fetchLiveUsers(0, 50);
        });
    }
  }, [props.chats]);
  const [message, setMessage] = React.useState("");
  const handleSendMessage = async (e) => {
    console.log("in handelsendmessage");
    e.preventDefault();
    const formData = {
      message,
      session_id: props.chats[0].chat_user_id.session_id,
      user_id: props.chats[0].chat_user_id.user_id,
      chat_user_id: props.chats[0].chat_user_id._id,
    };
    await props.sendMessage(formData);
    setMessage("");
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        className="chatbox-wrapper"
        style={{ height: "100vh", backgroundColor: "white" }}
      >
        <Grid
          container
          xs={8}
          item
          alignItems="baseline"
          style={{ backgroundColor: "white" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="card" style={{ width: "85%", height: "89vh" }}>
                  <div className="card-header text-center ">
                    <span
                      style={{
                        color: "blue",
                        fontSize: "30px",
                        fontWeight: "800",
                      }}
                    >
                      Chat Box
                    </span>
                  </div>
                  <div className="card-body chat-care">
                    <ul className="chat">
                      {props.chats.map((chat, i) => (
                        <React.Fragment key={i}>
                          {chat.sender === "user" ? (
                            <li className="agent clearfix">
                              <span className="chat-img left clearfix mx-2">
                                <img
                                  src="https://via.placeholder.com/50.png/55C1E7/fff?text=U"
                                  alt="Agent"
                                  // width="36px"
                                  // height="36px"
                                  className="img-circle"
                                />
                              </span>
                              <div className="chat-body clearfix">
                                <div className="header clearfix">
                                  <strong className="primary-font">
                                    {chat.user_id
                                      ? chat.user_id.name
                                      : "Guest User"}
                                  </strong>{" "}
                                  <small className="right text-muted">
                                    <span className="glyphicon glyphicon-time"></span>
                                    {moment
                                      .utc(chat.updated_on)
                                      .startOf("hour")
                                      .fromNow()}
                                  </small>
                                </div>
                                <p>{chat.message}</p>
                                {chat.image !== "N/A" && (
                                  <img
                                    src={`${BASE_URL}uploads/${chat.image}`}
                                    alt=""
                                    width="200"
                                    height="200"
                                  />
                                )}
                              </div>
                            </li>
                          ) : (
                            <li className="admin clearfix">
                              <span className="chat-img right clearfix  mx-2">
                                <img
                                  src="https://via.placeholder.com/50.png/FA6F57/fff?text=ME"
                                  alt="Admin"
                                  className="img-circle"
                                />
                              </span>
                              <div className="chat-body clearfix">
                                <div className="header clearfix">
                                  <small className="left text-muted">
                                    <span className="glyphicon glyphicon-time"></span>
                                    {moment
                                      .utc(chat.updated_on)
                                      .startOf("hour")
                                      .fromNow()}
                                  </small>
                                  <strong className="right primary-font">
                                    yBooky Support
                                  </strong>
                                </div>
                                <p>{chat.message}</p>
                              </div>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <form onSubmit={handleSendMessage}>
                      <div className="input-group">
                        <input
                          id="btn-input"
                          type="text"
                          className="form-control"
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          style={{
                            padding: 19,
                            borderRadius: "0px",
                            marginTop: "1px",
                          }}
                        />
                        <span className="input-group-btn">
                          <button
                            className="btn btn-primary"
                            id="btn-chat"
                            type="submit"
                            style={{
                              padding: 8,
                              borderRadius: "0px",
                              height: "100%",
                              marginTop: "0px",
                            }}
                          >
                            Send
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  chats: state.supportChats.chats,
});

const mapDispatchToProps = {
  fetchChats,
  sendMessage,
  fetchLiveUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
