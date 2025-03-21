import axios from 'axios';

const BASE_URL = 'https://movie-red-backend.vercel.app';

const registerUserService = (data) => axios.post(`${BASE_URL}/users`, data);

const loginUserService = (data) => axios.post(`${BASE_URL}/users/login`, data);

const getMoviesService = () => axios.get(`${BASE_URL}/movies`);

const getMovieByIdService = (id, config) => axios.get(`${BASE_URL}/movies/${id}`, config);

const deleteMovieService = (id, config) => axios.delete(`${BASE_URL}/movies/${id}`, config);

const updateMovieService = (id, movieData, config) => {
  return axios.put(`${BASE_URL}/movies/${id}`, movieData, config);
};


export const createMovieService = (movieData, config) => {
  return axios.post(`${BASE_URL}/movies`, movieData, config);
};



export { 
  registerUserService, 
  loginUserService, 
  getMoviesService, 
  getMovieByIdService, 
  deleteMovieService,
  updateMovieService,
};