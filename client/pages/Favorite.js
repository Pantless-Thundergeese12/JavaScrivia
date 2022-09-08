import React, { useState, useEffect } from 'react';

const Favorite = props => {
  const [ isFavorite, setIsFavorite ] = useState(false);

  useEffect(() => {
    fetch(`/favorites?username=${props.username}&question=${props.question}`)
      .then(res => res.json())
      .then(isFavorite => {
        console.log('isFavorite:', isFavorite)
        if (isFavorite) {
          setIsFavorite(true);
        }
      })
      .catch(err => console.log('error: ', err))

  }, [])

  const handleClick = () => {
    if(!isFavorite) {
      fetch('/favorites',
        {
          method: 'POST',
          body: JSON.stringify( { username: props.username, question: props.question } ),
          headers: { 'Content-Type' : 'application/json' },
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setIsFavorite(true);
        })
        .catch(err => console.log('error: ', err))
    }
    else {
      fetch('/favorites',
        {
          method: 'DELETE',
          body: JSON.stringify( { username: props.username, question: props.question } ),
          headers: { 'Content-Type' : 'application/json' },
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setIsFavorite(false);
        })
        .catch(err => console.log('error: ', err))

    }
  }

  return(
    <div className='favorite'>
      <button className={isFavorite ? 'favbutton' : 'notfavbutton'} onClick={handleClick}>{isFavorite ? 'Unfavorite' : 'Favorite'}</button>
    </div>
  )
}

export default Favorite;
