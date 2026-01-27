import { useEffect, useRef, useState } from "react";
import { fetchProducts } from "../api/product";

const PAGE_SIZE = 10;

export default function ProductPicker({ onClose, onSelect, initialSelected }) {
	const [selected, setSelected] = useState(() => initialSelected || {});
	const [search, setSearch] = useState("");

	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const listRef = useRef(null);

	/* ---------------- FETCH PRODUCTS ---------------- */

	useEffect(() => {
		// reset when search changes
		setProducts([]);
		setPage(0);
		setHasMore(true);
		loadProducts(true);
	}, [search]);

	async function loadProducts(reset = false) {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			const data = await fetchProducts({
				search,
				page: reset ? 0 : page,
				limit: PAGE_SIZE,
			});

			setProducts((prev) => (reset ? data : [...prev, ...data]));

			if (data.length < PAGE_SIZE) {
				setHasMore(false);
			}

			setPage((prev) => prev + 1);
		} catch (err) {
			console.error("Failed to load products", err);
		} finally {
			setLoading(false);
		}
	}

	/* ---------------- SCROLL HANDLER ---------------- */

	function handleScroll() {
		const el = listRef.current;
		if (!el || loading || !hasMore) return;

		if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
			loadProducts();
		}
	}

	/* ---------------- SELECTION LOGIC ---------------- */

	function toggleProduct(product) {
		setSelected((prev) => {
			if (prev[product.id]) {
				const copy = { ...prev };
				delete copy[product.id];
				return copy;
			}

			return {
				...prev,
				[product.id]: {
					product,
					variants: [...product.variants],
				},
			};
		});
	}

	function toggleVariant(product, variant) {
		setSelected((prev) => {
			const current = prev[product.id] || {
				product,
				variants: [],
			};

			const exists = current.variants.some((v) => v.id === variant.id);

			const variants = exists
				? current.variants.filter((v) => v.id !== variant.id)
				: [...current.variants, variant];

			return {
				...prev,
				[product.id]: { product, variants },
			};
		});
	}

	function handleAdd() {
		const result = Object.values(selected).filter(
			(item) => item.variants.length > 0
		);

		if (!result.length) return;
		onSelect(result);
	}

	/* ---------------- UI ---------------- */

	return (
		<div className="picker-backdrop">
			<div className="picker-modal">
				<div className="picker-header">
					<h3>Select Products</h3>
					<button className="icon-btn" onClick={onClose}>
						✕
					</button>
				</div>

				<input
					className="picker-search"
					placeholder="Search product"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<div
					className="picker-list"
					ref={listRef}
					onScroll={handleScroll}
					style={{ maxHeight: 400, overflowY: "auto" }}
				>
					{products.map((product) => {
						const selectedProduct = selected[product.id];
						const selectedVariants =
							selectedProduct?.variants || [];

						return (
							<div key={product.id} className="picker-product">
								<label className="picker-product-row">
									<input
										type="checkbox"
										checked={!!selectedProduct}
										onChange={() => toggleProduct(product)}
									/>
									<span>{product.title}</span>
								</label>

								<div className="picker-variants">
									{product.variants.map((variant) => (
										<label
											key={variant.id}
											className="picker-variant-row"
										>
											<input
												type="checkbox"
												checked={selectedVariants.some(
													(v) => v.id === variant.id
												)}
												onChange={() =>
													toggleVariant(
														product,
														variant
													)
												}
											/>
											<span>{variant.title}</span>
										</label>
									))}
								</div>
							</div>
						);
					})}

					{loading && (
						<div
							style={{
								padding: 12,
								textAlign: "center",
								color: "#666",
							}}
						>
							Loading products...
						</div>
					)}
				</div>

				<div className="picker-footer">
					<span>
						{
							Object.values(selected).filter(
								(i) => i.variants.length > 0
							).length
						}{" "}
						product selected
					</span>
					<div>
						<button onClick={onClose}>Cancel</button>
						<button className="btn-green" onClick={handleAdd}>
							Add
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
