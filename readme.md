<div align='center' style="text-align: center;">

<h1 style="border:0;margin:1rem">Coffee Shop Backend</h1>

Backend for coffee shop

[Demo](backend-week5.vercel.app) · [Suggestion](mailto:raihanirvana13@gmail.com)

<hr>
<br>

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Resources](#resources)
- [Contributors](#contributors)
- [License](#license)
- [Suggestion](#suggestion)

## Technologies Used

- [Node js](https://nodejs.org/en/docs)
- [Express js](https://expressjs.com/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [MongoDB](https://www.mongodb.com/docs/)
- [Cloudinary](https://cloudinary.com/)
- etc.

## Getting Started

### Installation

1. Clone this repo

   ```bash
   git clone https://github.com/raihanirvana/Coffee-Shop-BE.git
   ```

2. Enter the directory

   ```bash
   cd Coffee-Shop-BE
   ```

3. Install all dependencies

   ```bash
   npm install
   ```

4. Create .env file

   ```env
   DB_HOST = [YOUR DATABASE HOST]
   DB_NAME = [YOUR DATABASE NAME]
   DB_PORT = [YOUR DATABASE PORT]
   DB_USER = [YOUR DATABASE USERNAME]
   DB_PASS = [YOUR DATABASE PASSWORD]

   JWT_SECRET_KEY = [YOUR JWT SECRET KEY]

   CLOUD_NAME = [YOUR CLOUDINARY NAME]
   CLOUD_KEY = [YOUR CLOUDINARY API KEY]
   CLOUD_SECRET = [YOUR CLOUDINARY API SECRET]

   MONGODB_USER = [YOUR MONGODB USERNAME]
   MONGODB_PASS = [YOUR MONGODB PASSWORD]
   MONGODB_HOST = [YOUR MONGODB HOSTNAME]
   MONGODB_NAME = [YOUR MONGODB DATABASE NAME]

   NODEMAILER_HOST = [YOUR SMTP HOST]
   NODEMAILER_PORT = [YOUR SMTP PORT]
   NODEMAILER_USER = [YOUR SMTP EMAIL/USER]
   NODEMAILER_PASS = [YOUR SMTP PASSWORD]
   ```

5. Start the local server

   ```bash
   node index.js
   ```

   or (if you want auto start if any change in code)

   ```bash
   npm run dev
   ```

## Resources

Special thanks to:

- [Vercel](https://vercel.com) - deploying code

## Contributors

Currently, there are no contributors to this project. If you would like to contribute, you can submit a pull request.

## License

This project is licensed under the ISC License

## Suggestion

If you find bugs / find better ways / suggestions you can pull request.
