if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(function() {
		console.log('Registration successful');
	})
	.catch(function() {
		console.log('Service worker registration failed');
	});
}