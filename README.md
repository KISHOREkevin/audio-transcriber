# Echo AI Audio Transcription Project built with Django + React




https://github.com/user-attachments/assets/ea8a9bdd-6f5a-4661-880a-9ccabb1c03b9

* Echo is the Audio Application integrated with AI model powered by assembly.ai which has functions such as 
    * User management , 
    * User Authentication , 
    * Transcription management
    * mobile first application
* With Echo, you can upload any audio file and trancript it.
* Echo app is easy to use, powerful to manage the trancriptions.
* Try Echo app today and see the difference it can make .

# Technologies used
* Django (Server side)
* Django REST framework (middleware)
* PostgreSQL Database
* Dotenv (eenvironment variables)
* Assembly AI model (audio transcriptions)
* Cloudinary (File hosting)
* React + Vite
* Tailwind CSS
  
# Project Usage (online)
* First go to backend api link to start the api (its deployed in render.com free tier , hence it will spun down after inactive of 15 seconds)
  * https://audio-transcriber-rzfz.onrender.com/

* After loading the api then go to project link
    * https://audio-transcriber-1212.netlify.app/

# Project Usage (offline)
* Create an account in **Cloudinary , Assembly AI**
* Install **Docker and docker-compose** on you system 
* clone the repository `git clone https://github.com/KISHOREkevin/audio-transcriber`
* `cd audio-transcriber`
* inside audiotranscriber folder and client folder create `.env` file
* in `audiotranscriber folder` ,enter the following code in the `.env` file :
    * `API_KEY_ASSEMBLYAI=Your_assembly_ai_api_key`
    * `CLOUDINARY_CLOUD_NAME=Your_cloudianry_cloud_name`
    * `CLOUDINARY_API_KEY=Your_cloudinary_api_key`
    * `CLOUDINARY_SECRET_KEY=Your_cloudinary_secret_key`
       
* In `client folder` , enter the following code in the `.env` file:
     * `VITE_BACKEND_URL=http://localhost:3000/`
* get backward `cd ..` where the `docker-compose.yml` file is located.
* then run the command `docker-compose up`.
* then go to `http://localhost:3000/` and access the application.
## Have Fun
