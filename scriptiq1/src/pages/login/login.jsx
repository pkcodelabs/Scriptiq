import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          try {
            const credentials = jwtDecode(credentialResponse.credential);
            console.log(credentials);

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(credentials));
          } catch (err) {
            console.error("Error decoding token", err);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
