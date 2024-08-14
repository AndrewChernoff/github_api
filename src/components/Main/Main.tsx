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
import s from "./Main.module.scss";

type PropsType = {
  title: string;
};


export const Main = ({ title }: PropsType) => {
  const dispatch = useAppDispatch();
  //const [page, setPage] = useState(1);//0
  const [repoData, setRepoData] = useState<Nullable<RepositoryType>>(null); /// data for watching more info on repo
  const { items, totalCount, order, sortParam, rowsPerPage, page } = useAppSelector(repos);


  const onGetDataHandler = ({ repoName, ownerName }: ChosenRepoParamsType) => {
    api.getRepo({ repoName, ownerName }).then((res) => setRepoData(res.data));
  };

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    //setPage(newPage);
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
        name: title,
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
          name: title,
          order,
          sortParam,
          page: page,
          portion: rowsPerPage,
        })
      );
    } else {
      dispatch(setOrder("asc"))
      dispatch(
        fetchRepos({
          name: title,
          order,
          sortParam,
          page: page,
          portion: rowsPerPage,
        })
      );
    }
  };


  if(items?.length === 0) {
    return <h1 className={s.notFound}>Не найдено</h1>
  }

  return (
    <div className={s.main}>
      {/* {items?.length === 0 && <h1>Не найдено</h1>} */}
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
                <th onClick={() => dispatch(setSortParam("name"))}>Название </th>
                <th onClick={() => dispatch(setSortParam("language"))}>Язык </th>
                <th onClick={() => dispatch(setSortParam("forks"))}>Число форков</th>
                <th onClick={() => dispatch(setSortParam("stars"))}>Число звезд</th>
                <th onClick={() => dispatch(setSortParam("updatedAt"))}>
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
