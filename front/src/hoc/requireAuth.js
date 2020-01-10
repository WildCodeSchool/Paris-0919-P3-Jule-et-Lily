import  React, { Component } from  'react';
import { connect } from "react-redux";

export  default  function (ComposedComponent) {
    class  Authentication  extends  Component {  
        componentDidMount() {
            if (!this.props.authenticated) 
                this.props.history.push('/login');
        } 
        componentDidUpdate() {
            if (!this.props.authenticated) 
                this.props.history.push('/login');
        }
        render() {
            return  <ComposedComponent  {...this.props}  />
        }
    }  
    
    function mapStateToProps(state) {
        return { authenticated:  state.auth.token?true:false };
    }

    return connect(mapStateToProps)(Authentication);
}