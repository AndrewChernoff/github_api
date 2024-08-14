import { Nullable, RepositoryType } from "../../types/types";
import s from "./ChosenRepo.module.scss";

type PropsType = {
  repo: Nullable<RepositoryType>;
};

export const ChosenRepo = ({ repo }: PropsType) => {
  console.log(repo?.license);

  return (
    <div className={s.repo}>
      {!repo ? (
        <h4>Выберите репозитарий</h4>
      ) : (
        <div className={s.repo__content}>
          <h3>{repo.name}</h3>

          <div className={s.repo__info}>
                <div className={s.repo__info_main}>
                    <div className={s.repo__info_lang}>{repo.language}</div>
                    <div className={s.repo__info_stars}>{repo.size}</div>
                </div>
                <div className={s.repo__info_secondary}>
                    <div className={s.repo__info_item}>{repo.private ? 'private' : 'public'}</div>
                    <div className={s.repo__info_item}>forks: {repo.forks_count}</div>
                </div>

               {/*  <div>{repo.homepage}</div> */}


                <div>{repo?.license?.name} license</div>
          </div>
        </div>
      )}
    </div>
  );
};
