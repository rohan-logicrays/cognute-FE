import React, { FormEventHandler, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Input, Button } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {  loginUser } from '../../store/reducers/authSlice';
import { AppDispatch, IRootState } from '../../store/store';

const Login = () => {
  const { userData, status } = useSelector((state: IRootState) => state.auth);
  const [userId, setUserId] = useState('user1000');
  const [password, setPassword] = useState('Cognute$01');
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const body: { userId: string, password: string } = { userId, password };
    if (userId && password) {
      dispatch(loginUser(body))
    };
  };

  if (userData?.session_id) {
    navigate('/home');
  }


  if (status === 'loading') {
    return <div className="grid min-h-screen place-content-center">

      <div className="flex items-center gap-2 text-gray-500">
        <span className="h-6 w-6 block rounded-full border-4 border-t-blue-300 animate-spin"></span>
        loading...
      </div>
    </div>
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">UserID</label>
            <Input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your user id"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className='text-red-500 text-center mb-5'>{error}</p>}

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;