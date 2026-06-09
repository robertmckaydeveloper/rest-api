### Description

Simple REST API development project with Spring Boot, Postgres, and Keycloak.

### Configuration

Project configured for VSCode Dev Containers with the following docker compose services
- frontend: React container for UI
- backend: Java container for Spring Boot API
- db: Postgres container for Spring Boot JPA
- keycloak: Keycloak container for Spring Boot Security

### Usage
Clone project and open with VSCode Dev Containers
- update `/etc/hosts` to include `127.0.0.1 frontend backend keycloak` for dns resolution
- `keycloak/dev-realm.json` configures a realm with a single user `robert` and password `password` for SSO authentication
- start the spring boot API in the attached backend container terminal with `mvn spring-boot:run`
- open a browser to `http://localhost:3000`
