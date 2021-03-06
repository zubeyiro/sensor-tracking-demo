# Sensor Tracking Api Demo

## Overview

There is no database, there is just static JSON format which has been attached to runtime global object when application launches. Data files located under;

`/src/data`

There is also dummy authentication system and made all endpoints authentication required.

## Install & Test & Run

Clone this repository then;

```
npm install
```

For running tests;

```
npm test
```

For running application;

```
npm start
```

or

```
node src/index.js
```

## Endpoints

**Login**
----
Makes authentication and returns auth token

**URL**

  `POST` /auth/login

**Body Format**

   ```
   {
    email: "", // string, required
    password: "" // string, required
   }
   ```

**Success Response:**

    ```
    {
      status: true,
      data: {
        token: "" // string, contains auth_token
      }
    }
    ```
 
**Error Response:**

    ```
    {
      status: false,
      err: "" // string, contains error message
    }
    ```

**Sensors**
----
Sensor related endpoint, now only have 1 endpoint for listing

**URL**

  `GET` /sensors

**Header**

   ```
   auth_token: "" //token we got from login
   ```

**Response:**

    ```
    {
    "status": true,
    "data": [
        {
            "id": 1,
            "is_mine": false // is sensor requesting user's property
        },
        {
            "id": 2,
            "is_mine": true
        }
    ]
    }
    ```

**Allocations**
----
2 endpoints, for listing and making allocation

**URL**

  `GET` /allocations/:workout_id

**Header**

   ```
   auth_token: "" //token we got from login
   ```

**Response:**

    ```
    {
    "status": true,
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "sensor_id": 1,
            "is_sensor_user_property": true,
            "created_at": 1571863350156
        }
    ]
    }
    ```
    
**URL**

  `POST` /allocations

**Header**

   ```
   auth_token: "" //token we got from login
   ```

**Body Format**

   ```
   {
    workout_id: 1, // workout id to make allocation for: number, required
    sensor_id: 1 // sensor to be allocated: number, required
   }
   ```
   
**Response:**

    ```
    {
    "status": true,
    "data": "data": "Allocation completed"
    }
    ```

**Workouts**
----
2 endpoints, for listing available workouts and joining them

**URL**

  `GET` /workouts

**Header**

   ```
   auth_token: "" //token we got from login
   ```

**Response:**

    ```
    {
    "status": true,
    "data": [
        {
            "id": 1,
            "name": "Gym"
        },
        {
            "id": 2,
            "name": "Boxing"
        },
        {
            "id": 3,
            "name": "Fitness"
        }
    ]
    }
    ```
    
**URL**

  `POST` /workouts/join

**Header**

   ```
   auth_token: "" //token we got from login
   ```

**Body Format**

   ```
   {
    workout_id: 1, // workout id to join: number, required
   }
   
   // You need to be made sensor allocation before joining a workout
   ```
   
**Response:**

    ```
    {
    "status": true,
    "data": "Join successful"
    }
    ```

## Dashboard & DB View

There is a simple dashboard as requested, which contains active workouts and allocated sensor counts, you may reach it after running application via;

`http://localhost:8080/live`

It also listens socket to show real-time data.

There is also another endpoint which shows current db information

`/db`
