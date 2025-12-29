import React from "react";

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <>
      <p className="text-white">{movie.title}</p>
    </>
  );
};

export default MovieCard;
