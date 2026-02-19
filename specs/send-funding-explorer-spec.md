# SEND Funding Explorer — QA Spec v1.0

## Purpose
Let school leaders see how their LA's SEND spending compares to similar authorities — and whether more money actually means better support.

## Newsletter Snippet Version (Week 4: "£200m for SEND training")
- **Headline stat:** "England spends £X.Xbn on high needs. Your LA spends £X per EHCP."
- **One interaction:** Dropdown → select your LA → see spending per EHCP vs national average
- **Teaser:** "How does your LA compare to similar areas? See the full breakdown →"
- **CTA:** "Sign up free to explore your LA's full SEND funding data"

## Full Toolbox Version (Member, £9.99/mo)
- LA selector with comparison (up to 3 LAs side-by-side)
- Metrics per LA:
  - Total high needs block allocation
  - SEND spending per EHCP
  - EHCP caseload growth (7-year trend)
  - Spending growth vs caseload growth (gap analysis)
  - Placement breakdown (mainstream/special/independent) with cost implications
- Charts:
  - Bar chart: spending per EHCP by LA (ranked)
  - Line chart: spending trend vs caseload trend (dual axis)
  - Scatter plot: spending per EHCP vs EHCP growth rate
- National average reference line on all charts
- "So what?" box: plain English interpretation
- Print/export to PDF
- Data attribution: "Source: DfE Section 251 outturn + SEN2 returns. Updated [date]."

## Pro Version Enhancements (£29.99/mo)
- Trust-wide aggregation (if trust spans multiple LAs, weighted view)
- Multi-year benchmarking with forecast
- Governor-ready narrative: auto-generated paragraph summarising key findings
- Download raw data as CSV
- Deprivation overlay (IMD decile vs spending efficiency)
- Saved scenarios + alerts when data updates

## Data Sources

| Dataset | Source | DB Table | Fields Used |
|---------|--------|----------|-------------|
| EHCP Caseload | DfE SEN2 | `dfe_data.ehcp_caseload` (TO CREATE) | la_name, year, total, mainstream, special, fe, independent |
| LA Finance (S251) | DfE S251 Outturn | `dfe_data.local_authority_finance` | la_name, year, dsg_high_needs_block, send_total_spending, send_spending_per_ehcp |
| Deprivation | MHCLG IMD 2019 | `dfe_data.area_demographics` | la_code, imd_average_score, imd_decile |

### Data Transformations
1. Join `ehcp_caseload` with `local_authority_finance` on la_name + year
2. Calculate: `spending_per_ehcp = send_total_spending / total_ehcps`
3. Calculate: `spending_growth_rate = (latest_spending - earliest_spending) / earliest_spending`
4. Calculate: `caseload_growth_rate = (latest_ehcps - earliest_ehcps) / earliest_ehcps`
5. Calculate: `funding_gap = spending_growth_rate - caseload_growth_rate` (negative = funding falling behind demand)
6. Join with `area_demographics` on la_code for deprivation overlay

## Golden Dataset

### Snippet Version (national headline + one LA)
| case_id | la_name | year | total_ehcps | send_spending | spending_per_ehcp | national_avg_per_ehcp | vs_national |
|---------|---------|------|-------------|---------------|-------------------|----------------------|-------------|
| C01 | Leeds | 2024-25 | 6,093 | £XXm | £XX,XXX | £XX,XXX | +X% / -X% |
| C02 | Hampshire | 2024-25 | 18,027 | £XXm | £XX,XXX | £XX,XXX | +X% / -X% |
| C03 | Camden | 2024-25 | 1,892 | £XXm | £XX,XXX | £XX,XXX | +X% / -X% |

*Note: Spending figures to be populated from `local_authority_finance` table once joined with EHCP data.*

### Full Version (comparison)
| case_id | scenario | expected |
|---------|----------|----------|
| C04 | Select Leeds + Bradford + Kirklees | 3 LAs shown side-by-side, all metrics populated |
| C05 | Select no LA | Show national overview only |
| C06 | Select LA with missing spending data | Show "Data unavailable for [year]" gracefully |
| C07 | Select all years for one LA | 7-year trend chart renders correctly |

## Validation Tests
| case_id | input | expected |
|---------|-------|----------|
| V01 | LA with no EHCP data | "No EHCP data available for this authority" |
| V02 | LA with no spending data | EHCP data shows, spending shows "Not available" |
| V03 | Compare same LA twice | Prevent duplicate, show warning |
| V04 | More than 3 comparisons | Disable further selection, show "Maximum 3 comparisons" |

## Formulae
```
spending_per_ehcp = send_total_spending / total_ehcps
caseload_growth_pct = ((latest_year_total - base_year_total) / base_year_total) * 100
spending_growth_pct = ((latest_year_spending - base_year_spending) / base_year_spending) * 100
funding_gap = spending_growth_pct - caseload_growth_pct
  → Positive = funding keeping pace
  → Negative = funding falling behind demand (RED flag)
vs_national = ((la_spending_per_ehcp - national_avg_per_ehcp) / national_avg_per_ehcp) * 100
```

## UI Requirements
- Dark theme (#070B12 bg, #00D4D4 cyan, #22C55E green accents)
- Schoolgle branding + "The Staff Room" badge
- WCAG AA contrast (all text ≥4.5:1 ratio)
- Mobile-first (375px minimum, single-column on mobile)
- 44px minimum touch targets
- Print-friendly (charts render in print)
- Data attribution on EVERY chart: "Source: DfE Section 251 outturn [year] + SEN2 [year]"
- "Last updated: [date]" in footer
- Light/dark mode toggle (match SEND Explorer pattern)

## Snippet Embed Format (for newsletter)
```html
<!-- SEND Funding Snippet — inline in newsletter -->
<div class="tool-snippet" id="send-funding-snippet">
  <h3>💰 How does your LA fund SEND?</h3>
  <p class="headline-stat">England spends <strong>£X.Xbn</strong> on high needs. 
     The average LA spends <strong>£XX,XXX per EHCP</strong>.</p>
  <label for="la-select">See your LA:</label>
  <select id="la-select">
    <option>Select your local authority...</option>
    <!-- 152 LAs -->
  </select>
  <div id="la-result" class="hidden">
    <p><strong id="la-name"></strong> spends <strong id="la-spend"></strong> per EHCP</p>
    <p class="vs-national" id="la-compare"></p>
  </div>
  <a href="https://dsumm18.github.io/schoolgle-tools/send-funding-explorer.html" class="cta">
    Compare LAs, see trends, export data → Sign up free
  </a>
</div>
```

## Dependencies
- [ ] Import `caseload.csv` → `dfe_data.ehcp_caseload`
- [ ] Verify `local_authority_finance` has spending per EHCP fields
- [ ] Join datasets and generate static JSON for tool (no live DB queries from client)
- [ ] Create snippet HTML for newsletter embed
- [ ] Create full tool HTML for toolbox
- [ ] Write automated tests against golden dataset
- [ ] QA: 6-gate check before publish
