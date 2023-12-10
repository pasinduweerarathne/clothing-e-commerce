import { useEffect, useState } from "react";
import Banner from "../../components/banner";
import Products from "../../components/products";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const data = useLoaderData();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.data);
  }, [data]);

  return (
    <div>
      <Banner />
      <Products products={products} />
    </div>
  );
};

export default Home;
