import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class NewsItem extends Component {

    render() {
        let {title, desc, imgurl, newsurl} = this.props;
        return (
            <div>
                <div className="card" style={{width : '18rem'}}>
                    <img src={imgurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title.length > 60 ? title.slice(0, 59) + '...' : title}</h5>
                    <p className="card-text">{desc.length > 60 ? desc.slice(0, 59) + '...' : desc}</p>
                    <a href={newsurl} target='_blank' className="btn btn-sm btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        );
    }
}


export default NewsItem;
