import { TextField } from "../ui/textField";
import { Button } from "../ui/controls/button";
import { useAuth } from "../Auth/context/AuthProvider";
import { FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

interface Form extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export const Login: React.FC = () => {
  const { signIn, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();


  const onSubmitHandler = async (e: FormEvent<Form>) => {
    e.preventDefault();

    const email = e.currentTarget.email;
    const password = e.currentTarget.password;

    try {
      await signIn(email.value, password.value);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App-header">
      <h1>Inicia sesión</h1>
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <div className="form-block">
          <label htmlFor="email">Email</label>
          <TextField required type="email" id="email" name="email"></TextField>
        </div>
        <div className="form-block">
          <label htmlFor="password">Password</label>
          <TextField required type="password" id="password" name="password"></TextField>
        </div>
        <div className="button-block">
          <Button type="submit" colorScheme="primary">
            Login
          </Button>
          <Button onClick={() => signInWithGoogle()} colorScheme="primary">Google</Button>
        </div>
      </form>
    </div>
  );
};
