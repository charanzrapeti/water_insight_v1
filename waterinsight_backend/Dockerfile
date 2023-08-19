FROM node:18

WORKDIR /waterinsight_backend

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install 

COPY . .



# ENV CLIENT_ID = "597586763006-apkd4fmh7qim17rnf48itb4qrbidcng6.apps.googleusercontent.com"

# ENV CLIENT_SECRET = "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"

# ENV REDIRECT_URL="https://developers.google.com/oauthplayground"

# ENV REFRESH_TOKEN = "1//04sZXOK54GdytCgYIARAAGAQSNwF-L9Irx_W8MwezWqO3bz6xYUuFOHE2dhMimdufvfRC7nexO--KWYRkbYA3gCdMII1-NEjLqk0"
 
# ENV JWT_SECRET = "ISBwaterzincolSECRET"

# ENV THINGSPEAK_API_URL = "https://api.thingspeak.com/channels/2002408/feeds.json?api_key=N6ZF1SSU0TB7YHDH"

# ENV PYTHON_SERVER_URL = "http://127.0.0.1:5000/iot-image-processing"

# ENV IMAGES_DIR = "/home/isbcharan/Desktop/IGC/water-insight/waterinsight_backend/public/"

EXPOSE 4000



CMD ["npm", "run", "dev"]