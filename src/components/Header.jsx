import LOGO from '../assets/LOGO.jpg'
export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={LOGO}/>
        <span>Weather Clone</span>
      </div>
      <div className="search">
        <input placeholder="Search City..." />
        <button>Search</button>
      </div>
    </header>
  );
}
