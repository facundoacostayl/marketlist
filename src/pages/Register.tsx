import { FormEvent } from "react";
import { TextField } from "../ui/textField";
import { Button } from "../ui/controls/button";
import { useAuth } from "../Auth/context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface Form extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

export const Register: React.FC = () => {
  const { signUp, currentUser } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler = async (e: FormEvent<Form>) => {
    e.preventDefault();

    const userEmail = e.currentTarget.email;
    const userPassword = e.currentTarget.password;
    const userPasswordConfirm = e.currentTarget.confirmPassword;

    if (userPassword.value !== userPasswordConfirm.value) {
      userPassword.value = "";
      userPasswordConfirm.value = "";
      return console.log("Passwords are not equals");
    }

    try {
      await signUp(userEmail.value, userPassword.value);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App-header">
      <h1>Registrate</h1>
      <form className="auth-form" onSubmit={onSubmitHandler}>
      <div className="form-block">
        <label htmlFor="email">Email</label>
        <TextField required id="email" type="email" />
        </div>
        <div className="form-block">
        <label htmlFor="password">Password</label>
        <TextField required id="password" type="password"></TextField>
        </div>
        <div className="form-block">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <TextField required id="confirmPassword" type="password"></TextField>
        </div>
        <Button type="submit" colorScheme="primary">
          Register
        </Button>
      </form>
    </div>
  );
};
