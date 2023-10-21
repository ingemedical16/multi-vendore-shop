import { useEffect, useState } from 'react';
import {useGetProductsQuery,} from './slices/api/productApiSlice'
import {setAllProducts,loadingData,setErrors,clearErrors} from './slices/productSlice'
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import TopBar from './components/TopBar/TopBar';
import NavBar from './components/NavBar/NavBar';
import Layout from './components/Layout/Layout';
import Footer from './components/Layout/Footer';

function App() {
  const dispatch = useDispatch();
  

   // const [getAllProducts] = useGetProductsQuery();
  /* useEffect( () => {

      const fetchAllproducts = async () => {
        try {
          dispatch(loadingData(true))
          const res = await getAllProducts().unwrap();
          console.log(res)
        //  dispatch(setAllProducts({ ...res }));
          
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
      fetchAllproducts()
    
  }, []); */
  return (
    <>
      <Layout
        header={
          <>
            <TopBar />
            <NavBar />
          </>
        }
      >
        <Outlet />
        <Footer/>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Layout>
    </>
  );
}

export default App;
