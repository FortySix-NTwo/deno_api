# Deno RESTful API example server

## Overview

The following repo serves as an example for building RESTful Services with [Deno](https://deno.land).

### NOTE

> In order to run the server, we will need to start a local Postgres instance or by using Docker,
>
> - Local Postgres Instance (MacOS Instructions Only):
>
> Located within the scripts folder are two bash scripts in-order to make this process as ease as possible.
>
> Note that [Homebrew](https://brew.sh) is needed for installing locally

```bash
# Optional - install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# First run localhost_db.sh, from root directory path
bash ./scripts/localhost_db.sh

# Than run generate_db.sh, from root directory path
bash ./scripts/generate_db.sh
```

> - Docker-Compose Instance
>
> Within the docker folder you will find a docker-compose.yml file, to run the Postgres container do the following:
>
> Note that [Docker](https://www.docker.com) is needed for running containers

```bash
# run the compose file
docker-compose up postgres-db

# stop the compose file
docker-compose down postgres-db
```

> - Deno Server
>
> within the root directory, type the following into the terminal:

```bash
# Installing Deno
brew install deno

# Adding path name to .bashrc or .zshrc
export PATH="/Users/< user-name >/.deno/bin:$PATH"

# Deno Server with flags
deno run --allow-net --allow-read  --allow-env --importmap=import_map.json --unstable src/index.ts
```
