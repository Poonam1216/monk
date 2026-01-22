export default function VariantItem({
	variant,
	vIndex,
	productIndex,
	products,
	setProducts,
}) {
	function onDragStart(e) {
		e.dataTransfer.setData(
			"text/plain",
			JSON.stringify({ productIndex, vIndex })
		);
	}

	function onDrop(e) {
		const { productIndex: pIdx, vIndex: from } = JSON.parse(
			e.dataTransfer.getData("text/plain")
		);

		if (from === vIndex) return;

		const updated = [...products];
		const variants = [...updated[pIdx].variants];

		const [moved] = variants.splice(from, 1);
		variants.splice(vIndex, 0, moved);

		updated[pIdx].variants = variants;
		setProducts(updated);
	}

	return (
		<div
			className="variant"
			draggable
			onDragStart={onDragStart}
			onDragOver={(e) => e.preventDefault()}
			onDrop={onDrop}
		>
			<span className="drag">⋮⋮</span>
			<span>{variant.title}</span>
			<button
				className="icon-btn"
				onClick={() => {
					const updated = [...products];
					const vars = updated[productIndex].variants.filter(
						(_, i) => i !== vIndex
					);

					updated[productIndex].variants = vars;

					if (vars.length === 0) {
						updated.splice(productIndex, 1);
					}

					setProducts(updated);
				}}
			>
				×
			</button>
		</div>
	);
}
