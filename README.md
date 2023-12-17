# NOTES-API is a CRUD API handling notes
This a hands-on project to practise writing API using Express.js and MongoDB
Frontend part will be presented as a separate project

## How can you interact with this API
---
- Get all notes
`GET notes/`
- Get one note
`GET notes/:id`
- Create new note
`POST notes/:id`
- Get one note
`GET notes/:id`
- Update one note
`PUT notes/:id`
- Delete one note
`DELETE notes/:id`
- Delete all notes
`DELETE notes/`

## Note properties
`
    content: String,
    date: String(yyyy-mm-dd),
    status: String(new || finished)
`
## ENV
In .env **DB_URI** should be placed with a value of type below, which makes a conection to MongoDB
`
"mongodb+srv://username:password@cluster-x.2af763u.mongodb.net/?retryWrites=true&w=majority"
`