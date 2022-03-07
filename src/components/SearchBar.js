import '../pages/style.css';
import '../App.css';

import SearchIcon from '@material-ui/icons/Search';


function SearchBar() {
  return (
    <div className="search-bar__outer">
        <div className="search-bar__container">
            <input 
                className="search-input"
                type="text"
                placeholder="Search by ISBN, Book Title, Author, Class"
            />
            <SearchIcon className="search-icon"/>
        </div>
        <div className="centered-container">
            <a href="#">I want to sell books instead.</a>
        </div>
    </div>
  );
}

export default SearchBar;
