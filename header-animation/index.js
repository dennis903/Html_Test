const header = $('header');
const headerHeight = header[0].getBoundingClientRect().height;

$(function () {
	$(window).on('scroll', function () {
		// console.log(window.scrollY, headerHeight);
		// if (window.scrollY > 20 && window.scrollY < 100) {
		// 	window.scrollY = 400;
		// } else {
		// 	window.scrollY = 
		// }
		if (window.scrollY > headerHeight) {
			header.css('background-color', 'blue');
		}
		else if (window.scrollY < headerHeight) {
			header.css('background-color', 'white');
		}
	})
});