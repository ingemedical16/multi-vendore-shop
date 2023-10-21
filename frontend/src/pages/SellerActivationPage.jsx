import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../server';
import { useActivateShopMutation } from '../slices/api/shopApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  let activationToken = activation_token.replace('_p_', '.');
  activationToken = activationToken.replace('_p_', '.');
  const [activeSllerAccount] = useActivateShopMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activationToken) {
      const sendRequest = async (token) => {
        try {
          const res = await activeSllerAccount({
            activation_token: token,
          }).unwrap();
          console.log(res);
          toast.success('Your account has been created suceessfully!');
          navigate('/');
        } catch (err) {
          console.log(err);
          toast.error(err?.data?.message || err.error);
        }
      };
      sendRequest(activationToken);
    }
  }, [activationToken, navigate]);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
