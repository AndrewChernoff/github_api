import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { api, ParamsType } from '../../api/api'
import { Nullable, RepositoryType, ReposResponseType } from '../../types/types'
import { OrderType, RowsPerPageType, SortParamType } from './types';

// Define a type for the slice state
export interface State {
    title: string;  
    sortParam: SortParamType;
    order: OrderType
    rowsPerPage: RowsPerPageType
    page: number
    errorMessage: Nullable<string>
    status: 'idle' | 'pending' | 'error'
    totalCount: number
    items: Nullable<RepositoryType[]>
}

// Define the initial state using that type
const initialState: State = {
    title: '',
    sortParam: 'stars',
    order: 'desc',
    rowsPerPage: 10,
    page: 0,
    errorMessage: null,
    status: 'idle',
    totalCount: 0,
    items: null
}

export const reposSlice: Slice<State> = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setSortParam: (state, action: PayloadAction<SortParamType>) => {
      state.sortParam = action.payload
    },
    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload
    },
    setRowsPerPage: (state, action: PayloadAction<RowsPerPageType>) => {
      state.page = 1
      state.rowsPerPage = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },

  },
  extraReducers: builder => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.errorMessage = null
        state.status = 'pending'
      })
      .addCase(fetchRepos.fulfilled, (state, action: PayloadAction<ReposResponseType>) => {
        state.items = action.payload.items
        state.totalCount = action.payload.total_count
        state.status = 'idle' 
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.status = 'idle';
        const errorMessage = action.payload ? (action.payload as { message?: string }).message : 'Something went wrong!';
        state.errorMessage = errorMessage || 'Something went wrong!';
      });
  }

})

export const fetchRepos = createAsyncThunk<
  ReposResponseType,
  ParamsType
// eslint-disable-next-line no-empty-pattern
>('repos/fetchRepos', async ({name, order, sortParam, page, portion}, {rejectWithValue}) => {
  const res = await api.getRepos({name, order, sortParam, page, portion})
  
  if(res.status === 200) {    
    return res.data
  } else {
    return rejectWithValue(res.data.message);
  }
  
})

export const { setSortParam, setOrder, setRowsPerPage, setPage, setTitle } = reposSlice.actions

export const repos = (state: RootState) => state.repos

export default reposSlice.reducer