import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const res = data.results;
                let filme = res.find((key) => {
                    return key.id == id;
                });
                setMovie(filme);
            });

        fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`
        )
            .then((response) => response.json())
            .then((data) => {
                const videos = data.results;
                const trailerVideo = videos.find(
                    (video) => 
                        video.type === "Trailer" && 
                        video.site === "YouTube"
                );
                
                if (!trailerVideo) {
                    return fetch(
                        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const videosEn = data.results;
                            const trailerVideoEn = videosEn.find(
                                (video) => 
                                    video.type === "Trailer" && 
                                    video.site === "YouTube"
                            );
                            if (trailerVideoEn) {
                                setTrailer(trailerVideoEn.key);
                            }
                        });
                } else {
                    setTrailer(trailerVideo.key);
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar trailer:", error);
            });
        // eslint-disable-next-line
    }, [id]);

    const handleTrailerToggle = () => {
        setShowTrailer(!showTrailer);
    };

    return (
        <div>
            <nav>
                <h1>Filme</h1>
            </nav>
            <img
                className="img_movie"
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="container">
                <h1>{movie.title}</h1>
                <h3>Data de lançamento: {movie.release_date}</h3>
                <div className="descricao">
                    <h4>Descrição: </h4>
                    <p className="movie-desc">{movie.overview}</p>
                </div>
                
                {/* Botões de ação */}
                <div className="action-buttons">
                    {trailer && (
                        <button 
                            className="trailer-button" 
                            onClick={handleTrailerToggle}
                        >
                            {showTrailer ? "Fechar Trailer" : "🎬 Assistir Trailer"}
                        </button>
                    )}
                    
                    <Link to="/">
                        <button className="link_button">Voltar</button>
                    </Link>
                </div>
                
                {/* Container do Trailer */}
                {showTrailer && trailer && (
                    <div className="trailer-container">
                        <iframe
                            width="100%"
                            height="400"
                            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0`}
                            title={`Trailer de ${movie.title}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Movie;