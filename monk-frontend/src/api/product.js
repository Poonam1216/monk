const API_URL = "https://stageapi.monkcommerce.app/task/products/search";

export async function fetchProducts({ search = "", page = 0, limit = 10 }) {
	const res = await fetch(
		`${API_URL}?search=${encodeURIComponent(
			search
		)}&page=${page}&limit=${limit}`,
		{
			headers: {
				"x-api-key": import.meta.env.VITE_MONK_API_KEY,
			},
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}
