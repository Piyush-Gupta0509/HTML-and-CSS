import React, { Component } from "react";
import axios from "axios";

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre"
    };
  }

  async componentDidMount() {
    // console.log("CDM is called ");
    // let res = await fetch(
    //   "https://api.themoviedb.org/3/movie/popular?api_key=1749ee86927c862e6ac40360e3eb8c0d&language=en-US&page=2"
    // );
    // let data = await res.json();
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=1749ee86927c862e6ac40360e3eb8c0d&language=en-US&page=1"
    );
    // console.log(data.data);
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let allGenre = [];
    data.data.results.map((movieObj) => {
      if (!allGenre.includes(genreId[movieObj.genre_ids[0]])) {
        allGenre.push(genreId[movieObj.genre_ids[0]]);
      }
    });
    allGenre.unshift("All Genre");
    console.log(allGenre);

    this.setState({
      movies: [...data.data.results],
      genre: [...allGenre],
    });
  }

  HandleGenre=(e)=>{
    //let g=e.target.innerText;
    this.setState({
      currGenre: e.target.innerText
    })
  }

  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return (
      <>
        <div className="row">
          <div className="col-4 p-5">
            <ul class="list-group">
              {this.state.genre.map((genre) => {
                if(this.state.currGenre==genre){
                  return (
                    <li class="list-group-item active" aria-current="true">
                      {genre}
                    </li>
                  ); 
                }
                return (
                  <li class="list-group-item" aria-current="true" onClick={this.HandleGenre}>
                    {genre}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col p-5">
            <div className="row">
              <input
                className="col-8"
                style={{ marginRight: "1rem" }}
                type="text"
                placeholder="Search"
              />
              <input
                className="col"
                type="number"
                placeholder="Results per page"
              />
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Popularity</th>
                  <th scope="col">Rating</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map((movieObj) => {
                  return (
                    <tr key={movieObj.id}>
                      <th scope="row">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                          style={{ width: "8rem", height: "5rem" }}
                          alt=""
                        />
                        {movieObj.original_title}
                      </th>
                      <td>{genreId[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <button className="btn btn-outline-danger">DELETE</button>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
