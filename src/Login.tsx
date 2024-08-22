import React, { useState } from 'react';
import axios from 'axios';

import { Magic } from 'magic-sdk';

const magic = new Magic('pk_live_7F4CED1A807539BA');

const requestOTP = async (email: string) => {
  try { 
    //const didToken = await magic.auth.loginWithMagicLink({ email });
    const didToken = await magic.auth.loginWithEmailOTP({ email: email});
    const userInfo = await magic.user.getInfo();
    

    console.log("email--->",email);
    console.log("didToken--->",didToken);
    console.log("UserInfo--->", userInfo);
    const response = await axios.post('http://localhost:3001/validaOTP', {
      email: email
    }, {
      headers: {
        Authorization: `Bearer ${didToken}`,
        'Content-Type': 'application/json',
      }
    });
      console.log("response--->",response.data);
  } catch (error) {
    console.error('Error requesting OTP:', error);
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    requestOTP(email);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Request OTP</button>
    </div>
  );
};

export default Login;
