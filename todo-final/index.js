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
		$('#layer-popup')[0].showModal();
	};

	function removeListEditForm ($this) {
		const targetContent = $this.parents('.content');
		const targetSummary = targetContent.prev();
		const listEditTitleInput = targetSummary.find('.list-edit-title-input');
		const listEditDetailInput = targetContent.find('.list-edit-detail-input');

		targetSummary.children().removeAttr('hidden');
		listEditTitleInput.remove();
		targetContent.children().removeAttr('hidden');
		listEditDetailInput.remove();
		$('#edit-buttons').remove();
	};

	function validateForm (title, detail) {
		const listTexts = $.map(list.children().find('.list-title'), (element) => $(element).text());
		let warningText = '';

		if (!title.trim().length) {
			warningText = '제목을 입력해 주세요.';
			form.inputTitle.focus();
		} else if (!detail.trim().length) {
			warningText = '내용을 입력해 주세요.';
			form.inputDetail.focus();
		}
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
			form.inputIndex.focus();
			generateModal(warningText);
			return false;
		}
	};

	function initInputValue () {
		form.inputTitle.val('');
		form.inputDetail.val('');
		form.inputIndex.val('');
	};

	function createListElement (titleText, detailText) {
		const details = $('<details />');
		const icon = '<span class="material-symbols-outlined"> expand_more </span>';
		const summary = $(`<summary><span class="list-title">${titleText}</span>${icon}</summary>`);
		const content = $(`<div class="content"><p class="content-detail">${detailText}</p></div>`);
		const listDeleteButton = $('<button type="button" class="list-delete-button">X</button>');
		const listEditButton = $('<button type="button" class="list-edit-button">edit</button>');

		summary.prepend(listDeleteButton, listEditButton);
		details.append(summary, content);
		list.append(details);
		initInputValue();
	};

	function editListElement (index, inputTitleText, inputDetailText) {
		const targetList = $('details').eq(index - 1);

		targetList.find('.list-title').text(inputTitleText);
		targetList.find('.content-detail').text(inputDetailText);
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
				if (validateForm(inputTitleText, inputDetailText) && validateNumber(inputIndexText))
					editListElement(+inputIndexText, inputTitleText, inputDetailText);
				break;
			default:break;
		}
	});

	form.inputRadio.on('change', function () {
		const inputRadioValue = $('input:radio[name="select"]:checked').val();

		switch(inputRadioValue) {
			case Enum.CREATE:
				form.inputIndex.parent().attr('hidden', true);
				break;
			case Enum.UPDATE:
				form.inputIndex.parent().attr('hidden', false);
				break;
			default:break;
		}
	});

	$('.content').hide();

	list
		.on('click', '.list-delete-button', function () {
			$(this).parents('details').remove();
		})
		.on('click', '.list-edit-button', function (event) {
			event.stopPropagation();

			const targetSummary = $(this).parent();
			const icon = targetSummary.find('.material-symbols-outlined');
			const targetContent = targetSummary.next('.content');
			const listTitleEditInput = $('<input type="text" class="list-edit-title-input">');
			const listDetailEditInput = $('<textarea class="list-edit-detail-input" />');
			const listEditButtons = $('<menu id="edit-buttons" />')
			const listEditButton = $('<button type="button" class="list-edit-confirm-button">수정</button>');
			const listEditCancelButton = $('<button type="button" class="list-edit-cancel-button">취소</button>');
	
			targetSummary.children().attr('hidden', true);
			targetContent.find('.content-detail').attr('hidden', true);
			targetSummary.append(listTitleEditInput);
			listEditButtons.append(listEditButton, listEditCancelButton);
			targetContent.append(listDetailEditInput, listEditButtons);
			$(this).parents('details').attr('open', true);
			targetContent.slideDown(200, () => {
				icon.text('expand_less');
			});
		})
		.on('click', 'details summary', function (event) {
			event.preventDefault();

			const details = $(this).parent();
			const icon = $(this).find('.material-symbols-outlined');
			const content = $(this).siblings();
	
			if (details.attr('open')) {
				content.slideUp(200, () => {
					icon.text('expand_more');
					details.attr('open', false);
				});
			} else if(!details.attr('open')) {
				details.attr('open', true);
				content.slideDown(200, () => {
					icon.text('expand_less');
				});      
			}
		})
		.on('click', '.list-edit-title-input', function (event) {
			event.stopPropagation();
		})
		.on('click', '.list-edit-confirm-button', function (event) {
			event.stopPropagation();

			const targetSummary = $(this).parents('.content').prev();
			const targetContent = $(this).parents('.content');
			const listEditTitleInput = targetSummary.find('.list-edit-title-input');
			const listEditDetailInput = targetContent.find('.list-edit-detail-input');

			if (validateForm(listEditTitleInput.val(), listEditDetailInput.val())) {
				targetSummary.find('.list-title').text(listEditTitleInput.val());
				targetContent.find('.content-detail').text(listEditDetailInput.val());
				removeListEditForm($(this));
			}
		})
		.on('click', '.list-edit-cancel-button', function (event) {
			event.stopPropagation();
			removeListEditForm($(this));
		})

	$('#layer-popup')
		.on('click', '#close-button', function () {
			$('#layer-popup')[0].close();
		})
		.on('click', function (event) {
			const dialog = $('#layer-popup')[0];
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
