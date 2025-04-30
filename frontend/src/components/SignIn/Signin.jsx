import React, { useState } from 'react';

function Signin({ loadUser, onRouteChange }) {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const onSubmitSignIn = () => {
    fetch('http://localhost:5173/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      })
      .catch(err => console.error('Sign in error:', err));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label htmlFor="email-address" className="db fw6 lh-copy f6">
                Email
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                value={signInEmail}
                onChange={e => setSignInEmail(e.target.value)}
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
                value={signInPassword}
                onChange={e => setSignInPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <div>
            <input
              type="submit"
              value="Sign in"
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              className="f6 link dim black db pointer"
              onClick={() => onRouteChange('register')}
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;