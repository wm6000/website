# System Architecture

> Status: planned/target architecture. See [`architecture.md`](../architecture.md).

```mermaid
---
id: 9860b5e8-37de-4822-b15d-1789ced92d98
---
flowchart TB
 subgraph s1["Presentation Tier"]
        n1["Website"]
        App["App"]
  end
 subgraph s2["API Gateway Tier"]
        n2["API Service"]
  end
 subgraph s3["Application Tier"]
        n3["Logic"]
  end
 subgraph s4["Data Tier"]
        n4["dbt"]
        Postgres[("PostgreSQL")]
  end
    s1 --> s2
    s2 --> s3
    s3 --> s4
    n5["external data scheduled etl"] --> Postgres
```
