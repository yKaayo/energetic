import Logo from "./Logo";

const Header = () => {
  return (
    <header className="fixed w-full mt-5">
      <Logo className="h-16 mx-auto cursor-pointer" />
    </header>
  );
};

export default Header;
