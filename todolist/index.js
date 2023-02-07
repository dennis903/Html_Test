function validateForm (str) {
  const warningDiv = $('#warning');
//map으로 바꿔서 작업하기
  const listTexts = [];

  $('#list').children().find('p').text(function() {
    listTexts.push($(this).text());
  });
  console.log('validate form');
  let warningText = '';
  if (!str.trim().length) {
    warningText = '내용을 입력해 주세요.';
  } else if (listTexts.findIndex(element => element === str) !== -1) {
    warningText = '중복된 내용입니다.';
  }

  warningDiv.text(warningText);

  return (!!!warningText.length);
};

function validateNumber (str) {
  const listLength = $('#list').children().length;
  const numberRegex = /^[0-9]+$/;
  const numberWarningDiv = $('#number-warning');
  let warningText = '';

  if (!str.trim().length) {
    warningText = 'number: 내용을 입력해 주세요.';
  } else if (!str.match(numberRegex)) {
    warningText = 'number: 숫자만 입력해 주세요.';
  } else if (Number(str) > listLength || Number(str) <= 0)
    warningText = 'number: 적절한 범위의 숫자를 입력해주세요.';
  numberWarningDiv.text(warningText);

  if (warningText.length) {
    return false;
  } else {
    return true;
  }
}

$(function () {
  const selectInput = $('<input type="text" class="select-input" />')

  $('#todo-form').on('submit', function (event) {
    event.preventDefault();

    const $this = $(this);
    const inputText = $this.find('.todo-input').val();
    const selectText = $this.find('.select-input').val();
    const todoElement = $('<li class="list-item" />');
    const deleteButton = $('<button type="button" class="delete-button">X</button>');
    const todoParagraph = $('<p />').text(inputText);
    const selectValue = $this.find('#select').val();

    if (selectValue === 'create') {
      if (validateForm(inputText)) {
        $("#list").append(todoElement.append(todoParagraph, deleteButton));
      }  
    } else {
      if (validateNumber(selectText) && validateForm(inputText)) {
        $('.list-item').eq(Number(selectText) - 1).find('p').text(inputText);
      }
    }

    $($this.find('.todo-input')).val('');
    $($this.find('#select-input')).val('');
  });

  $('#list').on('click', '.delete-button', function () {
    $(this).parent().remove();
  });
  $('#select').on('change', function() {
    const $this = $(this);

    if ($this.val() === 'create') {
      selectInput.remove();
    } else if ($this.val() === 'update') {
      $this.after(selectInput);
    }
  })
});
