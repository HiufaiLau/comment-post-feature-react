import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// step 1 initialState
const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

// step 2 createSlice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // send a properlx formated object
    postAdded: {
      reducer(state, action) {
        // only with createSlice
        state.push(action.payload);
      },
      // add callback function to prepare the payload object for the reducer function
      // this is where we can add the id property to the payload object
      // instead of handle the payload structure in the component
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // find the post by id
      const existingPost = state.find((post) => post.id === postId);
      // if the post exist, add the reaction
      if (existingPost) {
        // only with createSlice
        existingPost.reactions[reaction]++;
      }
    },
  },
});

//selector function
export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
