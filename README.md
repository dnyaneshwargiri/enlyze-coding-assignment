<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

KPI Builder is an application to manage KPI defintion from customer. One can access a list of KPIs, create, edit and delete KPI.

https://github.com/dnyaneshwargiri/enlyze-coding-assignment/assets/34788823/f603d9c7-9b39-48e9-a1aa-e9cea4826a15

OpenAPI Spec https://github.com/dnyaneshwargiri/enlyze-coding-assignment/blob/main/kpi-svc/openapi.yaml

### Built With

Below are frameworks/ libraries used to bootstrap this project.

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)
- ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Getting Started

Below are instructions on setting up your project locally.

### Prerequisites

- Node 21
- Yarn 1.22.21
- Typescript": ^5.2.2

### Installation

1. Clone the repo
   ```sh
    git clone https://github.com/dnyaneshwargiri/enlyze-coding-assignment.git
   ```
2. Install NPM packages
   ```sh
    yarn install
   ```
3. Compile kpi library

```sh
  yarn libraries:compile
```

4. Run KPI-SVC

   ```sh
   yarn svc:start /* production */
   yarn svc:dev /* dev mode */
   ```

5. Run KPI Builder app

   ```sh
     yarn serve /* production */
     yarn dev  /* dev mode */
   ```

   Application uses `yarn workspaces`

## Usage

Run test cases

```sh
yarn test
```

Check for linting Warnings, Error

```sh
yarn lint
```

## To run application via Docker Image

1. Build application for production
   ```sh
     yarn workspace kpi-builder build
     yarn workpspace kpi-svc build
   ```
2. Build Docker image
   ```sh
     docker build -t enlyze-kpi-app .
   ```
3. Run Docker image
   ```sh
     docker run -p 9999:9999 -p 5173:5173 enlyze-kpi-app
   ```

Please be informed commits are intentionly not squashed.
