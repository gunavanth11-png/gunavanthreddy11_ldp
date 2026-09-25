import { useParams, useNavigate, Link } from "react-router-dom";

const productData: Record<string, { name: string; price: string }> = {
  "1": { name: "Laptop", price: "$999" },
  "2": { name: "Headphones", price: "$199" },
  "3": { name: "Keyboard", price: "$59" },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = id ? productData[id] : undefined;

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price}</p>
      <p>Product ID from URL: {id}</p>

      <button onClick={() => navigate(-1)}>Go Back</button>
      <br />
      <Link to="/products">Back to Products</Link>
    </div>
  );
};

export default ProductDetail;