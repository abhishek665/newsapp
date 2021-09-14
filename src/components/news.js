import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from '../components/spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";

const News = (props)=> {

    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState('block')
    const [pages, setpages] = useState(1)
    const [disabled, setdisabled] = useState(true)
    const [limitpage, setlimitpage] = useState(0)
    const [cars, setCars] = useState([])

    document.title = `${props.category} - NewsMonkey`
    const fetchData = async (c)=>{
        props.setprogress(10);
        setloading('block');
        if (c === undefined){
            c = 1
        }
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${c}&pageSize=${props.pageSize}`
        // if (c)
        let data = await fetch(url);
        let pdata = await data.json();
        props.setprogress(50);
        let totalarticles = pdata.totalResults;
        if (totalarticles > pdata.articles.length){
            setlimitpage(pdata.articles.length < props.pageSize ? pages : Math.ceil(totalarticles/pdata.articles.length))
        }
        props.setprogress(70);

        setarticles(pdata.articles)
        setpages(c)
        setloading('none')
        props.setprogress(80);
 
        setCars(cars.concat(pdata.articles))


        props.setprogress(100);
    }
    
    const fetchMoreData = () => {
        console.log('pages1', pages)
        setpages(pages + 1)
        console.log('pages2', pages)
        fetchData(pages + 1);
        setarticles(cars)
    }

    useEffect( () => {
        fetchData(pages);
    }, []);

    useEffect(()=>{
        setarticles(cars);
    }, [articles])
    // handlePre = ()=> {
    //     console.log('Pre');
    //     let pc = this.state.pages -1 === 0 ? 1 : this.state.pages - 1;
    //     console.log('pages', pc);
    //     if (pc < this.state.limitpage){
    //         console.log('entering finale', pc, this.state.limitpage, this.state.pages)
    //         this.fetchData(pc);
    //     }
    // }

    // handleNe = ()=> {
    //     console.log('Next');
    //     let pc = this.state.pages + 1;
    //     console.log('pages', pc);
    //     if (pc <= this.state.limitpage){
    //         this.setState({
    //             pages: pc
    //         })
    //         console.log('entering finale', pc, this.state.limitpage, this.state.pages)
    //         this.fetchData(pc);
    //     }

    // }

        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top {props.category} headlines</h2>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={pages < limitpage}
                    loader={<Spinner disp={loading} />}
                ></InfiniteScroll>

                <div className="row">
                    {cars.map((e)=>{
                        return <div className="col-md-4 col-12" key={e.url ? e.url : 'UnTitled'}>
                        <NewsItem title={e.title ? e.title : 'UnTitled'} desc={e.description ? e.description : 'UnDescribed'}
                            imgurl = {e.urlToImage ? e.urlToImage : 'UnDescribed'}
                            newsurl = {e.url ? e.url : 'UnTitled'} time={e.publishedAt ? e.publishedAt : 'UnTitled'}
                            author = {e.author ? e.author : 'Unknown'} source={4}
                        />
                        </div> 
                    })}
                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button className='btn btn-dark' disabled={this.state.pages - 1 === 0 ? true : false} onClick={this.handlePre} type='button'>&larr; Previous</button>
                    <button className='btn btn-dark' disabled={this.state.pages === this.state.limitpage ? true: console.log('btn btn', this.state.pages, this.state.limitpage)} onClick={this.handleNe} type='button'>Next&rarr;</button>
                </div>
                */}
                <Spinner disp={loading} />
            </div>
        )
}

 News.defaultProps = {
    country: 'in',
    pgSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pgSize: PropTypes.number,
    category: PropTypes.string,
    scrollArticles: PropTypes.array
}

export default News
