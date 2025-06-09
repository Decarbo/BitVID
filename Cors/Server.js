const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // node-fetch v3 workaround
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/youtube-suggestions', async (req, res) => {
	const q = req.query.q;
	if (!q) {
		console.log('❌ Missing query');
		return res.status(400).json({ error: 'Missing query' });
	}

	try {
		const url = `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;
		console.log(`🔄 Fetching: ${url}`);

		const response = await fetch(url);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("⚠️ Failed to fetch from Google:", response.status, errorText);
			return res.status(502).json({ error: 'Failed to fetch from Google' });
		}

		const data = await response.json();
		console.log("✅ Suggestions fetched:", data[1]);
		res.json(data);
	} catch (err) {
		console.error("❌ Server error:", err.message);
		res.status(500).json({ error: 'Internal Server Error', message: err.message });
	}
});

app.listen(8080, () => console.log('🚀 Proxy server running at http://localhost:8080'));
