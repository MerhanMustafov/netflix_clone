import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    // headers: {'X-Custom-Header': 'foobar'}
});

// instance.get('/fight_club') == 'https://api.themoviedb.org/3/fight_club'

export default instance