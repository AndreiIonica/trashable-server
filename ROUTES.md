### Routes

- [Home routes](#####home-routes)
  - [Trashcan type routes](#####trashcan-type)
  - [County(judet) routes](<#####county(judet)>)
  - [City routes](#####city)
  - [Trashcan routes](#####trashcan)

##### HOME ROUTES

- GET /
  - should respond with a generic message in a json object
- GET /api/0.1//
  - should respond with a generic message in a json object

##### TRASHCAN TYPE

- GET /api/0.1/trashcanType/
  - responds with all the trashcan types in the system
- GET /api/0.1/trashcanType/:id
  - responds with the trashcan type with the given id
- POST /api/0.1/trashcanType/
  - body needs to be json
  - needs to be a valid trashcan_type object.
  - responds back with the created trashcan_type
- PUT /api/0.1/trashcanType/:id
  - body needs to be json
  - needs to be a valid trashcan_type object.
  - update the trashcan with the given id
  - responds back with the updated trashcan_type
- DELETE /api/0.1/trashcanType/:id
  - empty body
  - deletes the trashcan_type with the given id

##### COUNTY(JUDET)

- GET /api/0.1/county/
  - responds with all the counties in the system
- GET /api/0.1/county/:id
  - responds with the county with the given id

##### CITY

- GET /api/0.1/city/
  - responds with all the cities in the system
- GET /api/0.1/city/:id
  - responds with the city with the given id

##### TRASHCAN

- GET /api/0.1/trashcan/
  - responds with all the trashcans in the system
- GET /api/0.1/trashcan/:id
  - responds with the trashcan with the given id
- POST /api/0.1/trashcan/
  - body needs to be json
  - needs to be a valid trashcan object.
  - responds back with the created trashcan
- PUT /api/0.1/trashcan/:id
  - body needs to be json
  - needs to be a valid trashcan object.
  - update the trashcan with the given id
  - responds back with the updated trashcan
- DELETE /api/0.1/trashcan/:id
  - empty body
  - deletes the trashcan with the given id
