import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        thunkLogin({
          email,
          password,
        })
      );
      closeModal();
    }
    catch (error) {
      error = await error.json();
      setErrors(prevErrors => ({
        ...prevErrors,
        ...(error.errors.credential && { credential: error.errors.credential }),
        ...(error.errors.password && { password: error.errors.password })
      }));
    }
  };

  return (
    <>
      <div className="login-modal">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors && errors.credential && <p className="error">{errors.credential}</p>}
          <br></br>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors && errors.password && <p className="error">{errors.password}</p>}
          <button type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
