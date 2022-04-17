module.exports = () => {
	const data = {
		products: []
	}

	for (let i = 0; i < 1000; i++) {
		data.products.push({
			id: i + 1,
			price: Math.floor(Math.random() * 200) + 1,
			name: `Sneaker ${i + 1}`,
		})
	}

	return data;
}