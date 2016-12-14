# TinyTask Rest

***AKTUELL WIRD DIE DATENSTRUKTUR GEÄNDERT, ES KANN ZU FEHLERN KOMMEN !!!***

Der Rest Service ist unter https://tinytaskrest.herokuapp.com/ erreichbar.

***!! Wichtig !!***
Bei Heroku bekommen wir bei ```/tasks``` die Ids für die unterschiedlichen Tasks nicht zum Laufen.
Im Moment müsst Ihr leider den Umweg gehen, dass Ihr diese Repo runterladet und den Server lokal startet.

```
git clone https://github.com/KSWE-2016-17/tinytask-backend-rest.git
cd tinytask-backend-rest
npm start
```
***Ihr müsst die config.js anpassen!***

# Chat
Wir haben nun den Chat eingefügt, dieser sollte unter https://tinytaskrest.herokuapp.com:3000/ erreichbar sein.
Wir haben einen Beispiel Client eingefügt, dieser ist unter ```example_socket_chat``` zu finden.

# Dokumentation
Die Rest Dokumentation ist unter [https://kswe-2016-17.github.io/tinytask-backend-rest/](https://kswe-2016-17.github.io/tinytask-backend-rest/) zu finden.

# Authentifizierung

## Auth0

Für Auth0 benötigt Ihr die folgenden Daten

|  |  |
| :----- | :--------- |
| Domain | tinytask.eu.auth0.com |
| Client Id | Bp4PPmbo5IXZumI4wrZ2Asi7mJgG9Dk3 |
| Client Secret | hVGlnq1D4g8-y7UmCkPaWN33FwE11TOmq2_-3J_4FJF6Qk9n1NMwQ_Z2LPEM4-KR |

## Token

Damit die Authentifizierung gelingt, müsst Ihr bei jeder Anfrage, an den Rest Service, den `Authorization` Header mit dem entsprechendem Token mitschicken.
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ ... dTrHlMw-58rYKKkUu4
```

## Verbindungstest

Zum testen versucht den Rest Service unter https://tinytaskrest.herokuapp.com/ anzusprechen, sollte die Verbinung erfolgreich sein erhaltet Ihr den folgenden Json.
```javascript
{
  "message": "Connected!"
}
```

Bei einem ungültigen Token erhaltet Ihr die folgende Nachricht.
```
Invalid Token
```
