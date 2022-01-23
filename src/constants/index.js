const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const STATUS = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
};

const MESSAGE = {
  USER_UNAUTHORIZED: 'Пользователь не авторизован',
  USER_FORBIDDEN: 'Нет доступа',
  UNEXPECTED_ERROR: 'Непредвиденная ошибка',
  VALIDATION_FAIL: 'Ошибка при валидации',
  EMAIL_IS_TAKEN: 'Пользователь с таким почтовым адресом уже существует',
  USER_NOT_EXIST: 'Пользователя с таким email не существует',
  WRONG_PASSWORD: 'Не верный пароль',
  INVALID_ACTIVATION_LINK: 'Некорректная ссылка активации',
  WISHLIST_ADD_ERROR: 'Не удалось добавить книгу в список избранного',
};

const VALIDATION_MESSAGE = {
  BOOK_NAME_LENGTH: 'минимальное/максимальное количество символов названия книги: 2/100',
  DOMAIN_NAME_LENGTH: 'минимальное/максимальное количество символов названия раздела: 2/60',
  DOMAIN_REQUIRED: 'укажите раздел литературы',
  AUTHOR_REQUIRED: 'укажите автора',
  YEAR_REQUIRED: 'год не корректный или не указан',
  LANGUAGE_LENGTH: 'минимальное/максимальное количество символов у языка: 2/20',
  PAGES_REQUIRED: 'укажите количество страниц',
  PASSWORD_LENGTH: 'минимальное/максимальное количество символов пароля: 5/12',
};

module.exports = {
  ROLES,
  STATUS,
  MESSAGE,
  VALIDATION_MESSAGE,
};
