import axios from 'axios';


const API = 'https://yts.mx/api/v2/list_movies.json';

const BestMovies = () => {
    var res = axios.get(API + '?sort_by=rating');
    return res;
    }

    const MovieSearch = (searchTerm) => {
        console.log(searchTerm)
        var res = axios.get(API + '?query_term=' + searchTerm);
        return res;
    }

export default {
    BestMovies,
    MovieSearch
}
