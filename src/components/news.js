import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from '../components/spinner';

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: 'block',
            pages: 0,
            disabled: true,
            limitpage: 0
        }
    }

    async fetchData(c){
        this.setState({
            loading: 'block'
        })
        if (c === undefined){
            c = 1
        }
        let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=c7c2806d4e644bbe92cabf8de063a8c9&page=${c}&pageSize=${this.props.pageSize}`
        // if (c)
        let data = await fetch(url);
        let pdata = await data.json();
        let totalarticles = pdata.totalResults;
        if (totalarticles > pdata.articles.length){
            this.setState({
                limitpage: pdata.articles.length < this.props.pageSize ? this.state.pages : Math.ceil(totalarticles/pdata.articles.length),
            })
            console.log('increamenting pages', pdata.articles.length, pdata.totalResults);
        }
        console.log('printing.........', this.state.limitpage);
        this.setState({
            articles: pdata.articles,
            pages: c,
            loading: 'none'
        })
        console.log(this.state.pages);

    }

    async componentDidMount(){
        this.fetchData();
    }

    handlePre = ()=> {
        console.log('Pre');
        let pc = this.state.pages -1 === 0 ? 1 : this.state.pages - 1;
        console.log('pages', pc);
        if (pc < this.state.limitpage){
            console.log('entering finale', pc, this.state.limitpage, this.state.pages)
            this.fetchData(pc);
        }
    }

    handleNe = ()=> {
        console.log('Next');
        let pc = this.state.pages + 1;
        console.log('pages', pc);
        if (pc <= this.state.limitpage){
            this.setState({
                pages: pc
            })
            console.log('entering finale', pc, this.state.limitpage, this.state.pages)
            this.fetchData(pc);
        }

    }

    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top headlines</h2>
                <div className="row">
                    {this.state.articles.map((e)=>{
                        return <div className="col-md-4" key={e.url ? e.url : 'UnTitled'}>
                        <NewsItem title={e.title ? e.title : 'UnTitled'} desc={e.description ? e.description : 'UnDescribed'}
                            imgurl = {e.urlToImage ? e.urlToImage : 'UnDescribed'}
                            newsurl = {e.url ? e.url : 'UnTitled'}
                        />
                        </div> 
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button className='btn btn-dark' disabled={this.state.pages - 1 === 0 ? true : false} onClick={this.handlePre} type='button'>&larr; Previous</button>
                    <button className='btn btn-dark' disabled={this.state.pages === this.state.limitpage ? true: console.log('btn btn', this.state.pages, this.state.limitpage)} onClick={this.handleNe} type='button'>Next&rarr;</button>
                </div>
                <Spinner disp={this.state.loading} />
            </div>
        )
    }
}
