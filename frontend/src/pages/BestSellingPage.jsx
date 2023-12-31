import { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Loader from '../components/Layout/Loader';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import styles from '../styles/styles';
import Footer from '../components/Layout/Footer';
import { useGetProductsQuery } from '../slices/api/productApiSlice';

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { data: productsData, isSuccess, isLoading } = useGetProductsQuery();
  const [allProducts, setAllProducts] = useState(
    isSuccess ? productsData.products : []
  );
  useEffect(() => {
    if (isSuccess) {
      setAllProducts(productsData.products);
    }
  }, [productsData, isSuccess]);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
