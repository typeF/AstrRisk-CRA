# Contributors

[Blake Sadoway](https://github.com/Bsadoway) |
[Clayton Savage](https://github.com/claytonsavage) |
[Frank Lam](https://github.com/typeF)

# AstrRisk

AstrRisk is a data visualization app that allows users to view Near Earth Objects (NEOs) that are between Mars and Earth on any given day.

Features a custom-made browsing UI built with CSS3 and D3js. Users can browse through 300 years worth of information dating back to 1900 and all the way up to 2200 based on NASA's predictions.

Radar and danger charts provide easy to digest information about individual NEOs. Heatmaps allow user to see an overview of each year's NEO density's at a glance and to quickly navigate to a particular day.

# Screenshots

![Main Page](https://github.com/typeF/AstrRisk/blob/master/docs/Main%20Screen%20SS.png?raw=true)

![Radar Chart](https://github.com/typeF/AstrRisk/blob/master/docs/Radar%20Chart%20SS.png?raw=true)

![Danger Chart](https://github.com/typeF/AstrRisk/blob/master/docs/Danger%20Chart%20SS.png?raw=true)

![Heat Map](https://github.com/typeF/AstrRisk/blob/master/docs/Heat%20Map%20SS.png?raw=true)

# Production deployment setup

- Clone repo to server
- Install Docker + Docker Compose
- Download [JSON data package](https://www.dropbox.com/s/lltz9sv8xtj37kn/json.zip?dl=0) to /api_server
- Unzip json.zip to /api_server/json
- Set the following environment variables
  - NODE_ENV=production
  - ASTRRISK_CLIENT_DOMAIN=YOUR_CLIENT_DOMAIN
  - ASTRRISK_SERVER_DOMAIN=YOUR_SERVER_DOMAIN
- Clone [nginx-proxy](https://github.com/typeF/nginx-proxy) to a separate folder and follow setup
- Run nginx-proxy and Astrrisk docker-compose files

```
docker-compose up -d
```
