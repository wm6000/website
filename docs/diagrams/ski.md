# Ski Advisor Data Flow

> Status: planned/target architecture. See [`roadmap.md`](../roadmap.md#phase-5--ski-advisor-platform-mvp).

```mermaid
---
id: f88968f6-3c85-4bec-b17e-78785bc9bac4
---
flowchart TD
    NOAA["NOAA weather"] --> ApiGateway["api-gateway<br/>(ski-advisor-platform domain logic)"]
    NWAC["NWAC avalanche forecasts"] --> ApiGateway
    Resorts["Resort snow reports"] --> ApiGateway

    ApiGateway -- writes --> SkiSchema[("data-platform<br/>ski schema")]
    SkiSchema --> Dbt["dbt models"]
    Dbt --> Analytics[("analytics schema")]

    Analytics --> Precomputed["Precomputed recommendations<br/>(daily, common WA locations)"]
    ApiGateway --> Personalized["Personalized recommendations<br/>(live AI, custom trips)"]

    Precomputed --> Website["website"]
    Personalized --> Website
```
