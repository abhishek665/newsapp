import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Spinner from '../Spinner-1s-200px.gif'
import './spinner.css';

export class spinner extends Component {


    resi(){
        
        let elwidth = document.getElementsByClassName('spinner')[0].naturalWidth/2;
        let elheight = document.getElementsByClassName('spinner')[0].naturalHeight/2;
        let maxwid = window.innerWidth;
        let maxhe = window.innerHeight;
        // console.log('max', maxwid, maxhe);
        console.log('eldvdvd', elwidth)

        let ratio = (maxwid/elwidth)/(maxhe/elheight);
        console.log('ratio', ratio)
        elwidth = Math.ceil(ratio * elwidth);
        elheight = Math.ceil(ratio * elheight);
        document.getElementsByClassName('spinner')[0].setAttribute('style', 'width:'+elwidth + 'px; height:' + elheight+'px; margin-left:-'+Math.ceil(elwidth/2)+'px; margin-top:-'+Math.ceil(elheight/2)+'px;');
    }
    
    componentDidMount(){
        this.resi();
    }

    render() {
        
        window.addEventListener('resize', this.resi);

        return (
            <div style={{display: `${this.props.disp}`}}>
               <img className='spinner' src={Spinner} alt={Spinner} /> 
            </div>
        )
    }
}

export default spinner
