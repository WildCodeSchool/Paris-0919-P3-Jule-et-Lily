import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import FormProfile from "../common/FormProfile";


function Profile(props) {
  const [profile, setProfile] = useState({ user_email: '', user_login: '', user_password: '', user_passwordBis: '', flash: '', error: '' }) // Récupération des données de la Bdd
  const [profileModifying, setProfileModifying] = useState({ user_email: '', user_login: '', user_password: '', user_passwordBis: '', flash: '', error: '' }) // Récupération des données du formulaire lorsqu'elle veut modifier


  const validateNewProfile = (e) => {
    setProfileModifying({ ...profileModifying, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    fetch(`/profile/1`, {
      headers: {
        Authorization: "Bearer " + props.token,
        method: 'POST'
      }
    })
      .then(res => res.json())
      .then(res => {
        setProfile({ user_login: res.user_login, user_password: res.user_password, user_email: res.user_email })
        setProfileModifying({ user_email: res.user_email, user_login: res.user_login })
      })
      .catch();
  }, [setProfileModifying]);


  const handleSubmit = (e) => {
    fetch(`/profile/1`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(profileModifying),
      })
      .then(
        res => res.json(),
        res => {
          setProfileModifying({ user_login: res.user_login, user_email: res.user_email, flash: res.flash, error: res.error })
          if (profileModifying.user_password != '') {
            if (profileModifying.user_password === profileModifying.user_passwordBis) {
              setProfileModifying({ user_password: res.user_password })
            } else {
              return alert('Le mot de passe est différent !')
            }
          }
        },
        alert('Votre profil a bien été modifié !')
      )
    props.reload()
    e.preventDefault()
  }


  return (
    <div className='m-5'>
      <FormProfile
        userValue_login={profileModifying.user_login}
        userValue_password={profileModifying.user_password}
        userValue_email={profileModifying.user_email}
        userValue_passwordBis={profileModifying.user_passwordBis}
        onChange={validateNewProfile}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

function mapStateToProps(state) {
  return { token: state.auth.token, userLog: state.auth.login, userEmail: state.auth.email };
}

export default connect(mapStateToProps)(Profile);
