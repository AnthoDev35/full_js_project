document.addEventListener("DOMContentLoaded", function () {
	var dropdowns = document.querySelectorAll("nav ul li > a:not(:only-child)");

	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].addEventListener("click", function (e) {
			var currentDropdown = this.nextElementSibling;
			this.parentElement.classList.toggle("opened");
			if (currentDropdown.style.display === "block") {
				currentDropdown.style.display = "none";
				currentDropdown.classList.remove("active");
			} else {
				currentDropdown.style.display = "block";
				currentDropdown.classList.add("active");
			}
			e.stopPropagation();
			e.preventDefault();
		});
	}

	const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
	dropdownToggles.forEach(function (toggle) {
		toggle.addEventListener('click', function () {
			var dropdown = this.parentElement.querySelector('.top-dropdown');
			closeAllDropdowns();
			if (dropdown) {
				dropdown.classList.remove('active');
			}
			toggle.classList.add('active');
		});
	});

	function closeAllDropdowns() {
		dropdownToggles.forEach(function (dropdown) {
			dropdown.classList.remove('active');
		});
	}

	document.addEventListener('click', function (event) {
		if (!event.target.matches('.dropdown-toggle')) {
			closeAllDropdowns();
		}
	});

});