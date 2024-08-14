import { Nullable, RepositoryType } from "../../types/types";
import s from "./ChosenRepo.module.scss";

type PropsType = {
  repo: Nullable<RepositoryType>;
};

export const ChosenRepo = ({ repo }: PropsType) => {
  console.log(repo);

  return (
    <div className={s.repo}>
      {!repo ? (
        <h4>Выберите репозитарий</h4>
      ) : (
        <div className={s.repo__content}>
          <h3>{repo.name}</h3>

          <div className={s.repo__info}>
                <div className={s.repo__info_main}>
                    <div>{repo.language}</div>
                    <div>{repo.stargazers_count}</div>
                </div>
                <div className={s.repo__info_notmain}>
                    <div>{repo.license}</div>
                    <div>{repo.stargazers_count}</div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
};
