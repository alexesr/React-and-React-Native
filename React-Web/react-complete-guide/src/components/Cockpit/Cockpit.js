import React , { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = (props) =>{
    //useState is the equivalent DerivedStateFromProps()
    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');
        //for Http request
        //Component Did Update and Component Did Mount combined it this
        setTimeout(()=>{
            alert('Fake Saved data to cloud!')
        },1000);
        return () =>{
            
            //it will run after re-render cycle (more precisely, it runs before the main useEffect function runs, but after the first render cycle!)
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    },[props.persons]); // add data list so that this function is executed ONLY when the data changes
    useEffect(()=>{
        console.log('[Cockpit.js] 2nd useEffect');
        return () =>{
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        }
    });
    //^ using [] as argument to prevent useEffect of running again
    //we can use as much useEffect() methods as we want
    //useEffect(()=>{});
    const assignedClasses = []// string red bold
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
    if(props.persons.length<=2){
        assignedClasses.push(classes.red);
    }
    if(props.persons.length<=1){
        assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}> This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>
            Toogle Persons
            </button>
        </div>
    );
}

export default cockpit;