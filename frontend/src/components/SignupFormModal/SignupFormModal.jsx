import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    try {
      await dispatch(
        thunkSignup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );
      closeModal();
    }
    catch (error) {
      error = await error.json();
      setErrors(prevErrors => ({
        ...prevErrors,
        ...(error.errors.email && { email: error.errors.email }),
        ...(error.errors.username && { username: error.errors.username }),
        ...(error.errors.firstName && { firstName: error.errors.firstName }),
        ...(error.errors.lastName && { lastName: error.errors.lastName }),
        ...(error.errors.password && { password: error.errors.password })
      }));
    }
  };

  return (
    <>
      <div className="signup-modal">
        <h1>Sign Up</h1>
        {errors.server && <p>{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="error">{errors.username}</p>}
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
