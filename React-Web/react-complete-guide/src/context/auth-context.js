import React from 'react';

//creating "globally available object/array/string/number"

const authContext = React.createContext({
    authenticated: false,
    login: () =>{}
});

export default authContext;