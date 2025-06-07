import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import likesService from './likesService'

// Get likes from localStorage
const likes = JSON.parse(localStorage.getItem('likes'))

const initialState = {
    likedAssetIds: likes ? likes : [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// Obtener likes
export const fetchLikedAssets = createAsyncThunk(
  'likes/fetchLikedAssets',
  async (userId, thunkAPI) => {
    try {
        return await likesService.getLikedAssets(userId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkaxios.rejectWithValue(message)
    }
  }
)

// Darle like al asset
export const like = createAsyncThunk(
  'likes/like',
  async ({ userId, assetId }, thunkAPI) => {
    try {
      return await likesService.likeAsset(userId, assetId)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkaxios.rejectWithValue(message)
    }
  }
)

// Eliminar like
export const unlike = createAsyncThunk(
    'likes/unlike',
    async (id, thunkAPI) => {
        try {
        return await likesService.unlikeAsset(id)
        } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkaxios.rejectWithValue(message)
        }
    }
)

export const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        resetLikesState: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchLikedAssets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchLikedAssets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.likedAssetIds = action.payload
        })
        .addCase(fetchLikedAssets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(like.fulfilled, (state, action) => {
            if (!state.likedAssetIds.includes(action.payload)) {
                state.likedAssetIds.push(action.payload)
            }
        })
        .addCase(unlike.fulfilled, (state, action) => {
            // state.likedAssetIds = state.likedAssetIds.filter(id => id !== action.payload)
            // console.log("Payload:", action.payload);
            // state.likedAssetIds = state.likedAssetIds.filter(obj => obj._id !== action.payload);
            const deletedId = action.payload.message;
            state.likedAssetIds = state.likedAssetIds.filter(obj => obj._id !== deletedId);
        })
    },
})

export const { resetLikesState } = likesSlice.actions
export default likesSlice.reducer