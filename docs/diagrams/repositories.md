# Repository Relationships

> Status: planned/target architecture. See [`architecture.md`](../architecture.md#repository-structure).

```mermaid
flowchart LR
    Website["website<br/>Next.js / React / TS"]
    PlatformHub["platform-hub<br/>Python / FastAPI<br/>(Tier 2 + Tier 3)"]
    Fitness["fitness-platform<br/>Python (domain logic library)"]
    Ski["ski-advisor-platform<br/>Python (domain logic library)"]
    DataPlatform["data-platform<br/>Python / PostgreSQL / dbt"]
    Disaster["disaster-response-pipeline<br/>Python / Flask (standalone)"]
    Whale["whale-blog<br/>(standalone)"]

    Website -- calls --> PlatformHub
    Website -- showcases --> Disaster
    Website -- showcases --> Whale

    PlatformHub -- imports --> Fitness
    PlatformHub -- imports --> Ski
    PlatformHub -- reads/writes --> DataPlatform
```
