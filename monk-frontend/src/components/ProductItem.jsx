import { useState } from "react";
import VariantItem from "./VariantItem";
import ProductPicker from "./ProductPicker";

export default function ProductItem({
	product,
	index,
	products,
	setProducts,
	setError,
}) {
	const [openPicker, setOpenPicker] = useState(false);

	function toggleVariants() {
		const updated = [...products];
		updated[index].showVariants = !updated[index].showVariants;
		setProducts(updated);
	}

	function updateDiscount(key, value) {
		const updated = [...products];
		updated[index].discount = {
			...updated[index].discount,
			[key]: value,
		};
		setProducts(updated);
	}

	return (
		<div
			className="product-card"
			draggable
			onDragStart={(e) => e.dataTransfer.setData("productIndex", index)}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => {
				const from = Number(e.dataTransfer.getData("productIndex"));
				if (from === index) return;

				const updated = [...products];
				const [moved] = updated.splice(from, 1);
				updated.splice(index, 0, moved);
				setProducts(updated);
			}}
		>
			<div className="product-row">
				<span className="drag">⋮⋮</span>

				<input
					className="product-input"
					value={product.title || "Select Product"}
					readOnly
				/>

				<button
					className="edit-btn"
					onClick={() => setOpenPicker(true)}
				>
					✏️
				</button>

				{product.discount ? (
					<div className="discount-box">
						<input
							type="number"
							value={product.discount.value}
							onChange={(e) =>
								updateDiscount("value", e.target.value)
							}
						/>
						<select
							value={product.discount.type}
							onChange={(e) =>
								updateDiscount("type", e.target.value)
							}
						>
							<option value="%">% Off</option>
							<option value="flat">Flat Off</option>
						</select>
					</div>
				) : (
					<button
						className="btn-green"
						onClick={() => {
							updateDiscount("value", 10);
							updateDiscount("type", "%");
						}}
					>
						Add Discount
					</button>
				)}
			</div>

			{openPicker && (
				<ProductPicker
					onClose={() => setOpenPicker(false)}
					initialSelected={
						product.originalProductId
							? {
									[product.originalProductId]: {
										product: {
											id: product.originalProductId,
											title: product.title,
											variants: product.variants,
										},
										variants: product.variants,
									},
							  }
							: {}
					}
					onSelect={(selectedItems) => {
						const remainingSlots = 4 - (products.length - 1);

						if (selectedItems.length > remainingSlots) {
							setError(
								`You can only add ${remainingSlots} more product(s). Maximum allowed is 4.`
							);
						} else {
							setError("");
						}

						const allowedItems = selectedItems.slice(
							0,
							remainingSlots
						);

						const updated = [...products];
						updated.splice(index, 1);

						allowedItems.forEach((item, i) => {
							updated.splice(index + i, 0, {
								id: `row-${Date.now()}-${i}`,
								originalProductId: item.product.id,
								title: item.product.title,
								variants: item.variants,
								discount: null,
								showVariants: false,
							});
						});

						setProducts(updated);
						setOpenPicker(false);
					}}
				/>
			)}

			{product.variants.length > 0 && (
				<button className="link" onClick={toggleVariants}>
					{product.showVariants ? "Hide variants" : "Show variants"}
				</button>
			)}

			{product.showVariants &&
				product.variants.map((variant, vIndex) => (
					<VariantItem
						key={variant.id}
						variant={variant}
						vIndex={vIndex}
						productIndex={index}
						products={products}
						setProducts={setProducts}
					/>
				))}
		</div>
	);
}
