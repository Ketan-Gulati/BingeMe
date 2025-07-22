import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

function SignInBox() {
  const theme = useSelector((state) => state.theme.theme);
  
  return (
    <Link to="/sign-in">
      <button
        className={clsx(
          "w-[140px] h-[45px] flex items-center justify-center gap-2 border py-2 px-5 rounded-3xl cursor-pointer transition-colors duration-200",
          theme === 'dark'
            ? "border-[#5B5B5B] bg-[#1c1c1c] text-white hover:bg-[#2c2c2c]"
            : "border-[#cccccc] bg-white text-black hover:bg-gray-100"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={clsx("w-6 h-6", theme === 'dark' ? "text-white" : "text-black")}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span className={clsx("text-sm font-medium", theme === 'dark' ? "text-white" : "text-black")}>
          Sign In
        </span>
      </button>
    </Link>
  );
}

export default SignInBox;
