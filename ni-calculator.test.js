/**
 * NI Cost Calculator — Unit Tests (v1.0)
 * Golden Dataset + Validation Tests
 * Run: node ni-calculator.test.js
 */

// Constants
const OLD_RATE = 0.138;
const NEW_RATE = 0.150;
const DELTA = 0.012;
const MAX_HEADCOUNT = 5000;
const MAX_SALARY = 250000;

// Core calculation function (same as in the UI)
function calculate(headcount, salary) {
  const payroll = headcount * salary;
  const currentNI = payroll * OLD_RATE;
  const newNI = payroll * NEW_RATE;
  const additional = payroll * DELTA;
  const monthly = additional / 12;
  return {
    payroll: Math.round(payroll),
    currentNI: Math.round(currentNI),
    newNI: Math.round(newNI),
    additional: Math.round(additional),
    monthly: Math.round(monthly),
  };
}

function validate(headcount, salary) {
  if (typeof headcount !== 'number' || typeof salary !== 'number') return 'Invalid input type';
  if (isNaN(headcount) || isNaN(salary)) return 'Please enter valid numbers.';
  if (headcount < 0) return 'Headcount must be 0 or more.';
  if (!Number.isInteger(headcount)) return 'Headcount must be a whole number.';
  if (salary < 0) return 'Salary must be 0 or more.';
  if (headcount > MAX_HEADCOUNT) return 'Headcount too high';
  if (salary > MAX_SALARY) return 'Salary too high';
  return null;
}

// Golden Dataset
const goldenDataset = [
  { id: 'C01', headcount: 80, salary: 28000, payroll: 2240000, currentNI: 309120, newNI: 336000, additional: 26880, monthly: 2240 },
  { id: 'C02', headcount: 10, salary: 25000, payroll: 250000, currentNI: 34500, newNI: 37500, additional: 3000, monthly: 250 },
  { id: 'C03', headcount: 150, salary: 30000, payroll: 4500000, currentNI: 621000, newNI: 675000, additional: 54000, monthly: 4500 },
  { id: 'C04', headcount: 42, salary: 19500, payroll: 819000, currentNI: 113022, newNI: 122850, additional: 9828, monthly: 819 },
  { id: 'C05', headcount: 200, salary: 40000, payroll: 8000000, currentNI: 1104000, newNI: 1200000, additional: 96000, monthly: 8000 },
  { id: 'C06', headcount: 12, salary: 18472, payroll: 221664, currentNI: 30590, newNI: 33250, additional: 2660, monthly: 222 },
  { id: 'C07', headcount: 0, salary: 28000, payroll: 0, currentNI: 0, newNI: 0, additional: 0, monthly: 0 },
  { id: 'C08', headcount: 100, salary: 0, payroll: 0, currentNI: 0, newNI: 0, additional: 0, monthly: 0 },
  { id: 'C09', headcount: 1, salary: 1, payroll: 1, currentNI: 0, newNI: 0, additional: 0, monthly: 0 },
  { id: 'C10', headcount: 999, salary: 12345, payroll: 12332655, currentNI: 1701906, newNI: 1849898, additional: 147992, monthly: 12333 },
];

// Validation tests
const validationTests = [
  { id: 'V01', headcount: -1, salary: 28000, expected: 'Headcount must be 0 or more.' },
  { id: 'V02', headcount: 80.5, salary: 28000, expected: 'Headcount must be a whole number.' },
  { id: 'V03', headcount: 80, salary: -100, expected: 'Salary must be 0 or more.' },
  { id: 'V04', headcount: 999999, salary: 28000, expected: 'Headcount too high' },
  { id: 'V05', headcount: 'abc', salary: 28000, expected: 'Invalid input type' },
];

// Run tests
let passed = 0;
let failed = 0;

console.log('=== NI Calculator Unit Tests (v1.0) ===\n');

// Golden dataset tests
console.log('--- Golden Dataset ---');
for (const tc of goldenDataset) {
  const result = calculate(tc.headcount, tc.salary);
  const fields = ['payroll', 'currentNI', 'newNI', 'additional', 'monthly'];
  let ok = true;
  let details = [];

  for (const f of fields) {
    if (result[f] !== tc[f]) {
      ok = false;
      details.push(`${f}: got ${result[f]}, expected ${tc[f]}`);
    }
  }

  if (ok) {
    console.log(`  ✅ ${tc.id}: PASS (headcount=${tc.headcount}, salary=${tc.salary})`);
    passed++;
  } else {
    console.log(`  ❌ ${tc.id}: FAIL — ${details.join(', ')}`);
    failed++;
  }
}

// Validation tests
console.log('\n--- Validation Tests ---');
for (const tc of validationTests) {
  const err = validate(tc.headcount, tc.salary);
  if (err && err.includes(tc.expected.replace('.', '').substring(0, 15))) {
    console.log(`  ✅ ${tc.id}: PASS (correctly rejected: "${err}")`);
    passed++;
  } else {
    console.log(`  ❌ ${tc.id}: FAIL — expected error containing "${tc.expected}", got: ${err || 'no error'}`);
    failed++;
  }
}

// Summary
console.log(`\n=== Results: ${passed} passed, ${failed} failed, ${passed + failed} total ===`);
if (failed > 0) {
  console.log('⛔ RELEASE BLOCKED — failing tests detected');
  process.exit(1);
} else {
  console.log('✅ All gates passed — clear to release');
  process.exit(0);
}
