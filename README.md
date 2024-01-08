[![Build status](https://ci.appveyor.com/api/projects/status/luggm982jmfsqqtj/branch/master?svg=true)](https://ci.appveyor.com/project/Sergius92739/ra-6-3-lifecycle-http-chat-frontend/branch/master)

# Анонимный чат

## Frontend:  <a href="https://sergius92739.github.io/ra-6.3-lifecycle_http-chat-frontend/">Github Pages</a>

## Server:  <a href="https://ra-6-3-lifecycle-http-chat-backend.onrender.com">Render</a>

## Backend: <a href="https://github.com/Sergius92739/ra-6.3-lifecycle_http-chat-backend">Repository</a>

Вам необходимо реализовать абсолютно анонимный чат (такого, конечн,о не бывает ☺), в который сможет отправлять сообщения любой желающий.

Но есть важное требование: если вы даже открыли другую вкладку в браузере (написание всё равно должно идти с вашего аккаунта).

Backend вы можете взять готовый (из каталога `backend`).

![Chat](./assets/chat.png)

## Общая механика

При создании компонента создаётся интервал или таймаут и делается периодический опрос сервера (временной интервал предложите сами) в виде http-запроса GET на адрес http://localhost:7777/messages?from={id}, где id - идентификатор последнего полученного сообщения (при первоначальной загрузке - 0).

Формат присылаемых данных:
```json
[
    {
        "id": 1,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "Какая сейчас погода за окном?"
    },
    {
        "id": 2,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "К сожалению, я не знаю ответа на этот вопрос"
    },
]
```
Где userId - уникальный идентификатор анонимного пользователя. Подумайте, как его сгенерировать и где хранить (если не придумали - прочитайте спойлеры).

Полученные данные отображаются в виде блоков с возможностью различным выравниванием:
* ваши - справа
* не ваши - слева

Ваши или не ваши вы определяете путём сравнения своего userId и того, что в сообщении.

Добавление:
1. Вы заполняете форму и нажимаете кнопку "Добавить"
1. Выполняется http-запрос POST на адрес http://localhost:7777/messages, в теле запроса передаётся следующий JSON:
```json
{
    "id": 0,
    "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
    "content": "То, что было введно в поле ввода"
}
```
3. После чего ждёте, пока не произойдёт получение данных по интервалу. Подумайте, как сделать ожидание комфортным для пользователя, и как решают эту проблему существующие чаты.

<details>
  <summary>Спойлеры</summary>
  
  Добиться уникальности "анонимов" можно просто записав в local/sessionStorage случайно сгенерированный id (nanoid, uuid). И использовать его для отправки и получения данных.

  Подумайте, какие уязвимости в безопасности создаёт подобная схема, и возможна ли отправка сообщений от лица другого пользователя?

  Подумайте над тем, как это можно предотвратить?
</details>

## Advanced

1. Попробуйте раскрашивать сообщения от разных пользователей в разные цвета.
1. Попробуйте реализовать авто-скроллинг до последнего сообщения.
