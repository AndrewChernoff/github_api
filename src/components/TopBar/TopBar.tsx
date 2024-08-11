import { ChangeEvent, useState } from "react";
import Button from '@mui/material/Button';
import { fetchRepos } from "../../redux/features/reposSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import s from "./TopBar.module.scss";

export const TopBar = () => {
  const [title, setTitle] = useState("");
  const dispatch = useAppDispatch()

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const findRepos = () => {
    dispatch(fetchRepos({name: title, order: "desc", sortParam: 'stars', page: 1, portion: 4}))
       
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
