
const chatSlice = createSlice({
    name:"chat",
    intialState:{
        chatroomId:"",
        chatroomMessage:"",
        chatroomName:"",
        chatroomProfile:""
    },
    reducers:{
        setChatroomId:(state,action)=>{
            state.chatroomId=action.payload;
        },
        setChatroomMessage:(state,action)=>{
            state.chatroomMessage=action.payload;
        },
        setChatroomName:(state,action)=>{
            state.chatroomName=action.payload;
        },
        setChatroomProfile:(state,action)=>{
            state.chatroomProfile=action.payload;
        }
    }
})

export const {setChatroomId,setChatroomMessage,setChatroomName,setChatroomProfile}= chatSlice.actions;
export const chatReducer= chatSlice.reducer;