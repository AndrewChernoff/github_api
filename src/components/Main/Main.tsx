import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchRepos, repos, setOrder, setPage, setRowsPerPage, setSortParam } from "../../redux/features/reposSlice";
import { convertData } from "../../utils/convertData";
import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  ChosenRepoParamsType,
  Nullable,
  RepositoryType,
} from "../../types/types";
import { api } from "../../api/api";
import { ChosenRepo } from "../ChosenRepo/ChosenRepo";
import arrow from "../../assets/arrow.svg";
import { SortParamType } from "../../redux/features/types";
import s from "./Main.module.scss";


export const Main = () => {
  const dispatch = useAppDispatch();
  const [repoData, setRepoData] = useState<Nullable<RepositoryType>>(null); /// data for watching more info on repo
  const { items, totalCount, order, sortParam, rowsPerPage, page, title } = useAppSelector(repos);
  const searchInputValue = localStorage.getItem('search-input') ///made  for avoiding bug with searching


  console.log(searchInputValue);
  

  const onGetDataHandler = ({ repoName, ownerName }: ChosenRepoParamsType) => {
    api.getRepo({ repoName, ownerName }).then((res) => setRepoData(res.data));
  };

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setPage(newPage));
    dispatch(
      fetchRepos({
        name: title,
        order,
        sortParam,
        page: newPage + 1,
        portion: rowsPerPage,
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value)));
    dispatch(
      fetchRepos({
        name: searchInputValue || ''/* title */,
        order,
        sortParam,
        page: page,
        portion: +event.target.value,
      })
    );
    dispatch(setPage(1));//0
  };

  const onChangeOrder = () => {
    if (order === "asc") {
      dispatch(setOrder("desc"))
      dispatch(
        fetchRepos({
          name: searchInputValue || ''/* title */,
          order: 'desc',
          sortParam,
          page: page,
          portion: rowsPerPage,
        })
      );
      dispatch(setPage(0));//0
    } else {
      dispatch(setOrder("asc"))
      dispatch(
        fetchRepos({
          name: title,
          order: 'acs',
          sortParam,
          page: page,
          portion: rowsPerPage,
        })
      );
      dispatch(setPage(0));//0
    }
  };

  const changeSortParam = (value: SortParamType) => dispatch(setSortParam(value))

  const paramCN = (param: string) =>  sortParam ===param ? s.activeParam : ''


  if(items?.length === 0) {
    return <h1 className={s.notFound}>Не найдено</h1>
  }

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
                <img
                  src={arrow}
                  onClick={onChangeOrder}
                  className={order === "asc" ? s.arrow : s.arrow__upsideDown}
                />
                <th onClick={() => changeSortParam("name")} className={paramCN("name")}>Название</th>
                <th onClick={() => changeSortParam("language")} className={paramCN("language")}>Язык </th>
                <th onClick={() => changeSortParam("forks")} className={paramCN("forks")}>Число форков</th>
                <th onClick={() => changeSortParam("stars")} className={paramCN("stars")}>Число звезд</th>
                <th onClick={() => changeSortParam("updatedAt")} className={paramCN("updatedAt")}>
                  Дата обновления
                </th>
              </thead>
              <tbody>
                {items.map((el) => (
                  <tr
                    key={el.id}
                    onClick={() =>
                      onGetDataHandler({
                        ownerName: el.owner.login,
                        repoName: el.name,
                      })
                    }
                    className={
                      repoData && el.id === repoData.id ? s.activeTR : ""
                    }
                  >
                    <td>{el.name}</td>
                    <td>{el.language || "---------"}</td>
                    <td>{el.forks_count}</td>
                    <td>{el.stargazers_count}</td>
                    <td>{convertData(el.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <TablePagination
            className={s.pagination}
              component="div"
              count={Math.round(totalCount / rowsPerPage)}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <ChosenRepo repo={repoData} />
        </>
      )}
    </div>
  );
};
