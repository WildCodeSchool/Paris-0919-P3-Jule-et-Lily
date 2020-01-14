import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import FormProfile from "../common/FormProfile";

function Profile(props) {
  const [user, setUser] = useState({ user_email: '', user_login: '', user_password: '' })

  useEffect(() => {
    fetch("/profile", {
      headers: {
        Authorization: "Bearer " + props.token
      },
      body: JSON.stringify(props.user_login)
    })
      .then(res => res.json())
      .then(res => {
        setUser({ user_email: res[0].user_email, user_login: res[0].user_login, user_password: res[0].user_password });
      })
      .catch();
      console.log(user);
      
  }, []);

  return (
    <div className='m-5'>
      <FormProfile />
    </div>
  )
}

function mapStateToProps(state) {
  // console.log(state)
  return { token: state.auth.token, user: state.auth.email };
}

export default connect(mapStateToProps)(Profile);
