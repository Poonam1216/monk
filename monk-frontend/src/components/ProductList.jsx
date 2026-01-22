import { useState } from "react";
import ProductItem from "./ProductItem";

export default function ProductList({ products, setProducts }) {
	const [error, setError] = useState("");

	function addProduct() {
		if (products.length === 4) {
			setError("You can add a maximum of 4 products to a bundle.");
			return;
		}
		setError("");

		setProducts([
			...products,
			{
				id: `p-${Date.now()}`,
				title: "Select Product",
				discount: null,
				showVariants: false,
				variants: [],
			},
		]);
	}

	return (
		<div className="product-list">
			{products.map((product, index) => (
				<ProductItem
					key={product.id}
					product={product}
					index={index}
					products={products}
					setProducts={setProducts}
					setError={setError}
				/>
			))}

			<button className="btn-outline" onClick={addProduct}>
				Add Product
			</button>

			{error && <p className="error-text">{error}</p>}
		</div>
	);
}
