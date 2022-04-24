import React from "react";

export interface LoginInfo {
  username: string,
  password: string
}

export interface LoginPageProps {
  handleLogin: (loginInfo: LoginInfo) => Promise<void>
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
  const [loginInfo, setLoginInfo] = React.useState<LoginInfo>({ username: '', password: '' });

  const handleUpdateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ username: event.target.value, password: loginInfo.password });
  }

  const handleUpdatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ username: loginInfo.username, password: event.target.value });
  }

  return <div>
    <form onSubmit={(event) => {
      event.preventDefault();
      props.handleLogin(loginInfo);
    }}>
      <label>
        Username: <input type="text" name="username" onChange={(e) => { handleUpdateUsername(e) }} />
      </label>
      <br></br>
      <label>
        Password: <input type="password" name="password" onChange={(e) => { handleUpdatePassword(e) }} />
      </label>
    </form>
    <button className="login-button" onClick={() => {
      props.handleLogin(loginInfo);
    }}>
      LOGIN
    </button>
  </div>
}

export default LoginPage;