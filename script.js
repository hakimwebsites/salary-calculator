// UAE Salary Breakdown Calculator Logic

// Show/hide the custom basic salary field depending on dropdown choice
document.getElementById('basicPercent').addEventListener('change', function () {
  const customGroup = document.getElementById('customBasicGroup');
  customGroup.style.display = this.value === 'custom' ? 'block' : 'none';
});

document.getElementById('calculateBtn').addEventListener('click', function () {
  const totalSalary = parseFloat(document.getElementById('totalSalary').value);
  const basicPercentChoice = document.getElementById('basicPercent').value;
  const employeeType = document.getElementById('employeeType').value;

  if (!totalSalary || totalSalary <= 0) {
    alert('Please enter a valid total monthly salary.');
    return;
  }

  let basicSalary;

  // Work out the basic salary, either from percentage or the exact figure the user gave
  if (basicPercentChoice === 'custom') {
    const customBasic = parseFloat(document.getElementById('customBasic').value);
    if (!customBasic || customBasic <= 0 || customBasic > totalSalary) {
      alert('Please enter a valid basic salary that is less than or equal to your total salary.');
      return;
    }
    basicSalary = customBasic;
  } else {
    const percent = parseFloat(basicPercentChoice);
    basicSalary = totalSalary * (percent / 100);
  }

  const allowances = totalSalary - basicSalary;

  // GPSSA deduction only applies to UAE/GCC nationals, roughly 11% of basic + certain allowances.
  // We keep this simplified: 11% of basic salary only, clearly labeled as an estimate.
  let deduction = 0;
  if (employeeType === 'national') {
    deduction = basicSalary * 0.11;
  }

  const takeHome = totalSalary - deduction;

  // Display results
  document.getElementById('basicAmount').textContent = basicSalary.toFixed(2) + ' AED';
  document.getElementById('allowanceAmount').textContent = allowances.toFixed(2) + ' AED';

  const deductionRow = document.getElementById('deductionRow');
  if (deduction > 0) {
    deductionRow.style.display = 'flex';
    document.getElementById('deductionAmount').textContent = '-' + deduction.toFixed(2) + ' AED';
  } else {
    deductionRow.style.display = 'none';
  }

  document.getElementById('takeHomeAmount').textContent = takeHome.toFixed(2) + ' AED';

  document.getElementById('gratuityNote').textContent =
    'Your basic salary for gratuity purposes is ' + basicSalary.toFixed(2) + ' AED. Use this figure in the Gratuity Calculator to see your end-of-service entitlement.';

  document.getElementById('result').style.display = 'block';
});
