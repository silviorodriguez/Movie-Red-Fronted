import { useEffect, useState } from 'react';
import { getMoviesService } from '@/services/userServices';
import SearchBar from '../components/SearchBar';
import '../styles/home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviesService();
        if (response.data && Array.isArray(response.data.movie)) {
          setMovies(response.data.movie);
          setFilteredMovies(response.data.movie);
          setCarouselMovies(response.data.movie.slice(0, 3));
        } else {
          setError('Los datos recibidos no son un array');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error al obtener las películas');
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const results = movies.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(results);
  }, [searchTerm, movies]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Carrusel */}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselMovies.map((movie, index) => (
            <button
              key={movie._id}
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {carouselMovies.map((movie, index) => (
            <div key={movie._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                src={movie.image}
                className="d-block w-100"
                alt={movie.name}
              />
              <div className="carousel-caption">
                <h1>{movie.name}</h1>
                <p>{movie.year}</p>
                <p><a className="btn" href={`/movies/${movie._id}`}>See details »</a></p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Barra de búsqueda centrada */}
      <div className="search-bar-container">
        <SearchBar handleSearch={handleSearch} />
      </div>

      {/* Películas */}
      <div className="container-marketing">
        <div className="row">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="col-lg-4">
              <img
                src={movie.image}
                className="bd-placeholder-img"
                width="320"
                height="200"
                alt={movie.name}
              />
              <h2>{movie.name}</h2>
              <p className="storyline">{movie.storyline}</p>
              <p><a className="btn" href={`/movies/${movie._id}`}>See details »</a></p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="container">
        <p className="float-end"><a href="#">Back to Top</a></p>
        <p>© 2017–2024 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    </div>
  );
};

export default Home;