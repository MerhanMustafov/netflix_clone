import React, {useState, useEffect} from 'react'
import axios from '../axios.js'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

function Row({title, fetchUrl}) {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl) //====> 'https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US'
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    }, [fetchUrl]) 
    console.table(movies)
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => <img src={`${baseUrl}${movie.poster_path}`} alt={movie.name} />)}
            </div>
        </div>
    )
}

export default Row



