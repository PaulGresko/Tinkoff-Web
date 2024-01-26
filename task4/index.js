let tempID;
const startCards = [
  {
    title: "Классное небо",
    description: "НУ ШАРИКИ ЛЕТАЮТ",
    image: "https://img.freepik.com/free-photo/landscape-of-morning-fog-and-mountains-with-hot-air-balloons-at-sunrise_335224-794.jpg?w=1380&t=st=1700292530~exp=1700293130~hmac=084204bc8bbaca9a30ce7213a9cacae718ee9a699b32c1dc4f28d3372619614e",
    supplier: "Создатель воздушных шаров"
  },
  {
    title: "Просто кит",
    description: "Реальный кит",
    image: "https://catherineasquithgallery.com/uploads/posts/2021-02/1613224756_126-p-fon-sinii-kit-171.jpg",
    supplier: "Океан"
  },
  {
    title: "Кот в очках",
    description: "Почти как кот в сапогах, но только в очках",
    image: "https://uprostim.com/wp-content/uploads/2021/05/image041-5.jpg",
    supplier: "Кошатник"
  },
  {
    title: "БАРС",
    description: "БОЛЬШАЯ КРАСИВАЯ КОШКА, Барсик",
    image: "https://cheese-head.ru/wp-content/uploads/5/f/c/5fcddb8078d03f1406b0f766274a2da6.png",
    supplier: "Кошатник"
  },
  {
    title: "Корги",
    description: "Эта собака светится",
    image: "https://i3.imageban.ru/out/2023/03/07/216557d5591866aa494fe733f9459afe.jpg",
    supplier: "Собачник"
  },
  {
    title: "Карточка",
    description: "Карточка без картинки",
    image: "",
    supplier: "Я"
  }
];
showCardsWithWaiting();

async function getMyInfo() {
  await fetch('http://localhost:3000/me')
    .then(response => {
      return response.json();
    })
    .then(data => {
      document.getElementById('about').style.display = 'block';
      document.getElementById('about-me-text').innerText = data.group + " " + data.name;
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function closeMyInfo() {
  document.getElementById('about').style.display = 'none';
}

window.onclick = function (event) {
  var modal = document.getElementById('about');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

function toggleAddPanel() {
  let overlay = document.querySelector('.overlay');
  let addPanel = document.querySelector('.add-panel');


  if (overlay.style.display === 'none' || overlay.style.display === '') {
    overlay.style.display = 'block';
    addPanel.style.display = 'block';
  } else {
    showCards();
    clearInputs();
    let editButton = document.getElementById('new_product-button');
    editButton.innerHTML = 'Добавить';
    editButton.onclick = function () {
      AddNewCard();
    };
    overlay.style.display = 'none';
    addPanel.style.display = 'none';
  }
}

async function AddNewCard() {
  let image = document.querySelector('.input-url').value;
  let title = document.querySelector('.input-title').value;
  let supplier = document.querySelector('.input-supplier').value;
  let description = document.querySelector('.input-description').value;


  let newCard = {
    image: image,
    title: title,
    supplier: supplier,
    description: description
  };

  await fetch(`http://localhost:3000/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard)
  })
    .then(response => {
      if (response.ok) {
        toggleAddPanel();
      } else {
        console.error('Create card request failed with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Create card request failed:', error);
    });
}

function AddNewCardWithWaiting() {
  openLoadIcon();
  setTimeout(function () {
    AddNewCard();
    closeLoadIcon();
  }, 1000);
}

async function CreateStartCards() {
  openLoadIcon();
  const cards = await fetch('http://localhost:3000/cards').then(response=>{return response.json()});
  if(cards.length === 0){
    await Promise.all(startCards.map(async (newCard) => {
      await fetch('http://localhost:3000/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard)
      });
    }));  
  }
  else{
    alert("Cards already exists")
  }
  await showCards();
  closeLoadIcon();
}

function clearInputs() {
  let inputs = document.querySelectorAll('.product-inputs input, .product-inputs textarea, .input-url');
  inputs.forEach(function (input) {
    input.value = '';
  });
}

function editCard(card) {

  toggleAddPanel();
  let editButton = document.getElementById('new_product-button');
  editButton.innerHTML = 'Изменить';
  editButton.onclick = function () {
    updateCard(card);
  };

  let imageUrl = card.querySelector('.card-head img').getAttribute('src');
  document.querySelector('.input-url').value = imageUrl ? imageUrl : '';


  let cardBody = card.closest('.card').querySelector('.card-body');
  document.querySelector('.input-title').value = cardBody.querySelector('.product-title b').innerText;
  document.querySelector('.input-supplier').value = cardBody.querySelector('.product-supplier h4').innerText;
  tempID = cardBody.querySelector('.product-code').innerText;
  document.querySelector('.input-description').value = cardBody.querySelector('.product-description-body').innerText;


  editingCard = card.closest('.card');
}

async function updateCard() {

  let imageUrl = document.querySelector('.input-url').value;
  let title = document.querySelector('.input-title').value;
  let supplier = document.querySelector('.input-supplier').value;
  let description = document.querySelector('.input-description').value;

  existingCards = {
    image: imageUrl,
    title: title,
    supplier: supplier,
    description: description
  };
  await fetch(`http://localhost:3000/cards/${tempID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(existingCards)
  })
    .then(response => {
      if (response.ok) {
        toggleAddPanel();
      } else {
        console.error('Update card request failed with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Update card request failed:', error);
    });
}

async function deleteCard(card) {
  let cardBody = card.closest('.card').querySelector('.card-body');
  let code = cardBody.querySelector('.product-code').innerText;

  await fetch(`http://localhost:3000/cards/${code}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        showCards();
      }
    })
    .catch(error => {
      console.error('Delete request failed:', error);
    });
}

async function showCards() {
  

  await fetch('http://localhost:3000/cards')
    .then(response => {
      if (!response.ok) {
        throw new Error('Some problems...(');
      }
      return response.json();
    })
    .then(data => {
      if (data.length !== 0) {
        let cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';
        console.log(data);
        data.forEach(cardData => {
          let card = createCardElement(cardData);
          cardContainer.appendChild(card);
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function showCardsWithWaiting() {
  openLoadIcon();
  setTimeout(function () {
    showCards();
    closeLoadIcon();
  }, 1000);
}

function createCardElement(cardData) {
  let card = document.createElement('div');
  card.className = 'card';

  let cardHead = document.createElement('div');
  cardHead.className = 'card-head';
  let cardImage = document.createElement('img');
  cardImage.src = cardData.image || " ";
  cardHead.appendChild(cardImage);
  card.appendChild(cardHead);

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let productDesc = document.createElement('div');
  productDesc.className = 'product-desc';

  let productTitle = document.createElement('span');
  productTitle.className = 'product-title';
  productTitle.innerHTML = '<b>' + cardData.title + '</b>';
  productDesc.appendChild(productTitle);

  let productSupplier = document.createElement('span');
  productSupplier.className = 'product-supplier';
  productSupplier.innerHTML = '<h4>' + cardData.supplier + '</h4>';
  productDesc.appendChild(productSupplier);

  let productCode = document.createElement('span');
  productCode.className = 'product-code';
  productCode.innerHTML = cardData.id;
  productDesc.appendChild(productCode);

  cardBody.appendChild(productDesc);

  let productProperties = document.createElement('div');
  productProperties.className = 'product-properties';

  let productDescription = document.createElement('span');
  productDescription.className = 'product-description';
  productDescription.innerHTML = '<h4>Описание:</h4>';

  let productDescriptionBody = document.createElement('span');
  productDescriptionBody.className = 'product-description-body';
  productDescriptionBody.innerHTML = cardData.description;

  productProperties.appendChild(productDescription);
  productProperties.appendChild(productDescriptionBody);

  cardBody.appendChild(productProperties);

  let actionButtons = document.createElement('div');
  actionButtons.className = 'action-buttons';

  let editButton = document.createElement('div');
  editButton.className = 'edit-button';
  editButton.onclick = function () {
    editCard(card);
  };
  let editImage = document.createElement('img');
  editImage.src = 'recourses/edit.png';
  editImage.alt = 'Edit Icon';
  editButton.appendChild(editImage);

  actionButtons.appendChild(editButton);

  let deleteButton = document.createElement('div');
  deleteButton.className = 'delete-button';
  deleteButton.onclick = function () {
    deleteCard(card);
  };
  let deleteImage = document.createElement('img');
  deleteImage.src = 'recourses/delete.png';
  deleteImage.alt = 'Delete Icon';
  deleteButton.appendChild(deleteImage);

  actionButtons.appendChild(deleteButton);

  cardBody.appendChild(actionButtons);
  card.appendChild(cardBody);

  return card;
}

function openLoadIcon() {
  document.getElementById('loadingIcon').style.display = 'block';
}

function closeLoadIcon() {
  document.getElementById('loadingIcon').style.display = 'none';
}