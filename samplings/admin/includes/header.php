<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<title>Bienvenue</title>
	<link rel="stylesheet" type="text/css" href="./assets/css/style.css?<?=time()?>">
	<link rel="stylesheet" type="text/css" href="./assets/vendors/font-awesome/css/all.min.css?<?=time()?>">
</head>

<body>
	<header>
		<div class="left-section">
			<img src="./assets/images/logo.svg" />
		</div>
		<div class="middle-section">
			<input type="text" placeholder="text here" name="top_search_input" id="top_search_input"/>
		</div>
		<div class="right-section">
			<div class="infos"><i class="fas fa-cogs"></i></div>
			<div class="message"><i class="fas fa-envelope"></i></div>
			<div class="user"><i class="fas fa-user"></i></div>
		</div>
	</header>
	<nav>
		<ul>
			<li><a href="#">Test</a></li>
			<li><a href="#">Test 2 <i class="fas fa-chevron-down"></i></a>
				<ul>
					<li><a href="#">Test 2.1</a></li>
					<li><a href="#">Test 2.2</a></li>
					<li><a href="#">Test 2.3 <i class="fas fa-chevron-down"></i></a>
						<ul>
							<li><a href="#">Test 2.3.1</a></li>
							<li><a href="#">Test 2.3.2</a></li>
							<li><a href="#">Test 2.3.3</a></li>
						</ul>
					</li>
				</ul>
			</li>
			<li><a href="#">test</a></li>
			<li><a href="#">test</a></li>
		</ul>
	</nav>
	<main>