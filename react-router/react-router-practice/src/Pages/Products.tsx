import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Headphones" },
  { id: 3, name: "Keyboard" },
];

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(({ id, name }) => (
          <li key={id}>
            <Link to={`/products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;