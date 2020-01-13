import React, {useEffect} from "react";
import { connect } from "react-redux";

export  default  function (ComposedComponent) {
    function  Authentication(props) {  
        useEffect(() => {
            if (!props.authenticated) 
                props.history.push('/dashboard');
        }, [])

        useEffect(() => {
            if (!props.authenticated) 
                props.history.push('/dashboard');
        }, [props.authenticated])

        return(
           <ComposedComponent  {...props}  />
        )
    }
    
    function mapStateToProps(state) {
        return { authenticated:  state.auth.token?true:false };
    }

    return connect(mapStateToProps)(Authentication);
}