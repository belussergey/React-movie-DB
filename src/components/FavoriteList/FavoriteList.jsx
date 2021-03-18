import React, {useCallback, useState} from 'react';
import Favorite from '../Favorite/Favorite';
import {getFavorites} from '../../common/utils';
import styles from '../FavoriteList/FavoriteList.module.scss';

const FavoriteList = () => {
    const [favoritesList, setFavoritesList] = useState(getFavorites());

    const handleRemoveItem = useCallback(() => {
        setFavoritesList(getFavorites());
    }, []);

    return (
        <div className={styles.container}>
            <h2>{favoritesList.length ? 'Мои избранные фильмы' : 'К сожалению, в вашем избранном пока пусто'}</h2>
            {favoritesList.map(filmFavorite => <Favorite key={filmFavorite.id} data={filmFavorite}
                                                         onRemove={handleRemoveItem}/>)}
        </div>
    );
};

export default FavoriteList;
