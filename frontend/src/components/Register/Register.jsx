import React, { useState } from "react";

const Register = ({ loadUser, onRouteChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmitRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const user = await res.json();
      if (user.id) {
        loadUser(user);
        onRouteChange("home");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label htmlFor="name" className="db fw6 lh-copy f6">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                value={name}
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label htmlFor="email-address" className="db fw6 lh-copy f6">
                Email
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label htmlFor="password" className="db fw6 lh-copy f6">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div>
            <button
              onClick={onSubmitRegister}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            >
              Register
            </button>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Register;
