import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: {path: 'title', order: 'asc'}
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({movies: getMovies(), genres});
  }

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      selectedGenre,
      pageSize,
      sortColumn } = this.state;

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {totalCount: filtered.length, data: movies};
  }


  handleDelete = (movie) => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);

    this.setState({
      movies
    });
  }

  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = (page) => {
    this.setState({currentPage: page});
  }

  handleSelectedGenre = (genre) => {
    console.log(genre);
    this.setState({selectedGenre: genre, currentPage: 1});
  }

  handleSort = (sortColumn) => {
    this.setState({sortColumn});
  }


  render() {
    const { length: count } = this.state.movies;
    const {currentPage, selectedGenre, pageSize, genres, sortColumn } = this.state;
    const { totalCount, data } = this.getPageData();

    
    if (count === 0) return <p>There are no movies in database</p>

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleSelectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies </p>
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

