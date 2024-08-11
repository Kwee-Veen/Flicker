// import { useState } from 'react'
// import { supabase } from './supabaseClient'


// export default function Auth() {
//   const [loading, setLoading] = useState(false)
//   const [email, setEmail] = useState('')

//   const handleLogin = async (event: any) => {
//     event.preventDefault()

//     setLoading(true)
//     const { error } = await supabase.auth.signInWithOtp({ email })

//     if (error) {
//       alert(error.message)
//     } else {
//       alert('Check your email for the login link!')
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="row flex flex-center">
//       <div className="col-6 form-widget">
//         <h1 className="header">Supabase + React</h1>
//         <p className="description">Sign in via magic link with your email below</p>
//         <form className="form-widget" onSubmit={handleLogin}>
//           <div>
//             <input
//               className="inputField"
//               type="email"
//               placeholder="Your email"
//               value={email}
//               required={true}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <button className={'button block'} disabled={loading}>
//               {loading ? <span>Loading</span> : <span>Send magic link</span>}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

/////////


// import { supabase } from "./supabaseClient"

// export default async function handleSignInWithGoogle(response: any) {
//   const { data, error } = await supabase.auth.signInWithIdToken({
//     provider: 'google',
//     token: response.credential,
//   })


//   return (
//     <>
//       <div id="g_id_onload"
//         data-client_id="AIzaSyC7IqLLNRdNGXm4F42Z3NRfyTco_dO1Kxk"
//         data-context="signin"
//         data-ux_mode="popup"
//         data-callback="handleSignInWithGoogle"
//         data-itp_support="true">
//       </div>

//       <div className="g_id_signin"
//         data-type="standard"
//         data-shape="pill"
//         data-theme="outline"
//         data-text="signin_with"
//         data-size="large"
//         data-logo_alignment="left">
//       </div>
//     </>
//   )
// }