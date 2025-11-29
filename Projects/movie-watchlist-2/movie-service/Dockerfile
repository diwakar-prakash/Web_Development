FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install 
RUN mkdir -p uploads/posters
COPY . . 
EXPOSE 4000
CMD ["node", "index.js"]