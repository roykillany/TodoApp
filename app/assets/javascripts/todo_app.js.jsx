(function() {
	var Route = ReactRouter.Route;
	var Router = ReactRouter.Router;

	$(document).ready(function() {
		React.render(
			<Router>
				<Route path="/" component={App}>
					<Route path="todos" component={TodoIndex}/>
				</Route>
			</Router>,
			document.getElementById("content")
		)
	});
})();