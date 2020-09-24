# Resource Wall

Resource Wall is a multi-page app that allow learners to save learning resources like tutorials, blogs and videos in a central place that is publicly available to any user. Users can view resources that have been contributed by other users and can discuss, rate and like these resources accordingly, with the goal of fostering and encouraging meaningful discourse to promote the pursuit of knowledge and learning.

## Final Product

![""]()
![""]()
![""]()

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Connect-Flash
- Express
- EJS
- Bcrypt
- body-parser
- Cookie-Session

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local db information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
6. Run the server: `npm run local`
7. Visit `http://localhost:8080/`
