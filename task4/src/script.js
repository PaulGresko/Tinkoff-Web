showCardsFromLocalStorage();

function toggleAddPanel() {
  var overlay = document.querySelector('.overlay');
  var addPanel = document.querySelector('.add-panel');


  if (overlay.style.display === 'none' || overlay.style.display === '') {
    overlay.style.display = 'block';
    addPanel.style.display = 'block';
  } else {
    showCardsFromLocalStorage();
    clearInputs();
    var editButton = document.getElementById('new_product-button');
    editButton.innerHTML = 'Добавить';
    editButton.onclick = function () {
      AddNewCard();
    };
    overlay.style.display = 'none';
    addPanel.style.display = 'none';
  }
}

function AddNewCard() {
  // Получаем значения из input и textarea
  var imageUrl = document.querySelector('.input-url').value;
  var title = document.querySelector('.input-title').value;
  var supplier = document.querySelector('.input-supplier').value;
  var code = document.querySelector('.input-code').value;
  var description = document.querySelector('.input-description').value;

  // Создаем объект для новой карточки
  var newCard = {
    imageUrl: imageUrl,
    title: title,
    supplier: supplier,
    code: code,
    description: description
  };

  // Получаем текущие карточки из localStorage
  var existingCards = JSON.parse(localStorage.getItem('cards')) || [];

  // Добавляем новую карточку в массив
  existingCards.push(newCard);

  // Обновляем localStorage
  localStorage.setItem('cards', JSON.stringify(existingCards));

  toggleAddPanel();
}

function clearInputs() {
  // Очищаем значения в input и textarea
  var inputs = document.querySelectorAll('.product-inputs input, .product-inputs textarea, .input-url');
  inputs.forEach(function (input) {
    input.value = '';
  });
}

function editCard(card) {

  toggleAddPanel();
  var editButton = document.getElementById('new_product-button');
  editButton.innerHTML = 'Изменить';
  editButton.onclick = function () {
    updateCard(card);
  };
  // Заполняем поля в панели редактирования текущими значениями карточки
  var imageUrl = card.querySelector('.card-head img').getAttribute('src');
  document.querySelector('.input-url').value = imageUrl ? imageUrl : '';

  // Заполняем остальные поля
  var cardBody = card.closest('.card').querySelector('.card-body');
  document.querySelector('.input-title').value = cardBody.querySelector('.product-title b').innerText;
  document.querySelector('.input-supplier').value = cardBody.querySelector('.product-supplier h4').innerText;
  document.querySelector('.input-code').value = cardBody.querySelector('.product-code').innerText;
  document.querySelector('.input-description').value = cardBody.querySelector('.product-description-body').innerText;

  // Запоминаем карточку, которую редактируем
  editingCard = card.closest('.card');
}

function updateCard() {
  // Получаем значения из input и textarea
  var imageUrl = document.querySelector('.input-url').value;
  var title = document.querySelector('.input-title').value;
  var supplier = document.querySelector('.input-supplier').value;
  var code = document.querySelector('.input-code').value;
  var description = document.querySelector('.input-description').value;
  var existingCards = JSON.parse(localStorage.getItem('cards')) || [];

  // Ищем индекс карточки с заданным кодом
  var cardIndex = existingCards.findIndex(function (existingCard) {
    return existingCard.code === code;
  });

  // Если карточка найдена, обновляем её значения
  if (cardIndex !== -1) {
    existingCards[cardIndex] = {
      imageUrl: imageUrl,
      title: title,
      supplier: supplier,
      code: code,
      description: description
    };

    // Обновляем localStorage
    localStorage.setItem('cards', JSON.stringify(existingCards));
  }

  // Закрываем панель
  toggleAddPanel();
}

function deleteCard(card) {
  var cardBody = card.closest('.card').querySelector('.card-body');
  var code = cardBody.querySelector('.product-code').innerText;
  var existingCards = JSON.parse(localStorage.getItem('cards')) || [];
  var cardIndex = existingCards.findIndex(function (existingCard) {
    return existingCard.code === code;
  });
  if (cardIndex !== -1) {
    existingCards.splice(cardIndex, 1);

    // Обновляем localStorage
    localStorage.setItem('cards', JSON.stringify(existingCards));
  }
  showCardsFromLocalStorage();
}

function showCardsFromLocalStorage() {
  var cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
  var savedCards = JSON.parse(localStorage.getItem('cards')) || [];
  savedCards.forEach(function (cardData) {
    var card = createCardElement(cardData);
    cardContainer.appendChild(card);
  });
}

function createCardElement(cardData) {
  var card = document.createElement('div');
  card.className = 'card';

  var cardHead = document.createElement('div');
  cardHead.className = 'card-head';
  var cardImage = document.createElement('img');
  cardImage.src = cardData.imageUrl || " ";
  cardHead.appendChild(cardImage);
  card.appendChild(cardHead);

  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  var productDesc = document.createElement('div');
  productDesc.className = 'product-desc';

  var productTitle = document.createElement('span');
  productTitle.className = 'product-title';
  productTitle.innerHTML = '<b>' + cardData.title + '</b>';
  productDesc.appendChild(productTitle);

  var productSupplier = document.createElement('span');
  productSupplier.className = 'product-supplier';
  productSupplier.innerHTML = '<h4>' + cardData.supplier + '</h4>';
  productDesc.appendChild(productSupplier);

  var productCode = document.createElement('span');
  productCode.className = 'product-code';
  productCode.innerHTML = cardData.code;
  productDesc.appendChild(productCode);

  cardBody.appendChild(productDesc);

  var productProperties = document.createElement('div');
  productProperties.className = 'product-properties';

  var productDescription = document.createElement('span');
  productDescription.className = 'product-description';
  productDescription.innerHTML = '<h4>Описание:</h4>';

  var productDescriptionBody = document.createElement('span');
  productDescriptionBody.className = 'product-description-body';
  productDescriptionBody.innerHTML =  cardData.description;
  
  productProperties.appendChild(productDescription);
  productProperties.appendChild(productDescriptionBody);

  cardBody.appendChild(productProperties);

  var actionButtons = document.createElement('div');
  actionButtons.className = 'action-buttons';

  var editButton = document.createElement('div');
  editButton.className = 'edit-button';
  editButton.onclick = function () {
    editCard(card);
  };
  var editImage = document.createElement('img');
  editImage.src = 'recourses/edit.png';
  editImage.alt = 'Edit Icon';
  editButton.appendChild(editImage);

  actionButtons.appendChild(editButton);

  var deleteButton = document.createElement('div');
  deleteButton.className = 'delete-button';
  deleteButton.onclick = function () {
    deleteCard(card);
  };
  var deleteImage = document.createElement('img');
  deleteImage.src = 'recourses/delete.png';
  deleteImage.alt = 'Delete Icon';
  deleteButton.appendChild(deleteImage);

  actionButtons.appendChild(deleteButton);

  cardBody.appendChild(actionButtons);
  card.appendChild(cardBody);

  return card;
}
