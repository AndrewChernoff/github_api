import { useAppSelector } from "../../hooks/reduxHooks";
import { repos } from "../../redux/features/reposSlice";
import { convertData } from "../../utils/convertData";
import s from "./Main.module.scss";

export const Main = () => {
  const items = useAppSelector(repos);

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
                  <tr>
                    <td scope="row">{el.name}</td>
                    <td>{el.language}</td>
                    <td>{el.forks_count}</td>
                    <td>{el.stargazers_count}</td>
                    <td>{convertData(el.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.main__result}>
            <h3>Выберите репозитарий</h3>
          </div>
        </>
      )}
    </div>
  );
};
