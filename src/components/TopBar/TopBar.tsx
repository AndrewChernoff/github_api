import Button from '@mui/material/Button';
import { fetchRepos, repos, setErrorMessage, setPage, setTitle } from "../../redux/features/reposSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ChangeEvent } from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import s from "./TopBar.module.scss";

export const TopBar = () => {
  const dispatch = useAppDispatch()

  const {order, sortParam, title, status, errorMessage} = useAppSelector(repos)

  const findRepos = () => {
    
    dispatch(fetchRepos({name: title, order, sortParam, page: 0, portion: 10})).unwrap()
    .then(() => {
      dispatch(setPage(0))
      localStorage.setItem('search-input', title)
    })
  }


  const handleClose = (
    __event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorMessage(null))
  };

const onTitleChange = (e: ChangeEvent<HTMLInputElement> ) =>  dispatch(setTitle(e.currentTarget.value))

  return (
    <>
    <div className={s.topbar}>
      <div className={s.topbar__search}>
        <input value={title} placeholder="Введите поисковый запрос" onChange={onTitleChange} />
      </div>
      <Button className={s.topbar__btn} disabled={title.trim().length === 0} onClick={findRepos} variant="contained">Искать</Button>
    </div>
    
    {status === 'pending' && <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>}

    {
      errorMessage && <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
      
    }
    </>
  );
};
