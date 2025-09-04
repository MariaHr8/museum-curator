import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PictureState {
  images: Array<{ id: string; url: string; frameUrl: string }>;
  framesEnabled: boolean;
}

const initialState: PictureState = {
  images: [],
  framesEnabled: true,
};

const pictureSlice = createSlice({
  name: "picture",
  initialState: initialState,
  reducers: {
    addImage: (
      state,
      action: PayloadAction<{ id: string; url: string; frameUrl: string }>
    ) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action: PayloadAction<{ id: string }>) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload.id
      );
    },
    clearImages: (state) => {
      state.images = [];
    },
    showFrames: (state) => {
      console.log("Showing frames");
      state.framesEnabled = true;
    },
    hideFrames: (state) => {
      console.log("Hiding frames");
      state.framesEnabled = false;
    },
  },
});

export const { addImage, removeImage, clearImages, showFrames, hideFrames } =
  pictureSlice.actions;
export default pictureSlice.reducer;
