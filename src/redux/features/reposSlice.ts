import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { api, ParamsType } from '../../api/api'
import { RepositoryType, ReposResponseType } from '../../types/types'

// Define a type for the slice state
export interface State {
    errorMessage: string | null
    status: 'idle' | 'pending' | 'error'
    totalCount: number
    items: RepositoryType[] | null
}

// Define the initial state using that type
const initialState: State = {
    errorMessage: null,
    status: 'idle',
    totalCount: 0,
    items: null
}

export const reposSlice: Slice<State> = createSlice({
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
        state.totalCount = action.payload.total_count
        state.status = 'idle' 
      })
  }

})

export const fetchRepos = createAsyncThunk<
  ReposResponseType,
  ParamsType
// eslint-disable-next-line no-empty-pattern
>('repos/fetchRepos', async ({name, order, sortParam, page, portion}, {}) => {
  const res = await api.getRepos({name, order, sortParam, page, portion})
  return res.data
})

/* export const { increment, decrement, incrementByAmount } = reposSlice.actions */

export const repos = (state: RootState) => state.repos

export default reposSlice.reducer