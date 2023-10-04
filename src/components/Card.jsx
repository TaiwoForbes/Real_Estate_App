import React from 'react'

const Card = ({title,imgUrl,paragraph,links}) => {
  return (
    <div>
        <div>
        <h1>{title}</h1>
        <img src={imgUrl} alt={title} />
        </div>
        <p>
            {paragraph}
        </p>
        <a href={links}></a>
        
    </div>
  )
}

export default Card