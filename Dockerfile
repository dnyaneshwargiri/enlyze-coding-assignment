
FROM node:21-alpine AS production
RUN yarn global add pm2 http-server
WORKDIR /app
COPY kpi-builder/dist /app/kpi-builder/dist
COPY kpi-svc/dist /app/kpi-svc/dist
COPY kpi-svc/kpis.json /app/kpis.json

ARG NODE_ENV  
ARG KPI_FILE_PATH_PRODUCTION

ENV NODE_ENV=$NODE_ENV  
ENV KPI_FILE_PATH_PRODUCTION=$KPI_FILE_PATH_PRODUCTION

EXPOSE 9999 5173

RUN echo 'module.exports = {' \
        'apps: [' \
            '{' \
                'name: "kpi-svc",' \
                'script: "dist/index.js",' \
                'cwd: "./kpi-svc",' \
                'env: {' \
                    '"PORT": 9999' \
                '}' \
            '},' \
            '{' \
                'name: "kpi-builder",' \
                'script: "http-server",' \
                'args: ["dist", "-p", "5173"],' \
                'cwd: "./kpi-builder"' \
            '}' \
        ']}' \
    > ecosystem.config.js

CMD ["pm2-runtime", "ecosystem.config.js"]
