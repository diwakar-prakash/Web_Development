1. THE STRUCTURE OF THE PROJECT IS AS FOLLOWING :--

📁 Project Structure
fitness-tracker/
│
├── auth-service/
├── fitness-service/
├── analytics-service/
├── nginx/
│   └── nginx.conf
├── docker-compose.yml
└── README.md


2. THE TECH STACK IS AS FOLLOWING :---

⚙️ Tech Stack

| Component        | Technology               |
| ---------------- | ------------------------ |
| Backend          | Node.js + Express        |
| Database         | MongoDB                  |
| Caching          | Redis                    |
| Reverse Proxy    | NGINX                    |
| Containerization | Docker + Docker Compose  |
| Authentication   | JWT                      |
| Scaling          | Docker `--scale` + NGINX |
| Architecture     | Microservices            |


3. THE SYSTEM ARCHITECTURE IS AS FOLLOWING :---



                ┌───────────┐
                │  CLIENT   │
                └─────┬─────┘
                      │
                  (Port 80)
                      │
                 ┌────▼────┐
                 │  NGINX  │   ← Reverse Proxy + Load Balancer
                 └────┬────┘
        ┌──────────────┼──────────────┐
        │              │              │
 ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
 │ Auth Service│ │ Fitness   │ │ Analytics   │
 │   (JWT)      │ │ Service   │ │  Service    │
 └──────┬──────┘ └─────┬─────┘ └──────┬───────┘
        │              │              │
     MongoDB        MongoDB         Redis + MongoDB




4. THIS IS THE SERVICE OVERVIEW OF OUR APPLICATION :---

🚀 Services Overview

| Service           | Purpose                               | Port  |
| ----------------- | ------------------------------------- | ----- |
| auth-service      | User sign up / login / JWT            | 3000  |
| fitness-service   | Store & manage workouts               | 5000  |
| analytics-service | Stats & summaries (cached with Redis) | 4000  |
| nginx             | Gateway + Load Balancer               | 80    |
| mongo             | Database                              | 27017 |
| redis             | Cache server                          | 6379  |
