export default function DiscountSelector() {
	return (
		<div className="discount">
			<input placeholder="0" />
			<select>
				<option>% off</option>
				<option>Flat</option>
			</select>
		</div>
	);
}
