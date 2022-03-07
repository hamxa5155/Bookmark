import React, { useEffect, useState } from "react";
import "./styles.scss";
import $ from "jquery";
import socketIOClient from "socket.io-client";
// import io from "socket.io-client";
import { BASE_URL, API_URL } from "../config/index";
import axios from "axios";
import { FiSend, FiPaperclip } from "react-icons/fi";
import Sound from "react-sound";
import { AiOutlineUpload } from "react-icons/ai";
// io.set("browser client minification", true);
// const socket = io.connect(BASE_URL);
export function MyChatWidget(props) {
  const socket = socketIOClient(BASE_URL);
  const [chatCount, setChatCount] = useState(0);
  const [filename, setFilename] = useState("");

  const fetchChats = () => {
    axios
      .get(
        `${API_URL}chat/fetch-user-chats?session_id=${localStorage.getItem(
          "USERID"
        )}`
      )
      .then(async (response) => {
        setChatCount(
          response.data.filter((c) => c.sender === "admin" && c.seen === false)
            .length
        );
        response.data.map((chat) => {
          var messagesContainer = $(".messages");

          if (chat.sender === "admin") {
            let html = "";
            if (chat.image !== "N/A") {
              html = `<li class="self">${chat.message}<img src="${BASE_URL}uploads/${chat.image}" width="200" height="100" style="margin-left:5px"/></li>`;
            } else html = `<li class="self">${chat.message}</li>`;
            messagesContainer.append(html);
          } else {
            let html = "";
            if (chat.image !== "N/A") {
              html = `<li class="other">${chat.message}<img src="${BASE_URL}uploads/${chat.image}" width="200" height="100" style="margin-left:5px"/></li>`;
            } else html = `<li class="other">${chat.message}</li>`;
            messagesContainer.append(html);
          }
          messagesContainer.finish().animate(
            {
              scrollTop: messagesContainer.prop("scrollHeight"),
            },
            250
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchChats();
    var element = $(".floating-chat");
    var myStorage = localStorage;

    if (!myStorage.getItem("chatID")) {
      myStorage.setItem("chatID", createUUID());
    }

    setTimeout(function () {
      element.addClass("enter");
    }, 1000);

    // element.click(openElement);
    element.on("click", openElement);

    function openElement() {
      setChatCount(0);
      var messages = element.find(".messages");
      var textInput = element.find(".text-box");
      element.find(">i").hide();
      element.addClass("expand");
      element.find(".chat").addClass("enter");
      var strLength = textInput.val().length * 2;
      // textInput.keydown(onMetaAndEnter).prop('disabled', false).focus();
      textInput.on("keydown", onMetaAndEnter).prop("disabled", false).focus();
      element.off("click", openElement);
      // element.find('.header button').click(closeElement);
      element.find(".header button").on("click", closeElement);
      element.find("#sendMessage").on("click", sendNewMessage);
      messages.scrollTop(messages.prop("scrollHeight"));

      axios
        .get(
          `${API_URL}chat/fetch-user-chats?session_id=${localStorage.getItem(
            "USERID"
          )}`
        )
        .then(async (response) => {
          axios.post(`${API_URL}chat/mark-as-seen`, {
            chatIds: JSON.stringify(
              response.data
                .filter((c) => c.sender === "admin" && c.seen === false)
                .map((d) => d._id)
            ),
          });
        });
    }

    function closeElement() {
      element.find(".chat").removeClass("enter").hide();
      element.find(">i").show();
      element.removeClass("expand");
      element.find(".header button").off("click", closeElement);
      element.find("#sendMessage").off("click", sendNewMessage);
      element
        .find(".text-box")
        .off("keydown", onMetaAndEnter)
        .prop("disabled", true)
        .blur();
      setTimeout(function () {
        element.find(".chat").removeClass("enter").show();
        element.click(openElement);
      }, 500);
    }

    function createUUID() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    }

    function sendNewMessage() {
      console.log("dsdsdsds");
      var userInput = $(".text-box");
      var file_data = $("#chat-img").prop("files")[0];
      var newMessage = userInput
        .html()
        .replace(/\<div\>|\<br.*?\>/gi, "\n")
        .replace(/\<\/div\>/g, "")
        .trim()
        .replace(/\n/g, "<br>");

      if (!newMessage && typeof file_data === "undefined") return;

      var messagesContainer = $(".messages");

      let html = "";
      if (file_data) {
        html = `<li class="other">${newMessage}<img src="${URL.createObjectURL(
          file_data
        )}" width="200" height="100"/></li>`;
      } else html = `<li class="other">${newMessage}</li>`;

      messagesContainer.append(html);

      // clean out old message
      userInput.html("");
      setFilename("");
      document.querySelector("#chat-img").value = "";
      // focus on input
      userInput.focus();

      messagesContainer.finish().animate(
        {
          scrollTop: messagesContainer.prop("scrollHeight"),
        },
        250
      );
      if (file_data) {
        let formData = new FormData();
        formData.append("photo", file_data);
        axios
          .post(`${API_URL}chat/upload-picture`, formData)
          .then(async (response) => {
            // axios.post(`${API_URL}chat/sendemail`, formData);
            socket.emit("chats", {
              message: newMessage || "\n",
              user_id: localStorage.getItem("USERID"),
              is_loggedin: localStorage.getItem("PUBBY_TOKEN") ? "yes" : "no",
              filename: response.data.filename,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //emit socket event
        // axios.post(`${API_URL}chat/sendemail`, {
        //   message: newMessage,
        //   user_id: localStorage.getItem("USERID"),
        //   is_loggedin: localStorage.getItem("PUBBY_TOKEN") ? "yes" : "no",
        // });
        socket.emit("chats", {
          message: newMessage,
          user_id: localStorage.getItem("USERID"),
          is_loggedin: localStorage.getItem("PUBBY_TOKEN") ? "yes" : "no",
        });
      }
    }

    function onMetaAndEnter(event) {
      if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
      }
    }
  }, []);
  useEffect(() => {
    if (props.newMessage) {
      setChatCount(chatCount + 1);
      var messagesContainer = $(".messages");
      messagesContainer.append(
        ['<li class="self">', props.newMessage, "</li>"].join("")
      );
      messagesContainer.finish().animate(
        {
          scrollTop: messagesContainer.prop("scrollHeight"),
        },
        250
      );
      axios
        .get(
          `${API_URL}chat/fetch-user-chats?session_id=${localStorage.getItem(
            "USERID"
          )}`
        )
        .then(async (response) => {
          axios.post(`${API_URL}chat/mark-as-seen`, {
            chatIds: JSON.stringify(
              response.data
                .filter((c) => c.sender === "admin" && c.seen === false)
                .map((d) => d._id)
            ),
          });
        });
    }
  }, [props.newMessage]);
  return (
    <>
      <div className="chat2">
        <div className="floating-chat">
          {chatCount > 0 && (
            <div className="chat-count">
              <p>{chatCount}</p>
            </div>
          )}
          <i
            className="fa fa-comments"
            aria-hidden="true"
            style={{ fontSize: 30 }}
          ></i>
          <div className="chat">
            <div className="header">
              <span className="title text-center">
                Live Support 16-hr/day
                <br /> Guests Please Leave Email
              </span>
              <button>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <ul className="messages">
              {/* <li className="other">Hello</li>
          <li className="self">no... we're human</li> */}
            </ul>
            <div className="footer">
              <label class="custom-file-upload" style={{ cursor: "pointer" }}>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="chat-img"
                  id="chat-img"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => setFilename(e.target.files[0].name)}
                />
                <AiOutlineUpload color="white" size={22} />
              </label>
              {/* <input
                type="file"
                name="chat-img"
                id="chat-img"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFilename(e.target.files[0].name)}
              /> */}
              <div
                className="text-box"
                contenteditable="true"
                disabled="true"
              ></div>
              <button id="sendMessage">
                <FiSend />
              </button>
            </div>
            {filename !== "" && (
              <div
                className="d-flex justify-content-start align-items-center px-3"
                style={{
                  backgroundColor: "#eee",
                  color: "#000",
                  marginTop: 2,
                }}
              >
                <FiPaperclip style={{ marginLeft: 10 }} />
                <p style={{ marginTop: 5 }}>{filename}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export function openWidget() {
  var element = $(".floating-chat");
  var messages = element.find(".messages");
  element.find(">i").hide();
  element.addClass("expand");
  element.find(".chat").addClass("enter");
  element.off("click", openWidget);
  element.find(".text-box").focus();
  messages.scrollTop(messages.prop("scrollHeight"));
  axios
    .get(
      `${API_URL}chat/fetch-user-chats?session_id=${localStorage.getItem(
        "USERID"
      )}`
    )
    .then(async (response) => {
      axios.post(`${API_URL}chat/mark-as-seen`, {
        chatIds: JSON.stringify(
          response.data
            .filter((c) => c.sender === "admin" && c.seen === false)
            .map((d) => d._id)
        ),
      });
    });
}
