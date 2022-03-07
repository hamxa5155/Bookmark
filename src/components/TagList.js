import '../pages/style.css';
import '../App.css';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


function TagList(props) {
    console.log(props.tags)

    const handleTags = (item) => {
        var filteredArr = props.tags.filter(function(e) { return e !== item; });
        props.setTags(filteredArr);
    }

    return (props.tags.map((item, index) => (
            <div className="tag-item">
                <div>{item}</div>
                <CloseIcon onClick={() => handleTags(item)}/>
            </div>
        ))
    );
}

export default TagList;
