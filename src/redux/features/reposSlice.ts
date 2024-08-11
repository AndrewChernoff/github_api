import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { api, ParamsType } from '../../api/api'
import { RepositoryType, ReposResponseType } from '../../types/types'

// Define a type for the slice state
export interface State {
    errorMessage: string | null
    status: 'idle' | 'pending' | 'error'
    total_count: number
    items: RepositoryType[] | null
}

// Define the initial state using that type
const initialState: State = {
    errorMessage: null,
    status: 'idle',
    total_count: 0,
    items: null
}

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<ReposResponseType>) => {
        state.items = action.payload.items
        state.total_count = action.payload.total_count
        state.status = 'idle' 
      })
  }

})

export const fetchRepos = createAsyncThunk<
  ReposResponseType,
  ParamsType
>('repos/fetchRepos', async ({name, order, sortParam, page, portion}, __) => {
  const res = await api.getRepos({name, order, sortParam, page, portion})
  return res.data
})

/* export const { increment, decrement, incrementByAmount } = reposSlice.actions */

export const repos = (state: RootState) => state.repos.items

export default reposSlice.reducer