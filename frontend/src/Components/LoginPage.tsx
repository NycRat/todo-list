import React from "react";

export interface LoginInfo {
  username: string,
  password: string
}

export interface LoginPageProps {
  handleLogin: (loginInfo: LoginInfo) => Promise<void>,
  handleSignup: (loginInfo: LoginInfo) => Promise<void>
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const [loginInfo, setLoginInfo] = React.useState<LoginInfo>({ username: '', password: '' });

  const handleUpdateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ username: event.target.value, password: loginInfo.password });
  }

  const handleUpdatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ username: loginInfo.username, password: event.target.value });
  }

  return <div className="login-page">
    <form className="login-form" onSubmit={(event) => {
      event.preventDefault();
    }}>
      <label className="login-input">
        Username: <input placeholder="Enter username" type="username" name="username" onChange={(e) => { handleUpdateUsername(e); }} />
      </label>
      <br></br>
      <label className="login-input">
        Password: <input placeholder="Enter password" type="password" name="password" onChange={(e) => { handleUpdatePassword(e); }} />
      </label>
    </form>
    <br></br>
    <button className="login-button" onClick={() => { props.handleLogin(loginInfo); }}>
      LOGIN
    </button>
    <button className="login-button" onClick={() => { props.handleSignup(loginInfo); }}>
      SIGN-UP
    </button>
  </div>
}

export default LoginPage;