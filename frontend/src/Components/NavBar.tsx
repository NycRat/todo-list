const Navbar = (): JSX.Element => {
  return (
    <nav className='navbar'>
      <a className='navlink' href='/todo-list/#/'>
        TODO LIST
      </a>
      <a className='navlink' href='/todo-list/#/login'>
        LOGIN
      </a>
    </nav>
  );
}

export default Navbar;