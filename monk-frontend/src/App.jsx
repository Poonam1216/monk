import { useState } from "react";
import ProductList from "./components/ProductList";

export default function App() {
	const [products, setProducts] = useState([
		{
			id: "row-1",
			title: "",
			variants: [],
			discount: null,
			showVariants: false,
		},
	]);

	return (
		<div className="page">
			<h2 className="page-title">
				Add Bundle Products (Max. 4 Products)
			</h2>

			<ProductList products={products} setProducts={setProducts} />
		</div>
	);
}
