import { useEffect, useState } from "react";
import { getCountries } from "../requests";
import CountryCard from "./CountryCard";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [regions] = useState(["all", "Africa", "America", "Asia", "Europe", "Oceania"]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("dark");
  const [type, setType] = useState('qita')

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  function handleSearchChange(e) {
      setTimeout(() => {
        setFilter(e.target.value)
        setType('search')
      }, 1000)
  }

  function handleSelectRegion(e) {
    setFilter(e.target.value)
    setType('qita')
  } 

  useEffect(() => {
    setLoader(true);
    getCountries(filter, type)
      .then((res) => {
        setCountries(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filter, type]);

 

  if (loader) {
    return (
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center w-full h-full">
        <span className="loading loading-spinner loading-xl bg-white"></span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="bg-base-100">
        <div className="my-container navbar shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-2xl font-extrabold tracking-wider">
              Where in the world?
            </a>
          </div>
          <div className="flex-none">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />
              <svg
                className="swap-off h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="my-container py-8">
        <div className="flex justify-between items-center mb-8">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input onChange={handleSearchChange} type="search" placeholder="Search"/>
          </label>
          <select
            onChange={handleSelectRegion}
            value={filter}
            className="select select-primary border-0"
          >
            <option disabled value="">
              Filter by Region
            </option>
            {regions.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {countries.map((el, index) => (
            <CountryCard key={index} info={el} />
          ))}
        </ul>
      </div>
    </div>
  );
}