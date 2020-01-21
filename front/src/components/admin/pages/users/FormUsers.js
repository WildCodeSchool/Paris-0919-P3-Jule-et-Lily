// import React, { useState, useEffect } from 'react'
// import ButtonConfirm from '../../common/ButtonConfirm'
// import ButtonCancel from '../../common/ButtonCancel'
// import Encarts from '../../common/Encarts'
// import ReturnButton from '../../common/ReturnButton'
// import Axios from 'axios'

// export default function FormUsers (props){
//   const [user, setUser] = useState(props.donneesUsers)

//   // const fetchUser = () => {
//   //   Axios.get('user/role/1')
//   //   .then(res =>  )
//   // }
//     return (
//         <>
//           <ReturnButton onClickSee={props.onClick} />
//           <Encarts title="Fiche Client">
    
//             <form className='form-group text-center '>
//               <div className="form-group">
//                 <label htmlFor="lastname"> Nom</label>
//                 <input
//                   name='user_lastname'
//                   type="text"
//                   className="form-control text-center"
//                   id="lastname"
//                   placeholder='nom'
//                   value={user.user_lastname}
//                 />
//               </div>
    
    
//               <div className="form-group">
//                 <label htmlFor="fisrtname">Prénom</label>
//                 <input
//                   type="text"
//                   className="form-control text-center"
//                   id="fisrtname"
//                   name='user_firstname'
//                   placeholder='firstname'
//                   value={user.user_firstname}
//                 />
//               </div>
    
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="text"
//                   className="form-control text-center"
//                   id="email"
//                   name='user_email'
//                   placeholder='user_email'
//                   value={user.user_email}
//                 />
//               </div>
    
//               <div className='text-left'>
//                 <ButtonCancel  color='#234eb7' />
//                 <ButtonConfirm color='#234eb7'  />
//               </div>
//             </form>
//           </Encarts>
    
//         </>
    
//       );
// }