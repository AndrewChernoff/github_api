import { ChangeEvent } from "react";
import Button from '@mui/material/Button';
import { fetchRepos, repos } from "../../redux/features/reposSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import s from "./TopBar.module.scss";

type PropsType = {
  title: string
  onTitleChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export const TopBar = ({title, onTitleChange}: PropsType) => {
  const dispatch = useAppDispatch()

  const {order, sortParam} = useAppSelector(repos)

  const findRepos = () => {
    dispatch(fetchRepos({name: title, order, sortParam, page: 1, portion: 10}))
       
}

  return (
    <div className={s.topbar}>
      <div className={s.topbar__search}>
        <input value={title} placeholder="Введите поисковый запрос" onChange={onTitleChange} />
      </div>
      <Button className={s.topbar__btn} disabled={title.trim().length === 0} onClick={findRepos} variant="contained">Искать</Button>
    </div>
  );
};
