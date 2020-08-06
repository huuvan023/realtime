import React, { Fragment } from 'react';
import Stickers from './../../Lib/Sticker';


export default class Sticker extends React.Component {
    onShowSticker = (object) => {
        var result = null;
        if( object ) {
            result = object.stickers.map((item,index) => {
                return (
                    <img src={ item.src } 
                    onClick={() => { this.props.onSendSticker(item, object.type) }} 
                    key = { index } 
                    alt = { item.name }/>
                );
            })
        }
        return result;
    }
    render(){
        return(
            <Fragment>
                <div className="sticker" > 
                    { this.onShowSticker(Stickers) }
                    
                </div>
            </Fragment>
        );
    }
}