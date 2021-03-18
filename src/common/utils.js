const favoritesKey = 'favorites';

export const getFavorites = () => JSON.parse(localStorage.getItem(favoritesKey)) || [];

export const setFavorites = list => localStorage.setItem(favoritesKey, JSON.stringify(list));

export const addFavoriteFilm = film => setFavorites([...getFavorites(), film]);

export const checkFavorite = id => !!getFavorites().find(film => film.id === +id);

export const removeFavorite = id => setFavorites(getFavorites().filter(film => film.id !== +id))

export const loadPage = async (page) => {
    const url = `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=ru-Ru&page=${page}`;
    const response = await fetch(url);

    return await response.json();
}