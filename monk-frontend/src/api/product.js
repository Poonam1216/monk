import { MOCK_PRODUCTS } from "../mock/products";
// const API_URL = "https://stageapi.monkcommerce.app/task/products/search";

// export async function fetchProducts({ search = "", page = 0 }) {
// 	const res = await fetch(
// 		`${API_URL}?search=${search}&page=${page}&limit=10`,
// 		{
// 			headers: {
// 				"x-api-key": "x-api-key",
// 			},
// 		}
// 	);

// 	if (!res.ok) {
// 		throw new Error("Failed to fetch products");
// 	}

// 	return res.json();
// }

export async function fetchProducts({ search = "", page = 0 }) {
	await new Promise((r) => setTimeout(r, 400)); // loader feel

	const filtered = MOCK_PRODUCTS.filter((p) =>
		p.title.toLowerCase().includes(search.toLowerCase())
	);

	return filtered.slice(page * 10, page * 10 + 10);
}
