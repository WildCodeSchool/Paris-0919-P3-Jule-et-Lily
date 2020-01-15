import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import FormProfile from "../common/FormProfile";

function Profile(props) {
  const [profile, setProfile] = useState({ user_email: 'tralala@hotmail.com', user_login: 'jl', user_password: '' })

  useEffect(() => {
    fetch(`/profile/${props.user}`, {
      headers: {
        Authorization: "Bearer " + props.token
      }
      // body: JSON.stringify(props.user)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);        
        setProfile({ user_login: res.user_login, user_password: res.user_password, user_email: res.user_email });
      })
      .catch();
      console.log(profile);
      
  }, []);

  return (
    <div className='m-5'>
      <FormProfile 
      user_login={profile.user_login}
      user_password={profile.user_password}
      user_email={profile.user_email}/>
    </div>
  )
}

function mapStateToProps(state) {
  // console.log(state)
  return { token: state.auth.token, user: state.auth.login };
}

export default connect(mapStateToProps)(Profile);
