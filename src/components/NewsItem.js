import React from 'react';
import PropTypes from 'prop-types';


const NewsItem = (props) => {

        let { title, desc, imgurl, newsurl, author, time, source } = props;
        return (
            <div>
                <div className="card" style={{ width: '18rem', margin: 'auto' }}>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark text-white">
                        {source}
                    </span>
                    <img src={imgurl} className="card-img-top" alt="..." style={{ minHeight: '191px', maxHeight: '191px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{title.length > 60 ? title.slice(0, 59) + '...' : title}</h5>
                        <p className="card-text">{desc.length > 60 ? desc.slice(0, 59) + '...' : desc}</p>
                        <p className='card-text'><small className='text-muted'>By {author}</small></p>
                        <p className='card-text'><small className='text-muted'>{new Date(time).toGMTString()}</small></p>
                        <a href={newsurl} target='_blank' className="btn btn-sm btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        );
}


export default NewsItem;
