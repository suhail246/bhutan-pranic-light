import { titlesObject } from "@/app/assets/data/titlesData/titles";
import { globalStyleObj } from "@/app/assets/styles";
import { LoginForm } from "@/components";

// NOTE: Login Page meta data
export const metadata = {
  title: titlesObject.login.title,
};

const Login = () => {
  return (
    <>
      <div className={`${globalStyleObj.formInnerContainer}`}>
        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className={`${globalStyleObj.formHeading}`}>Welcome Back !</h1>
          <p className={`${globalStyleObj.formDescription}`}>
            Sign in to access Admin Pannel
          </p>
        </div>

        <LoginForm />
      </div>
    </>
  );
};

export default Login;
