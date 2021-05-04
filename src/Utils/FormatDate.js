import React from 'react';

export default function FormatDate (props){
    const months = ["Jan", "Feb", "May", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const created = new Date(props.created);
    if (props.created == null){
        return null;
    } else {
        return(
            <React.Fragment>{
                created.getDate() + " " +
                months[created.getMonth()] + " " +
                created.getFullYear() + " " +
                ('0' + created.getHours()).slice(-2) + ":" +
                ('0' + created.getMinutes()).slice(-2) + ":" +
                ('0' + created.getSeconds()).slice(-2)
            }</React.Fragment>
        );
    }
}