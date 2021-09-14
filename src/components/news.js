import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from '../components/spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    cars = []
    art = []

    static defaultProps = {
        country: 'in',
        pgSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pgSize: PropTypes.number,
        category: PropTypes.string,
        scrollArticles: PropTypes.array
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: 'block',
            pages: 0,
            disabled: true,
            limitpage: 0,
            scrollArticles: new Array
        }
        document.title = `${this.props.category} - NewsMonkey`
    }

    async fetchData(c){
        this.props.setprogress(10);
        this.setState({
            loading: 'block'
        })
        if (c === undefined){
            c = 1
        }
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=704604b549224d38bc52705bcdc6608d&page=${c}&pageSize=${this.props.pageSize}`
        // if (c)
        let data = await fetch(url);
        let pdata = await data.json();
        this.props.setprogress(50);
        let totalarticles = pdata.totalResults;
        if (totalarticles > pdata.articles.length){
            this.setState({
                limitpage: pdata.articles.length < this.props.pageSize ? this.state.pages : Math.ceil(totalarticles/pdata.articles.length),
            })
        }
        this.props.setprogress(70);
        this.setState({
            articles: pdata.articles,
            pages: c,
            loading: 'none',
        })

        pdata.articles.map((e, j) => {
            let l = this.cars.length
            this.cars[l] = e
            l++
        })
        this.props.setprogress(80);
        this.setState({
            articles: this.cars
        })
        this.props.setprogress(100);
    }
    
    fetchMoreData = () => {
        this.setState({
            pages: this.state.pages + 1
        })
        this.fetchData(this.state.pages);


    }

    async componentDidMount(){
        this.fetchData();
    }

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

    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top {this.props.category} headlines</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.pages < this.state.limitpage}
                    loader={<Spinner disp={this.state.loading} />}
                ></InfiniteScroll>

                <div className="row">
                    {this.state.articles.map((e)=>{
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
                <Spinner disp={this.state.loading} />
            </div>
        )
    }
}
