import React from 'react';

export default function FormatAmount ({amount}){
    let formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    let balance = formatter.format(amount)
    return(
        <React.Fragment>{
            balance
        }</React.Fragment>
    );
}