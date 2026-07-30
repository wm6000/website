# System Architecture

> Status: planned/target architecture. See [`architecture.md`](../architecture.md).

```mermaid
---
id: 9860b5e8-37de-4822-b15d-1789ced92d98
---
flowchart TD
    User(["User"])
    User --> Website["website<br/>(Next.js)"]
    User --> App["app client<br/>(planned)"]

    Website --> AccessLayer["access-layer API<br/>(fitness + ski-advisor domains)"]
    App --> AccessLayer
    Website --> Projects["Standalone projects<br/>disaster-response-pipeline, whale-blog"]

    AccessLayer --> DataPlatform["data-platform"]

    DataPlatform --> Postgres[("PostgreSQL")]
    DataPlatform --> Dbt["dbt models"]
    DataPlatform --> Databricks["Databricks (future)"]

    Postgres --> Services["pipelines, AI services"]
    Dbt --> Services
```
