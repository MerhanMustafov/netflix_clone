import React, { useState, useEffect } from "react";
import axios from "../axios.js";
import "../css/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "../css/Trailer.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); //====> 'https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US'
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.table(movies);

  const opts = {
    height: "390",
    weight: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && `row_poster_large`}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && (
        <YouTube className="trailer_video" videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
}

export default Row;
