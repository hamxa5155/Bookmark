module.exports = (app) => {
	app.get('/logout', (req, res) => {
		req.session.destroy((err) => {
			res.json({ isLogoutSuccess: true });
		});
	});
}