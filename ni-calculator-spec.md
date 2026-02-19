# NI Cost Calculator — QA Spec v1.0

## Golden Dataset

| case_id | headcount | avg_salary | payroll | current_ni (13.8%) | new_ni (15%) | additional_annual | additional_monthly |
|---------|-----------|------------|---------|-------------------|-------------|-------------------|-------------------|
| C01 | 80 | 28000 | 2240000 | 309120 | 336000 | 26880 | 2240 |
| C02 | 10 | 25000 | 250000 | 34500 | 37500 | 3000 | 250 |
| C03 | 150 | 30000 | 4500000 | 621000 | 675000 | 54000 | 4500 |
| C04 | 42 | 19500 | 819000 | 113022 | 122850 | 9828 | 819 |
| C05 | 200 | 40000 | 8000000 | 1104000 | 1200000 | 96000 | 8000 |
| C06 | 12 | 18472 | 221664 | 30590 | 33250 | 2660 | 222 |
| C07 | 0 | 28000 | 0 | 0 | 0 | 0 | 0 |
| C08 | 100 | 0 | 0 | 0 | 0 | 0 | 0 |
| C09 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| C10 | 999 | 12345 | 12332655 | 1701906 | 1849898 | 147992 | 12333 |

## Validation Tests (expect errors)

| case_id | headcount | salary | expected |
|---------|-----------|--------|----------|
| V01 | -1 | 28000 | Error: Headcount must be 0 or more |
| V02 | 80.5 | 28000 | Error: Headcount must be a whole number |
| V03 | 80 | -100 | Error: Salary must be 0 or more |
| V04 | 999999 | 28000 | Error: Headcount too high (max 5000) |
| V05 | 80 | "abc" | Error: do not calculate |

## Constants
- Old rate: 0.138
- New rate: 0.150
- Delta: 0.012

## Formula
- Payroll = Headcount × AvgSalary
- CurrentNI = Payroll × 0.138
- NewNI = Payroll × 0.150
- AdditionalAnnual = Payroll × 0.012
- AdditionalMonthly = AdditionalAnnual / 12
- All outputs: Math.round() to nearest £1
