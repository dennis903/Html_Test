$(function(){
	let $section = $('.section');
	let $sectionIndex = $('.section-index li');
	let $mostVisible = $('.section').mostVisible();
	let mostVisibleIndex = $section.index($mostVisible);

	$('.scroll-section')
		.on('scroll', function(){
			$mostVisible = $section.mostVisible();
			let current = $section.index($mostVisible);
			if (mostVisibleIndex != current) {
				mostVisibleIndex = current;
				$sectionIndex.removeClass('on');
				$sectionIndex.eq(mostVisibleIndex).addClass('on');
			}
		})

	$sectionIndex.on('click', function (event) {
		const nodes = [...event.target.parentElement.children];
		const targetSection = nodes.indexOf(event.target);
		const currentSection = mostVisibleIndex;

		$section.eq(targetSection)[0].scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});

	})
});
