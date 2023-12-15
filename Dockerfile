FROM node:20-alpine
WORKDIR /app
EXPOSE 3000
EXPOSE 3010
EXPOSE 5555
RUN npm install -g npm@latest
CMD ["npm", "run", "dev"]
