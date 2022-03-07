import { SUPPORT_CHATS_LOADING, SUPPORT_CHATS_ERROR, SUPPORT_CHATS_SET_USERS, SUPPORT_CHATS_SET_CHATS, SUPPORT_CHATS_PUSH_CHAT } from "./constants";
  const initialState = {
    loading: false,
    errorMessage: {},
    users:[],
    userCount: 0,
    chats: []
  };
  
  export function supportChatsReducer(state = initialState, action) {
    switch (action.type) {
      case SUPPORT_CHATS_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case SUPPORT_CHATS_ERROR:
        return {
          ...state,
          errorMessage: action.payload,
        };
      case SUPPORT_CHATS_SET_USERS:
        return {
          ...state,
          users: action.payload.data,
          userCount: action.payload.count
        }
      case SUPPORT_CHATS_SET_CHATS:
        return {
          ...state,
          chats: action.payload
        }
      case SUPPORT_CHATS_PUSH_CHAT:
        let chats = state.chats;
        chats.push(action.payload)
        return {
          ...state,
          chats: [...chats]
        }
      default:
        return state;
    }
  }