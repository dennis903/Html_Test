$(function () {
	const $wrap = $('.wrap');
	function removeOnOther ($element) {
		const $siblings = $element.siblings();
	
		$siblings.map((index, element) => {
			$(element).removeClass('on')
		});
	}

	$(window).on('scroll', function () {
		const scrollHeight = $(window).scrollTop();
		console.log(scrollHeight);
		if (scrollHeight > 1900 && scrollHeight <= 2500) {
				$wrap.eq(0).addClass('on');
				removeOnOther($wrap.eq(0));
		} else if (scrollHeight > 2500 && scrollHeight <= 3200) {
				$wrap.eq(1).addClass('on');
				removeOnOther($wrap.eq(1));
		} else if (scrollHeight > 3200 && scrollHeight <= 4000) {
				$wrap.eq(2).addClass('on');
				removeOnOther($wrap.eq(2));
		} else if (scrollHeight > 4000 && scrollHeight < 5000) {
			$wrap.eq(3).addClass('on');
			removeOnOther($wrap.eq(3));
		} else {
			$wrap.removeClass('on');
		}
	})
});