[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

Данный проект является продолжением основного проекта ресурса mesto, только сейчас он отвечает за всю backend-часть данного сайта.
Реализована авторизация и валидация данных на сервере, а также добавлена центролизованная обработка ошибок.

## Ссылка на github репозиторий
https://github.com/mmariaiv/express-mesto-gha

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/errors` - папка с файлами описания ошибок для их  централизованной обработки
`/middlewares` - папка с файлом мидлвэра авторизации
`/utils` - папка с файлом констант
## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
