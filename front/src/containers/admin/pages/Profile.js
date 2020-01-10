import React from "react";
import FormProfile from "../common/FormProfile";

export default function Profile(props) {
    const [user, setUser] = ({})
    
    const componentDidMount = () => {
        fetch("/profile", {
          headers: {
            Authorization: "Bearer " + this.props.token
          },
          body: JSON.stringify(this.props.email)
        })
          .then(res => res.json())
          .then(res => {
            this.setState({profile: {email: res[0].email, name: res[0].name, lastname: res[0].lastname}});
          })
          .catch();
      };

    return (
        <div className='m-5'>
            <FormProfile />
        </div>
    )
}