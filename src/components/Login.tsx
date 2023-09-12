import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";
 
import { auth } from "../firebase.ts";
import { signInWithRedirect, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export const Login = () => {
 
  
const handleAuth = (authProvider: typeof GoogleAuthProvider | typeof FacebookAuthProvider) => {
  signInWithRedirect(auth, new authProvider())
    .then(() => {
      console.log(`Signed in with ${authProvider.name}`);
    })
    .catch((error) => {
      console.error(`Error signing in with ${authProvider.name}: `, error);
    });
}

  return (
    <div id="login-page">
     <div id="login-card">
      <h2> Hello, there </h2>
      <div 
        className="login-button google" 
        onClick={() =>{handleAuth(GoogleAuthProvider)} 
        } 
       >
        <GoogleCircleFilled /> Sign in with Google
      </div>
       <br/> <br/>
       <div 
        className="login-button facebook" 
        onClick={() =>{handleAuth(FacebookAuthProvider)} 
      }  
       >
        <FacebookFilled/> Sign in with Facebook
      </div>
     </div>
    </div>
  )
}
