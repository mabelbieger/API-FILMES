import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn, GenreFilter } from "./style";
import { Link } from "react-router-dom";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres))
      .catch((err) => console.error(err));
  }, [KEY]);

  useEffect(() => {
    const genreString = selectedGenres.join(",");
    const url =
      selectedGenres.length > 0
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${genreString}&language=pt-BR`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, [KEY, selectedGenres]);

  function handleGenreChange(e) {
    const genreId = Number(e.target.value);
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  }

  return (
    <Container>
      <h1>Filmes!</h1>

        <h2>Filtrar categorias:</h2>
      <GenreFilter>
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              value={genre.id}
              onChange={handleGenreChange}
              checked={selectedGenres.includes(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </GenreFilter>
      <MovieList>
        {movies.map((movie) => (
          <Movie key={movie.id}>
            <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
            <span>{movie.title}</span>
            <Link to={`/${movie.id}`}>
              <Btn>Detalhes</Btn>
            </Link>
          </Movie>
        ))}
      </MovieList>
    </Container>
  );
}

export default Home;
