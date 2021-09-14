import React from 'react'
// import PropTypes from 'prop-types'
import spinner from '../Spinner-1s-200px.gif'
import { useEffect } from 'react';
import './spinner.css';

const resi = ()=>{
        
    let elwidth = document.getElementsByClassName('spinner')[0].naturalWidth/2;
    let elheight = document.getElementsByClassName('spinner')[0].naturalHeight/2;
    let maxwid = window.innerWidth;
    let maxhe = window.innerHeight;
    // console.log('max', maxwid, maxhe);

    let ratio = (maxwid/elwidth)/(maxhe/elheight);
    elwidth = Math.ceil(ratio * elwidth);
    elheight = Math.ceil(ratio * elheight);
    document.getElementsByClassName('spinner')[0].setAttribute('style', 'width:'+elwidth + 'px; height:' + elheight+'px; margin-left:-'+Math.ceil(elwidth/2)+'px; margin-top:-'+Math.ceil(elheight/2)+'px;');
}

  const Spinner = (props) => {
    
    useEffect(() => {
        resi();
    });
        
        window.addEventListener('resize', resi);

        return (
            <div style={{display: `${props.disp}`}}>
               <img className='spinner' src={spinner} alt={spinner} /> 
            </div>
        )
}

export default Spinner
