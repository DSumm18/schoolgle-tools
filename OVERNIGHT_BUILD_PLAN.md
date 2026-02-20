# Overnight Build Plan — 19/20 Feb 2026

## David's Brief
- Build FULL tool + newsletter snippet + animated viz for each newsletter
- Full tool = sophisticated, all bells and whistles, LA drill-down, real data
- Snippet = taster embedded in newsletter with headline stats, encourages signup
- Animated viz = Remotion animations for stunning data visualisations
- Wording must reference real data/research from the newsletter topics
- Schools sign up to access full tool (Member tier)
- Work autonomously, David reviews in morning

## Build Order (by dependency + impact)

### Phase 1: Data Import (MUST DO FIRST — unblocks tools 4, 8, 9 enhanced)
- [ ] Import caseload.csv → dfe_data.ehcp_caseload
- [ ] Verify local_authority_finance spending data joins correctly

### Phase 2: Build Tools (one at a time, full QA each)

| Priority | Week | Tool | Type | Est Time | Dependencies |
|----------|------|------|------|----------|-------------|
| 1 | 4 | SEND Funding Explorer | Data-driven (DB) | 2h | EHCP import |
| 2 | 10 | Breakfast Club Calculator | Formulaic | 1h | None |
| 3 | 7 | KCSIE Safeguarding Checker | Manual/checklist | 1h | None |
| 4 | 1 | Ofsted Explorer | Data-driven (DB) | 2h | Ofsted data in DB |
| 5 | 8 | SEND Placement Explorer | Data-driven | 1.5h | EHCP import |

### Phase 3: Newsletter Integration (for ALL 10 weeks)
For each newsletter:
- [ ] Create snippet HTML (simplified inline tool)
- [ ] Embed snippet in newsletter markdown
- [ ] Add headline stat callout with real data
- [ ] Add CTA: "Check your area → Sign up free"
- [ ] Where appropriate, create Remotion animation

### Phase 4: Remotion Animations
Ideas per newsletter:
- Week 2 (NI): Animated bar showing cost increase per school size
- Week 4 (SEND funding): Animated map/chart of EHCP growth by region
- Week 9 (SEND pressure): Animated counter of EHCP growth 344K → 620K
- Week 10 (Breakfast): Cost breakdown pie chart animation

## QA Gate (EVERY tool, EVERY snippet)
1. ✅ Does it calculate/display correctly?
2. ✅ Golden dataset verified?
3. ✅ Mobile responsive (375px)?
4. ✅ WCAG AA contrast?
5. ✅ Data attribution present?
6. ✅ Schoolgle branding applied?
7. ✅ Screenshot + vision AI review?

## Deliverables for David's Morning Review
- All tools on GitHub Pages (live URLs)
- All newsletters updated with embedded snippets
- Screenshots of each tool + snippet
- Remotion animations rendered
- Summary report with scores
