# Schoolgle Toolbox — Content-to-Product Pipeline

## The Model

Every newsletter follows the same funnel:

```
Newsletter (free)
  └─ Embedded snippet tool (simplified, inline, no signup)
       └─ "Want your LA/school data? Sign up free"
            └─ Full tool in Toolbox (Member tier, £9.99/mo)
                 └─ Cross-sell: "Need trust-wide? Go Pro" (£29.99/mo)
                      └─ Cross-sell: Schoolgle platform products
```

**Snippet tool** = shows national headline stat + lets user see ONE thing (their LA, their school type)
**Full tool** = drill-down by LA, compare LAs, export, save scenarios, governor-ready narrative
**Pro tool** = trust-wide roll-up, benchmarking, multi-year trends, export to PDF

---

## Newsletter → Tool Map

| Week | Deep Dive Topic | Snippet (in newsletter) | Full Tool (Toolbox) | Data Source | DB Table | Status |
|------|----------------|------------------------|--------------------|-----------|---------|----|
| 1 | Ofsted report cards | Show national grade distribution + "See your region" | Ofsted Explorer: filter by region/phase/date, compare schools | Ofsted API | `dfe_data.ofsted_inspections` | ✅ Data in DB |
| 2 | NI rise | Salary slider → additional cost | NI Cost Calculator: multi-role modelling, what-if scenarios | Manual (rates) | N/A (formulaic) | ✅ BUILT |
| 3 | Spring Census | 3-question readiness check | Census Readiness Checker: 20-item audit + key dates | Manual (DfE guidance) | N/A | ✅ BUILT |
| 4 | SEND £200m training | National EHCP growth stat + "See your LA" | SEND Funding Explorer: LA drill-down, spending per EHCP, growth trends | DfE SEN2 + S251 | `dfe_data.local_authority_finance` + `ehcp_caseload` (TO IMPORT) | 🔶 Partial |
| 5 | Bett 2026 | N/A (event recap, no tool needed) | — | — | — | ✅ N/A |
| 6 | Census errors | Top 5 common errors checklist | Census Readiness Checker (same as Week 3, different entry point) | Manual | N/A | ✅ BUILT |
| 7 | KCSIE 2026 | "Are you compliant?" 5 Y/N questions | Safeguarding Policy Checker: KCSIE changes mapped to your current policies | DfE KCSIE draft | N/A | ❌ NOT BUILT |
| 8 | Inclusion bases | National SEN placement breakdown | SEND Placement Explorer: where are SEND pupils placed in your LA? Mainstream vs special vs independent | DfE SEN2 | `ehcp_caseload` (TO IMPORT) | 🔶 Data ready |
| 9 | SEND pressure | EHCP national growth headline + "Your LA" | SEND Explorer: full LA drill-down with trends, placements, comparisons | DfE SEN2 | `schoolgle-data/data/caseload.csv` | ✅ BUILT |
| 10 | Breakfast clubs | Cost per pupil calculator | Breakfast Club Calculator: staff ratios, food costs, funding offset, break-even | DfE guidance + manual | N/A (formulaic) | ❌ NOT BUILT |

---

## Spec Template (follow for EVERY tool)

Based on the NI Calculator spec standard:

```markdown
# [Tool Name] — QA Spec v1.0

## Purpose
One line: what does this tool do for a school leader?

## Newsletter Snippet Version
- What the user sees inline in the newsletter (simplified)
- One interactive element max
- Shows national headline + teaser of drill-down

## Full Toolbox Version  
- What the signed-up user gets
- LA/school-level drill-down
- Comparison features
- Export/print

## Pro Version Enhancements
- Trust-wide roll-up
- Multi-year benchmarking
- Governor-ready narrative export
- Saved scenarios

## Data Source
- Where the data comes from (URL, dataset name)
- How often it updates
- DB table(s) used
- Any transformations needed

## Golden Dataset
| case_id | input_1 | input_2 | expected_output |
|---------|---------|---------|----------------|
| C01     | ...     | ...     | ...            |

## Validation Tests
| case_id | input | expected |
|---------|-------|----------|
| V01     | ...   | Error: ... |

## Formula / Logic
- Step-by-step calculation or logic flow

## UI Requirements
- Dark theme (#070B12 bg, #00D4D4 cyan accent)
- Schoolgle branding
- WCAG AA contrast
- Mobile-first (375px)
- Print-friendly
- Data attribution: source + date on every chart
```

---

## Build Order (Priority)

### Phase 1 — Data Import (unblocks multiple tools)
1. Import `caseload.csv` → `dfe_data.ehcp_caseload` table
2. Extract + import assessments, new plans, ceased plans from zip
3. This unblocks: Week 4, Week 8, Week 9 (enhanced)

### Phase 2 — Missing Tools (highest newsletter value)
1. **Week 4: SEND Funding Explorer** — combines EHCP caseload + S251 spending data. Shows spending per EHCP by LA. Cross-references with deprivation (IMD). This is the killer tool.
2. **Week 10: Breakfast Club Calculator** — formulaic, no data import needed. Quick win.
3. **Week 7: Safeguarding Policy Checker** — KCSIE changes as Y/N audit. Manual data.
4. **Week 1: Ofsted Explorer** — data already in DB. Filter/search Ofsted grades.
5. **Week 8: SEND Placement Explorer** — once EHCP data imported, this is a view on placement types.

### Phase 3 — Newsletter Integration
1. Create snippet version of each tool (simplified, inline HTML)
2. Embed snippet in each newsletter markdown
3. Add CTA: "See your LA → Sign up free" linking to full toolbox
4. Add toolbox links to newsletter footer

### Phase 4 — Subscription Gating
1. Free: see national stats + snippet tool
2. Member (£9.99/mo): full LA drill-down, comparison, community
3. Pro (£29.99/mo): trust-wide, exports, governor templates, early access

---

## Cross-Reference Tools (The Moat)

These are the tools NOBODY else builds — they combine datasets:

| Tool | Datasets Combined | Insight |
|------|------------------|---------|
| SEND Funding Efficiency | EHCP caseload + S251 spending + KS2 outcomes | "Does more spending = better outcomes?" |
| Deprivation × SEND | EHCP growth + IMD deciles | "The postcode lottery mapped" |
| Workforce × SEND | Staff ratios + EHCP numbers | "Schools drowning: more EHCPs, same staff" |
| Transport Cost Explorer | S251 transport + private placements | "Why transport costs £3.4bn" |

These cross-reference tools are Pro tier only. They're the competitive moat.
