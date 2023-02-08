function validateForm (str) {
  const warningDiv = $('#warning');
  const listTexts = $.map($('#list').children().find('p'), (element) => $(element).text());
  let warningText = '';

  if (!str.trim().length) {
    warningText = '내용을 입력해 주세요.';
  } else if (listTexts.findIndex(element => element === str) !== -1) {
    warningText = '중복된 내용입니다.';
  }

  warningDiv.text(warningText);
 
  return (warningText.length === 0);
};

function validateNumber (str) {
  const listLength = $('#list').children().length;
  const warningDiv = $('#warning');
  let warningText = '';

  if (!str.trim().length) {
    warningText = '내용을 입력해 주세요.';
  } else if (isNaN(str)) {
    warningText = '숫자만 입력해 주세요.';
  } else if (Number(str) > listLength || Number(str) <= 0) {
    warningText = '적절한 범위의 숫자를 입력해주세요.';
  }
  
  warningDiv.text('number:' + warningText);

  return (warningText.length === 0)
}

$(function () {
  const selectInput = $('#select-input');
  const todoInput = $('#todo-input');

  $('#todo-form').on('submit', function (event) {
    event.preventDefault();

    const $this = $(this);
    const inputText = todoInput.val();
    const selectText = selectInput.val();
    const todoElement = $('<li class="list-item" />');
    const deleteButton = $('<button type="button" class="delete-button">X</button>');
    const editButton = $('<button type="button" class="edit-button">edit</button>');
    const todoParagraph = $('<p />').text(inputText);
    const selectValue = $this.find('#select').val();

    // if (selectValue === 'create') {
    //   if (validateForm(inputText)) {
    //     $('#list').append(todoElement.append(todoParagraph, editButton, deleteButton));
    //   }  
    // } else {
    //   if (validateNumber(selectText) && validateForm(inputText)) {
    //     $('.list-item').eq(Number(selectText) - 1).find('p').text(inputText);
    //   }
    // }

    switch (selectValue) {
      case 'create':
        if (validateForm(inputText)) {
          $('#list').append(todoElement.append(todoParagraph, editButton, deleteButton));
        } 
      break;
      default:
        if (validateNumber(selectText) && validateForm(inputText)) {
          $('.list-item').eq(Number(selectText) - 1).find('p').text(inputText);
        }
      break;
    }

    todoInput.val('');
    selectInput.val('');
  });

  $('#list')
    .on('click', '.delete-button', function () {
      $(this).parent().remove();
    })
    .on('click', '.edit-button', function () {
      const currentLi = $(this).parent();
      const editForm = $('<form class="edit-form"></form>');
      const editInput = $('<input type="text" class="edit-input">');
      const confirmButton = $('<button type="submit" class="confirm-button">수정</button>');
      const cancelButton = $('<button type="button" class="cancel-button">취소</button>');

      editForm.append(editInput, confirmButton, cancelButton);
      currentLi.children().attr('hidden', true);
      currentLi.append(editForm);
    })
    .on('submit', '.edit-form', function (event) {
      event.preventDefault();
      const $this = $(this);
      const currentLi = $this.parent();
      const inputText = $this.find('.edit-input').val();

      if (validateForm(inputText)) {
        currentLi.find('p').text(inputText);
        currentLi.children().attr('hidden', false);
        $this.remove();
      }
    })
    .on('click', '.cancel-button', function () {
      console.log('1 :', $(this).parents('.list-item'));
      console.log('2 :', $(this).closest('.list-item'));
      const currentLi = $(this).parent().parent();

      currentLi.find('.edit-form').remove();
      currentLi.children().attr('hidden', false);
    })

  $('#select').on('change', function() {
    const $this = $(this);

    // if ($this.val() === 'create') {
    //   selectInput.attr('hidden', true);
    // } else if ($this.val() === 'update') {
    //   selectInput.attr('hidden', false);
    // }

    switch (selectValue) {
      case 'create':
        selectInput.attr('hidden', true);
      break;
      case 'update':
        selectInput.attr('hidden', false);
      break;
    }
  })
});
