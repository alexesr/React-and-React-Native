import React , { useEffect , useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) =>{
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);//special React Hook equivalent to the static contextType in class based components

    console.log(authContext.authenticated);
    
    useEffect(()=>{
        toggleBtnRef.current.click();
    },[]);

    //useState is the equivalent DerivedStateFromProps()
    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');
        //for Http request
        //Component Did Update and Component Did Mount combined it this
        const timer = setTimeout(()=>{
            alert('Fake Saved data to cloud!')
        },1000);
        return () =>{
            clearTimeout(timer);
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
    if(props.personsLength<=2){
        assignedClasses.push(classes.red);
    }
    if(props.personsLength<=1){
        assignedClasses.push(classes.bold);
    }
    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}> This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
            Toogle Persons
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
}

export default React.memo(cockpit);//uses memoization internally so that only if its inputs changes it will re-render