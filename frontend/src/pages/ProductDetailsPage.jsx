import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useGetProductByIdQuery } from '../slices/api/productApiSlice';
import { useGetAllEventsQuery } from '../slices/api/eventApiSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: productData } = useGetProductByIdQuery(id);
  console.log(id);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get('isEvent');
  const { data: eventsData, isSuccess } = useGetAllEventsQuery();
  const [allEvents, setAllEvents] = useState(
    isSuccess ? eventsData.events : []
  );
  useEffect(() => {
    if (isSuccess) {
      setAllEvents(eventsData.events);
    }
  }, [eventsData, isSuccess]);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      setData(productData?.product);
    }
  }, [productData, allEvents, eventData, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
