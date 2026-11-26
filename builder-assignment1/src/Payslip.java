public final class Payslip {

    private final int employeeId;
    private final String employeeName;
    private final double basic;
    private final double hra;
    private final double da;
    private final double otherAllowances;
    private final double pf;
    private final double tax;
    private final double grossSalary;
    private final double netSalary;

    Payslip(PayslipBuilder builder) {
        this.employeeId = builder.employeeId;
        this.employeeName = builder.employeeName;
        this.basic = builder.basic;
        this.hra = builder.hra;
        this.da = builder.da;
        this.otherAllowances = builder.otherAllowances;
        this.pf = builder.pf;
        this.tax = builder.tax;

        this.grossSalary = basic + hra + da + otherAllowances;
        this.netSalary = grossSalary - pf - tax;
    }

    @Override
    public String toString() {
        return "Payslip\n" +
                "Employee ID: " + employeeId + "\n" +
                "Employee Name: " + employeeName + "\n" +
                "Basic Salary: " + basic + "\n" +
                "HRA: " + hra + "\n" +
                "DA: " + da + "\n" +
                "Other Allowances: " + otherAllowances + "\n" +
                "PF Deduction: " + pf + "\n" +
                "Tax Deduction: " + tax + "\n" +
                "Gross Salary: " + grossSalary + "\n" +
                "Net Salary: " + netSalary;
    }
}