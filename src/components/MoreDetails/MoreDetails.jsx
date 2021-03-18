import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../components/MoreDetails/MoreDetails.module.scss';
import {useHistory, useParams} from 'react-router';
import {addFavoriteFilm, checkFavorite, loadPage, removeFavorite} from '../../common/utils';
import icon from '../../images/next.svg';

const MoreDetails = () => {
    const [film, setFilm] = useState();
    const history = useHistory();
    const {id, page} = useParams();
    const [isFavorite, setIsFavorite] = useState(checkFavorite(id));

    const styleBack = {
        backgroundImage: film && `url(http://image.tmdb.org/t/p/w342/${film.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
    };

    const fetchFilm = useCallback(async () => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-RU`;
        const response = await fetch(url);
        const data = await response.json();

        setFilm(data);
    }, [id]);

    const handleOnBackList = useCallback(() => {
        history.push(`/${page}`);
    }, [history, page]);

    const handleAddFavorite = useCallback(() => {
        addFavoriteFilm(film);
        setIsFavorite(true);
    }, [film]);

    const handleRemoveFavorite = useCallback(() => {
        removeFavorite(id);
        setIsFavorite(false);
    }, [id]);

    const handleOnNextFilm = useCallback(async () => {
        let currentPageData = await loadPage(page);
        let films = currentPageData.results;
        let currentFilmIndex = films.findIndex((film) => film.id === +id);
        let nextIndex = currentFilmIndex + 1;
        let nextPage = +page;

        if (currentFilmIndex + 1 === films.length) {
            currentPageData = await loadPage(+page + 1);
            films = currentPageData.results;
            nextPage += 1;
            nextIndex = 0;
        }

        setIsFavorite(checkFavorite(films[nextIndex].id));
        history.push(`/details/${nextPage}/${films[nextIndex].id}`);
    }, [history, id, page]);

    useEffect(() => {
        fetchFilm();
    }, [fetchFilm]);

    return (
        <div style={styleBack}>
            {film && <div className={styles.containerBlur}>
                <div className={styles.container}>
                    <div className={styles.containerBtn}>
                        <button className={styles.buttonMenu} onClick={handleOnBackList}>
                            <img className={styles.iconLeft} src={icon} alt={''}/>Вернуться к списку
                        </button>
                        <button className={styles.buttonMenu} onClick={handleOnNextFilm}>
                            Следующий фильм<img className={styles.iconRight} src={icon} alt={''}/>
                        </button>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`http://image.tmdb.org/t/p/w342/${film.poster_path}`} alt={film.title}/>
                        <div className={styles.cont}>
                            <div className={styles.infoContainer}>
                                <h3 className={styles.titleContainer}>{film.title}</h3>
                                <div className={styles.ratingContainer}>
                                    <span>Оценка: {film.vote_average}</span>
                                    <span>Рейтинг: R</span>
                                    <span>Дата релиза: {film.release_date}</span>
                                </div>
                                <span className={styles.description}>
                        {film.overview}
                    </span>
                            </div>
                            <button className={styles.buttonHover}
                                    onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
                                {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default MoreDetails;
