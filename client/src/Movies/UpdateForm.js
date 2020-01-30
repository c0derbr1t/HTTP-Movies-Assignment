import React, { useState } from 'react';
import axios from 'axios';

const intialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const [movie, setMovie] = useState(props.movie);

    console.log(props);
    
    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (typeof movie.stars === 'string') {
            movie.stars = movie.stars.split(',');
        }        

        axios  
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log("Put Response: ", res);
                props.history.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h2>Update Movie:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type='text'
                        name='title'
                        onChange={changeHandler}
                        value={movie.title}
                    />
                </label>
                <label>
                    Director:
                    <input
                        type='text'
                        name='director'
                        onChange={changeHandler}
                        value={movie.director}
                    />
                </label>
                <label>
                    Metascore:
                    <input
                        type='number'
                        name='metascore'
                        onChange={changeHandler}
                        value={movie.metascore}
                    />
                </label>
                <label>
                    Stars:
                    <p>Please separate with a comma.</p>
                    <input
                        type='textarea'
                        name='stars'
                        onChange={changeHandler}
                        value={movie.stars}
                    />
                </label>
                <button>Update Movie</button>
            </form>
        </div>
    )
}
export default UpdateForm;