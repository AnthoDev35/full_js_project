<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<title>Full JS</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
    	<link rel="stylesheet" type="text/css" href="assets/vendor/simplemde/simplemde.css">
	</head>
	<body>
		<textarea id='global-container'></textarea>
		<script src="assets/vendor/simplemde/simplemde.js"></script>
        <script>
            const simplemde = new SimpleMDE({ element: document.getElementById("global-container")});
        </script>
	</body>
</html>
