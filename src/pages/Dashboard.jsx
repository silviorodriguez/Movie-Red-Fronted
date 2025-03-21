import { useState } from 'react';
import '../styles/movieForm.css';
import { useNavigate } from 'react-router-dom';

const MovieForm = () => {
  const [movie, setMovie] = useState({
    name: '',
    year: '',
    runtime: '',
    categories: '',
    director: '',
    writer: '',
    actors: '',
    storyline: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://movie-red-backend.vercel.app/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(movie)
      });

      if (response.status === 401) {
        alert("No estás autenticado. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Datos guardados!");
        setMovie({
          name: '',
          year: '',
          runtime: '',
          categories: '',
          director: '',
          writer: '',
          actors: '',
          storyline: '',
          image: ''
        });

        navigate('/'); 
      } else {
        console.error("Error al guardar los datos:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Register Movie</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={movie.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="year">Year</label>
        <input type="number" id="year" name="year" value={movie.year} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="runtime">Duration (minutes)</label>
        <input type="number" id="runtime" name="runtime" value={movie.runtime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="categories">Category</label>
        <input type="text" id="categories" name="categories" value={movie.categories} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="director">Director</label>
        <input type="text" id="director" name="director" value={movie.director} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="writer">Author</label>
        <input type="text" id="writer" name="writer" value={movie.writer} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="actors">Actors</label>
        <input type="text" id="actors" name="actors" value={movie.actors} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="storyline">Synopsis</label>
        <textarea id="storyline" name="storyline" value={movie.storyline} onChange={handleChange} required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" name="image" value={movie.image} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? <div className="loading-spinner"></div> : 'To save'}
      </button>
    </form>
  );
};

export default MovieForm;