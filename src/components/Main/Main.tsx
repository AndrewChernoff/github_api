import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchRepos, repos } from "../../redux/features/reposSlice";
import { convertData } from "../../utils/convertData";
import TablePagination from '@mui/material/TablePagination';
import { ChangeEvent, MouseEvent, useState } from "react";
import { ChosenRepoParamsType, Nullable, RepositoryType } from "../../types/types";
import { api } from "../../api/api";
import { ChosenRepo } from "../ChosenRepo/ChosenRepo";
import s from "./Main.module.scss";

type PropsType = {
  title: string
}


//owner, name
export const Main = ({title}: PropsType) => {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [repoData, setRepoData] = useState<Nullable<RepositoryType>>(null)  /// data for watching more info on repo
  const { items, totalCount } = useAppSelector(repos);
  


  const onGetDataHandler = ({repoName, ownerName}: ChosenRepoParamsType) => {
    api.getRepo({repoName, ownerName})
    .then((res) => setRepoData(res.data))
  }//setRepoData(data)

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    dispatch(fetchRepos({name: title, order: "desc", sortParam: 'stars', page: newPage + 1, portion: rowsPerPage})) ////added
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    dispatch(fetchRepos({name: title, order: "desc", sortParam: 'stars', page: page, portion: +event.target.value})) ////added
    setPage(0);
  };

  return (
    <div className={s.main}>
      {!items ? (
        <h1>Добро пожаловать</h1>
      ) : (
        <>
          <div className={s.main__table}>
            <h2>Результаты поиска</h2>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Язык</th>
                  <th>Число форков</th>
                  <th>Число звезд</th>
                  <th>Дата обновления</th>
                </tr>
              </thead>
              <tbody>
                {items.map((el) => (
                  <tr key={el.id} onClick={() => onGetDataHandler({ownerName: el.owner.login, repoName: el.name})}>
                    <td>{el.name}</td>
                    <td>{el.language || '---------'}</td>
                    <td>{el.forks_count}</td>
                    <td>{el.stargazers_count}</td>
                    <td>{convertData(el.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <TablePagination
            component="div"
            count={Math.round(totalCount / rowsPerPage)}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </div>
          <ChosenRepo repo={repoData}/>
        </>
      )}
    </div>
  );
};
