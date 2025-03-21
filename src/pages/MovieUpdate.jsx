import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieByIdService, updateMovieService } from "@/services/userServices";
import "../styles/UpdateMovie.css";

const UpdateMovie = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        name: "",
        year: "",
        runtime: "",
        categories: "",
        director: "",
        writer: "",
        actors: "",
        storyline: "",
        state: "",
        image: "",
    });
    const [error, setError] = useState(null); // Estado para manejar errores

    // Obtener los datos actuales de la película al cargar el componente
    useEffect(() => {
            const fetchMovie = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await getMovieByIdService(id, config);
                setMovie(response.data); // Aquí deberías acceder a response.data directamente
            } catch (error) {
                console.error("Error al obtener la película:", error);
                setError("Error al obtener la película. Inténtalo de nuevo más tarde.");
            }
        };
    
        fetchMovie();
    }, [id]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({
            ...movie,
            [name]: value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await updateMovieService(id, movie, config);
            if (response.status === 200) {
                alert("Película actualizada correctamente");
                navigate('/'); 
            }
        } catch (error) {
            console.error("Error al actualizar la película:", error);
            setError("Error al actualizar la película. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="update-movie-container">
            <div className="update-movie-card">
                <h2>Edit Film</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={movie.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={movie.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (minutes):</label>
                        <input
                            type="number"
                            name="runtime"
                            value={movie.runtime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="categories"
                            value={movie.categories}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Director:</label>
                        <input
                            type="text"
                            name="director"
                            value={movie.director}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="writer"
                            value={movie.writer}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Actors:</label>
                        <input
                            type="text"
                            name="actors"
                            value={movie.actors}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Synopsis:</label>
                        <textarea
                            name="storyline"
                            value={movie.storyline}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Estate:</label>
                        <input
                            type="text"
                            name="state"
                            value={movie.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            value={movie.image}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                    Update Movie
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMovie;