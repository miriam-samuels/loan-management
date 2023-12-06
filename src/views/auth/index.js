import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'redux/auth'
import { useRegisterMutation } from 'redux/auth'
import Loader from 'components/loader'
import './index.scss'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLogged } from 'redux/auth'

function Auth() {
   const [openForm, setOpenForm] = useState()
   const [user, setUser] = useState()

   const [login, { isLoading: isLoggingIn }] = useLoginMutation()
   const [register, { isLoading: isRegistering }] = useRegisterMutation()

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleInputChange = (e) => {
      setUser({ ...user, [e.target.id]: e.target.value })
   }


   const handleSubmit = async (e, isLogin) => {
      e.preventDefault()

      let res;

      if (isLogin) res = await login(user);
      else res = await register(user)

      if (res?.data?.status) {
         localStorage.setItem('tk', res?.data?.data?.token)
         dispatch(setLogged(res?.data?.data))
         if (res?.data?.data?.user?.role == "lender") {
            navigate('/lender/dashboard')
         } else if (res?.data?.data?.user?.role == "admin") {
            navigate('/admin/dashboard')
         } else {
            navigate('/borrower/dashboard')
         }
      } else {
         toast.error(res.error.data.message)
      }
   }

   return (
      <div className='auth'>
         <main>
            {
               !openForm &&
               <div className="scroll-down">SCROLL DOWN
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                     <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
                  </svg>
               </div>
            }
            <div className='container'></div>
            {
               openForm === "login" &&
               <div className='main-form'>
                  <div className="background">
                     <div className="shape"></div>
                     <div className="shape"></div>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, true)}> <br /><br />
                     <h3>Login Here</h3><br />

                     <label htmlFor="email">Email</label>
                     <input type="email" placeholder="Enter Email" id="email" onChange={handleInputChange} required />

                     <label htmlFor="password">Password</label>
                     <input type="password" placeholder="Password" id="password" onChange={handleInputChange} required />

                     <button className='submit-button'>{isLoggingIn ? <Loader size={40} /> : 'Submit'}</button>
                     {/* <div className="social">
                        <div className="go"><i className="fab fa-google"></i>  Google</div>
                        <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                     </div> */}
                  </form>
               </div>
            }
            {
               openForm === "register" &&
               <div className='main-form reg'>
                  <div className="background">
                     <div className="shape"></div>
                     <div className="shape"></div>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, false)}>
                     <h3>Register Here</h3>
                     <div className="input-group">
                        <div>
                           <label htmlFor="firstname">First Name</label>
                           <input type="text" placeholder="Eg. John" id="firstname" onChange={handleInputChange} required />
                        </div>
                        <div>
                           <label htmlFor="lastname">Last Name</label>
                           <input type="text" placeholder="Eg. Doe" id="lastname" onChange={handleInputChange} required />
                        </div>
                     </div>
                     <label htmlFor="email">Email</label>
                     <input type="email" placeholder="Enter Email" id="email" onChange={handleInputChange} required />

                     <label htmlFor="password">Password</label>
                     <input type="password" placeholder="Password" id="password" onChange={handleInputChange} required />
                     <div className="input-group roles">
                        <div className='radio-option'>
                           <input type="radio" name='role' id="role" value="lender" onChange={handleInputChange} required />
                           <label htmlFor="lender">Lender</label>
                        </div>
                        <div className='radio-option'>
                           <input type="radio" name='role' id="role" value="borrower" onChange={handleInputChange} required />
                           <label htmlFor="borrower">Borrower</label>
                        </div>
                     </div>


                     <button className='submit-button'>{isRegistering ? <Loader size={40} /> : 'Submit'}</button>
                     {/* <div className="social">
                        <div className="go"><i className="fab fa-google"></i>  Google</div>
                        <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                     </div> */}
                  </form>
               </div>
            }

            <div className="modal-buttons">
               <button className="modal-button" onClick={() => setOpenForm('register')}>Register</button>
               <button className="modal-button" onClick={() => setOpenForm('login')}>Login</button>
            </div>

         </main>
      </div>
   )
}

export default Auth