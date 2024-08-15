import { Nullable, RepositoryType } from "../../types/types";
import star from '../../assets/starred.svg'
import { useEffect, useState } from "react";
import s from "./ChosenRepo.module.scss";

type PropsType = {
  repo: Nullable<RepositoryType>;
};

export const ChosenRepo = ({ repo }: PropsType) => {

  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const repoCN = scrollHeight > 80 ?  s.repo__fixed : s.repo

  return (
    <div className={repoCN}>
      {!repo ? (
        <h4>Выберите репозитарий</h4>
      ) : (
        <div className={s.repo__content}>
          <h3>{repo.name}</h3>

          <div className={s.repo__info}>
                <div className={s.repo__info_main}>
                    <div className={s.repo__info_lang}>{repo.language ? repo.language : 'Язык не указан'}</div>
                    <div className={s.repo__info_stars}>
                      <img src={star} />  
                      <p>{repo.size}</p>
                    </div>
                </div>
                <div className={s.repo__info_secondary}>
                    <div className={s.repo__info_item}>{repo.private ? 'private' : 'public'}</div>
                    <div className={s.repo__info_item}>forks: {repo.forks_count}</div>
                </div>

                <div>{repo?.license ? `${repo.license.name} license`: 'Нет лицензии'}</div>
          </div>
        </div>
      )}
    </div>
  );
};
