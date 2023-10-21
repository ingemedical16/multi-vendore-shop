import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/api/usersApiSlice';

const ActivationPage = () => {
  const { activation_token } = useParams();
  let activationToken = activation_token.replace('_p_', '.');
  activationToken = activationToken.replace('_p_', '.');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isError }] = useRegisterMutation();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate('/');
    } else if (activationToken) {
      const sendRequest = async (token) => {
        try {
          const res = await register({ activation_token: token }).unwrap();
          console.log(res);
          toast.success('Your account has been created suceessfully!');
          dispatch(setCredentials({ ...res }));
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      sendRequest(activationToken);
    }
  }, [navigate, user, activationToken]);

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
      {isError ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
