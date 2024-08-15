import Button from '@mui/material/Button';
import { fetchRepos, repos, setPage, setTitle } from "../../redux/features/reposSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import s from "./TopBar.module.scss";
import { ChangeEvent } from 'react';

export const TopBar = () => {
  const dispatch = useAppDispatch()

  const {order, sortParam, title} = useAppSelector(repos)

  const findRepos = () => {
    
    dispatch(fetchRepos({name: title, order, sortParam, page: 0, portion: 10})).unwrap()
    .then(() => {
      dispatch(setPage(0))
      localStorage.setItem('search-input', title)
    })
    
}

const onTitleChange = (e: ChangeEvent<HTMLInputElement> ) =>  dispatch(setTitle(e.currentTarget.value))

  return (
    <div className={s.topbar}>
      <div className={s.topbar__search}>
        <input value={title} placeholder="Введите поисковый запрос" onChange={onTitleChange} />
      </div>
      <Button className={s.topbar__btn} disabled={title.trim().length === 0} onClick={findRepos} variant="contained">Искать</Button>
    </div>
  );
};
