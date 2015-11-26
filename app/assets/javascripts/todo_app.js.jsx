(function() {
	var Route = ReactRouter.Route;
	var Router = ReactRouter.Router;

	$(document).ready(function() {
		alert("hi");
		console.log("hi", App, TodoIndex);
		
		var $content = $("#content");
	  if ($content.length > 0) {
			React.render(
				<Router>
					<Route path="/" component={App}>
						<Route path="todos" component={TodoIndex}/>
					</Route>
				</Router>,
				document.getElementById("content")
			)
		}
	});
})();