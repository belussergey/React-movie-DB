import React, {useCallback} from 'react';
import styles from './Favorite.module.scss';
import img from '../../images/icon-movies.png';
import {removeFavorite} from '../../common/utils';

const Favorite = ({data: {id, poster_path, overview, title}, onRemove}) => {

    const handleRemoveFavorite = useCallback(() => {
        removeFavorite(id);
        onRemove();
    }, [id, onRemove]);

    return (
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <img src={`http://image.tmdb.org/t/p/w342${poster_path}`} alt={''}/>
                <div className={styles.descriptionContainer}>
                    <h3>{title}</h3>
                    <span>
                        {overview}
                    </span>
                </div>
                <button onClick={handleRemoveFavorite}>Удалить из избранного</button>
            </div>
        </div>
    );
};

export default Favorite;
