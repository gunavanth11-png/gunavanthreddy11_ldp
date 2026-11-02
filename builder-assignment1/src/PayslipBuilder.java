public class PayslipBuilder {

    int employeeId;
    String employeeName;
    double basic;
    double hra;
    double da;
    double otherAllowances;
    double pf;
    double tax;

    public PayslipBuilder employeeId(int employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public PayslipBuilder employeeName(String employeeName) {
        this.employeeName = employeeName;
        return this;
    }

    public PayslipBuilder basic(double basic) {
        this.basic = basic;
        return this;
    }

    public PayslipBuilder hra(double hra) {
        this.hra = hra;
        return this;
    }

    public PayslipBuilder da(double da) {
        this.da = da;
        return this;
    }

    public PayslipBuilder otherAllowances(double otherAllowances) {
        this.otherAllowances = otherAllowances;
        return this;
    }

    public PayslipBuilder pf(double pf) {
        this.pf = pf;
        return this;
    }

    public PayslipBuilder tax(double tax) {
        this.tax = tax;
        return this;
    }

    public Payslip build() {
        return new Payslip(this);
    }
}