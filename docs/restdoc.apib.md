FORMAT: 1A
HOST: http://localhost

# TinyTask Rest-Api Dokumentation

# Group Login

# Login [/login]

## Login [POST]
+ Request (application/json)

        {
            "foo": "bar"
        }

+ Response 200 (application/json)

        {
            "foo": "bar"
        }







# Group Tasks

# Tasks [/tasks]

## Zeigt alle Tasks [GET]
+ Response 200 (application/json)

        {
            "foo": "bar"
        }

## Erstelle neuen Task [POST]
+ Request (application/json)

        {
            "foo": "bar"
        }

+ Response 200 (application/json)

        {
            "foo": "bar"
        }


## Ein Task [/tasks/{task_id}]

+ Parameters
    + task_id (number) - Id vom Task

### Gibt Details zum Task zurück [GET]

+ Response 200 (application/json)

        {
            "foo": "bar"
        }

### Delete [DELETE]

+ Response 204








## Task [/tasks/{task_id}/position]

+ Parameters
    + task_id (number) - Id vom Task

### Position des Task [GET]
Es wird der Längen- und Breitengrad des Tasks zurück gegeben.

+ Response 200 (application/json)

        {
            "lng": "51.46135351",
			"lat": "52.46546543"
        }







## Task [/tasks/{task_id}/applications]

+ Parameters
    + task_id (number) - Id vom Task

### Bewerber eines Tasks [GET]
Gibt die Bewerber eines Tasks zurück.

+ Response 200 (application/json)

        {
            "bewerber", []
        }






## Task [/tasks{?radius,startzeit}]

+ Parameters
    + radius (number) - Radius um die Tasks einzugrenzen
	+ startzeit (number) - Zeit wann der Task begonnen hat

### Tasks eingrenzen [GET]
Gibt die eingegrenzten Tasks wieder.

+ Response 200 (application/json)

        {
            "tasks", [],
			"results", 0
        }




# Group Benutzer


# Benutzer [/users]

### Gibt die Liste aller Benutzer [GET]

+ Response 200 (application/json)

        {
            "foo": "bar"
        }

### Fügt einen neuen Benutzer hinzu [POST]

+ Request (application/json)

        {
            "displayName": "Max",
            "picture": "[imageurl]",
            "address": "Musterstraße 20"
        }

+ Response 200 (application/json)

        {
            "id": "42"
        }

+ Response (400) (application/json)

        {
            "message": "Benutzer konnte nicht angelegt werden!"
        }




## Benutzer bewerten [/users/{user_id}/rating]
Benuter bewerten

+ Parameters
    + user_id (number) - Id vom Benutzer

### Gibt die Bewertung [GET]
+ Response 200 (application/json)

        {
            "foo": "bar"
        }

### Schickt eine Bewertung [POST]
+ Request (application/json)

        {
            "foo": "bar"
        }


+ Response 200 (application/json)

        {
            "foo": "bar"
        }


## Gibt bestimmten Benutzer wieder [/users/{user_id}]

+ Parameters
    + user_id (number) - Id vom Benutzer

### Gibt bestimmten Benutzer wieder [GET]
+ Response 200 (application/json)

        {
            "foo": "bar"
        }

### Löscht angegeben benutzer [DELETE]
+ Response 204
