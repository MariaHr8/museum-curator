import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PictureState {
  images: Array<{ id: string; url: string; frameUrl: string }>;
  framesEnabled: boolean;
  autoGrid: boolean;
}

const initialState: PictureState = {
  images: [],
  framesEnabled: true,
  autoGrid: true,
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
      state.framesEnabled = true;
    },
    hideFrames: (state) => {
      state.framesEnabled = false;
    },
    setAutoArrangementOn: (state) => {
      state.autoGrid = true;
    },
    setAutoArrangementOff: (state) => {
      state.autoGrid = false;
    },
  },
});

export const {
  addImage,
  removeImage,
  clearImages,
  showFrames,
  hideFrames,
  setAutoArrangementOff,
  setAutoArrangementOn,
} = pictureSlice.actions;
export default pictureSlice.reducer;
