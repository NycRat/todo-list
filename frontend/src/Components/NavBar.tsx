const Navbar = (): JSX.Element => {
  return (
    <nav className='navbar'>
      <a className='navlink' href='/#/'>
        TODO LIST
      </a>
      <a className='navlink' href='/#/login'>
        LOGIN
      </a>
    </nav>
  );
}

export default Navbar;