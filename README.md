# TinyTask Rest-Api

**DIE API IST AKTUELL NOCH UNVOLLSTÄNDIG, KANN JEDOCH ZU TESTZWECKEN GENUTZT WERDEN!!!**

# Dokumentation
Die Rest Dokumentation ist unter [https://kswe-2016-17.github.io/tinytask-backend-rest/](https://kswe-2016-17.github.io/tinytask-backend-rest/) zu erreichen

# Installation
Bevor Sie den Server starten, stellen Sie sicher, dass die Datenbank eingerichtet ist.
```
git clone https://github.com/KSWE-2016-17/tinytask-backend-rest.git
cd tinytask-backend-rest
npm install

# start Server
npm start
```
Nachdem der Server gestartet wurde, ist dieser unter `http://localhost:8080` zu erreichen.


# Datenbank
Aktuell wird mit Beispieldaten gearbeitet, dafür wird Docker von dem Repository
[tinytask-backend-mongodb](https://github.com/KSWE-2016-17/tinytask-backend-mongodb) benötigt.
Wir verweisen auf die Anleitung von `tinytask-backend-mongodb` um die Datenbank, über Docker, einzurichten.

Zusätzlich empfehlen wir die Installationsanleitung von Docker: https://docs.docker.com/engine/installation/

Nachdem die Datenbank eingerichtet ist, müsst ihr eure MongoDB Url in die `config.js` eintragen.

```javascript
module.exports = {
    'mongodb': 'mongodb://[IP-Adresse]/tinytask'
}
```

# Authentifizierung
Um eine erfolgreiche Authentifizierung zu gewährleisten, tragt Sie Ihre Auth0-Daten, in die `config.js` ein.
```javascript
module.exports = {
    'auth': {
        'domain': '[...] .eu.auth0.com',
        'clientID': 'Auth0 Client Id',
        'clientSecret': 'Auth0 Secret'
    }
};
```

Damit die Authentifizierung gelingt, müsst Ihr bei jeder Anfrage, an den Rest Server, den `Authorization` Header mit dem entsprechendem Token mitschicken.
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ ... dTrHlMw-58rYKKkUu4
```
