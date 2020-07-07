// Вспомогательные функции
function managerSuccessCheck(response, successText) {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
    newManager.setMessage(false, successText);
  } else {
    newManager.setMessage(true, response.data);
  }
}

function widgetSuccessCheck(response, successText) {
  if (response.success) {
    newWidget.clearTable();
    newWidget.fillTable(response.data);
    newManager.updateUsersList(response.data);
    newWidget.setMessage(false, successText);
  } else {
    newWidget.setMessage(true, response.data);
  }
}

// Выход из личного кабинета
const newButton = new LogoutButton();
newButton.action = () => ApiConnector.logout((response) => {
  if (response.success) {
    location.reload();
  }
});

// Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валюты
const newBoard = new RatesBoard();
function getExchangeRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      newBoard.clearTable();
      newBoard.fillTable(response.data);
    }
  }
)}

getExchangeRates();
setInterval(getExchangeRates, 60000);

// Операции с деньгами
const newManager = new MoneyManager();

// пополнение баланса
newManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    managerSuccessCheck(response, 'Вы успешно пополнили баланс!');
  });
}

// конвертирование валюты
newManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    managerSuccessCheck(response, 'Баланс успешно конвертирован!');
  });
}

// перевод валюты
newManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    managerSuccessCheck(response, 'Вы успешно осуществили перевод!');
  });
}

// Работа с избранным
const newWidget = new FavoritesWidget();

// начальный список избранного
ApiConnector.getFavorites((response) => {
  if (response.success) {
    newWidget.clearTable();
    newWidget.fillTable(response.data);
    newManager.updateUsersList(response.data);
  }
});

// добавление пользователя в список избранных
newWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    widgetSuccessCheck(response, 'Вы успешно добавили пользователя!');
  });
}

// удаление пользователя из избранного
newWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    widgetSuccessCheck(response, 'Вы успешно удалили пользователя!');
  });
}
