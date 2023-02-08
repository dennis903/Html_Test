
$(function () {
	const Enum = {
		CREATE: 'create',
		UPDATE: 'update',
	};

	const form = {
		inputTitle: $('#input-title'),
		inputIndex: $('#input-index'),
		inputDetail: $('#input-detail'),
		inputRadio: $('input:radio[name="select"]'),
	};

	const list = $('#list');

	function generateModal (warningText) {
		$('.layer-popup__contents').text(warningText);
		$('#layer-popup').get(0).showModal();
	}

	function validateForm (title, detail) {
		const listTexts = $.map(list.children().find('.list-title'), (element) => $(element).text());
		let warningText = '';

		if (!title.trim().length) {
			warningText = '제목을 입력해 주세요.';
		} else if (!detail.trim().length)
			warningText = '내용을 입력해 주세요.';
		else if (listTexts.findIndex(element => element === title) !== -1) {
			warningText = '중복된 내용입니다.';
		}
		
		if (warningText.length === 0) {
			return true;
		} else {
			generateModal(warningText);
			return false;
		}
	};
	
	function validateNumber (str) {
		const listLength = $('#list').children().length;
		let warningText = '';
	
		if (!str.trim().length) {
			warningText = '내용을 입력해 주세요.';
		} else if (isNaN(str)) {
			warningText = '숫자만 입력해 주세요.';
		} else if (Number(str) > listLength || Number(str) <= 0) {
			warningText = '적절한 범위의 숫자를 입력해주세요.';
		}
		
		if (warningText.length === 0) {
			return true;
		} else {
			generateModal(warningText);
			return false;
		}
	};

	function createListElement (titleText, detailText) {
		const details = $('<details />');
		const icon = '<span class="material-symbols-outlined"> expand_more </span>';
		const summary = $(`<summary><span class="list-title">${titleText}</span>${icon}</summary>`);
		const content = $(`<p class="content">${detailText}</p>`);
		const listDeleteButton = $('<button class="list-delete-button">X</button>');
		const listEditButton = $('<button class="list-edit-button">edit</button>')

		summary.append(listDeleteButton, listEditButton);
		details.append(summary, content);
		list.append(details);
	};

	function initInputValue () {
		form.inputTitle.val('');
		form.inputDetail.val('');
		form.inputIndex.val('');
	}

	function editListElement (index, inputTitleText, inputDetailText) {
		const targetList = $('details').eq(index - 1);

		targetList.find('.list-title').text(inputTitleText);
		targetList.find('.content').text(inputDetailText);
	};

	$('#todo-form').on('submit', function (event) {
		event.preventDefault();
		const inputTitleText = form.inputTitle.val();
		const inputIndexText = form.inputIndex.val();
		const inputDetailText = form.inputDetail.val();
		const inputRadioValue = $('input:radio[name="select"]:checked').val();

		switch(inputRadioValue) {
			case Enum.CREATE:
				if (validateForm(inputTitleText, inputDetailText)) {
					createListElement(inputTitleText, inputDetailText);
				}
				break;
			case Enum.UPDATE:
				if (validateNumber(inputIndexText) && validateForm(inputTitleText, inputDetailText))
					editListElement(+inputIndexText, inputTitleText, inputDetailText);
				break;
			default:
		}

		initInputValue();
	});

	form.inputRadio.on('change', () => {
		const inputRadioValue = $('input:radio[name="select"]:checked').val();

		switch(inputRadioValue) {
			case Enum.CREATE:
				form.inputIndex.parent().attr('hidden', true);
				break;
			case Enum.UPDATE:
				form.inputIndex.parent().attr('hidden', false);
				break;
			default:
		}
	});

	$('.content').css('display', 'none');

	list.on('click', '.list-delete-button', function () {
		$(this).parents('details').remove();
	});

	list.on('click', '.list-edit-button', function () {

	})

  list.on('click', "details summary", function (event) {
    event.preventDefault();

    const details = $(this).parent();
    const icon = $(this).find(".material-symbols-outlined");
    const content = $(this).siblings();

    if (details.attr("open")) {
      content.slideUp(200, () => {
        icon.text("expand_more");
        details.attr("open", false);
      });
    } else if(!details.attr("open")) {
			details.attr("open", true);
      content.slideDown(200, () => {
      	icon.text("expand_less");
			});      
    }
  });

	$('#layer-popup')
		.on('click', '#close-button', function () {
			$("#layer-popup").get(0).close();
		})
		.on('click', function (event){
			const dialog = $("#layer-popup").get(0);
  	  const rect = dialog.getBoundingClientRect();
   		const isInDialog =
 	    	rect.top <= event.clientY &&
      	event.clientY <= rect.top + rect.height &&
      	rect.left <= event.clientX &&
      	event.clientX <= rect.left + rect.width;
		  if (!isInDialog) {
      	dialog.close();
    	}
		});
	
	$('#all-delete-button').on('click', function () {
		list.children().remove();
	});


});