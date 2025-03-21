import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieByIdService, deleteMovieService,} from '@/services/userServices';
import '../styles/movieDetail.css';



const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieByIdService(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Error al obtener la película');
      }
    };

    fetchMovie();
  }, [id]);


  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta película?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteMovieService(id, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert('Película eliminada!');
        navigate('/');
      } else {
        alert('Error al eliminar la película.');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      if (error.response?.status === 401) {
        alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        localStorage.removeItem('token'); // Elimina el token inválido
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      } else {
        setError('Error al eliminar la película');
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }
  
  return (

    <div className="movie-detail" style={{ backgroundImage: `url(${movie.image})` }}>
      <div className="movie-detail-content">
        <h1>{movie.name}</h1>
        <p>{movie.year}</p>
        <p>{movie.runtime} minutes</p>
        <p>{Array.isArray(movie.categories) ? movie.categories.join(', ') : movie.categories}</p>
        <p>{movie.storyline}</p>
        <p>Director: {movie.director}</p>
        <p>Writer: {movie.writer}</p>
        <p>Actors: {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}</p>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate(`/update/${id}`)}>Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MovieDetail;