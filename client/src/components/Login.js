import React, { Fragment, useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'


const Login = ({ setAuth }) => {
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    
    const [error, setError] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = { email, password };

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (response.status === 401) {
              // Handle unauthorized error
              setError("Email or Password is incorrect");
              return;
          }

            localStorage.setItem("token", parseRes.jwtToken);

            setAuth(true);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="../../apple-touch-icon.png"
              alt="Lock"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmitForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
            </div>

             

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
        </Fragment>

    );
}

export default Login;