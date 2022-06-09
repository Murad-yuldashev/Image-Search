import React, { useState } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './Search.module.scss';

const Search = () => {

  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const ACCESS_KEY = "nKnKTDLfF-u8ty8Dvdqqkpg1TIYjQBxp91oG08Cel_k";

  const getValue = (event) => {
    setImage(event.target.value);
  };

  const getImages = () => {
    const url = "https://api.unsplash.com/search/photos?page=1&query=" + image + "&client_id=" + ACCESS_KEY;
    axios.get(url).then((response) => {
      setResult(response.data.results);
      console.log(response);
    })
  }

  return (
      <>
        <h1 className={style.title}>📷 React Image Search with Unsplash API</h1>
        <div className={style.formSection}>
          <input 
            type="text" 
            name="image" 
            placeholder="Search images..." 
            onChange={getValue}
          />
          <button onClick={getImages} type="submit">Search</button>
        </div>

        <div className={style.result}>
          {result.map((image, id) => (
            <div className={style.card} key={id}>
              <a>
                <LazyLoadImage
                  className={style.resultImage}
                  src={image.urls.full}
                  effect="blur"
                  delayTime="300"
                />
                <p className={style.username}>Photo by {image.user.name}</p>
              </a>
            </div>
          ))}
        </div>
      </>
  );
};

export default Search;