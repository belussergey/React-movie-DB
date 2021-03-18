import React, {useCallback, useEffect, useState} from 'react';
import styles from '../FilmList/FilmList.module.css';
import Film from '../Film/Film';
import Paginator from '../Paginator/Paginator';
import {useHistory, useParams} from 'react-router';

const FilmList = () => {
    const [filmData, setFilmData] = useState(null);
    const history = useHistory();
    const {page} = useParams();
    const currentPage = +page || 1;

    const fetchDataFilms = useCallback(async () => {
        const url = `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();

        setFilmData(data);
    }, [currentPage]);

    const onPage = useCallback(({selected}) => {
        history.push('/' + (selected + 1));
    }, [history]);

    useEffect(() => {
        fetchDataFilms();
    }, [fetchDataFilms, currentPage]);

    return (
        <>
            <div className={styles.container}>
                {filmData?.results.map((film) => <Film key={film.id} data={film} currentPage={currentPage}/>)}
            </div>
            <Paginator
                initialPage={currentPage ? currentPage - 1 : 0}
                pageCount={filmData?.total_pages}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                onPageChange={onPage}
            />
        </>
    );
};

export default FilmList;
