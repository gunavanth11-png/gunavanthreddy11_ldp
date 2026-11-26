public class Main {

    public static void main(String[] args) {

        Payslip payslip = new PayslipBuilder()
                .employeeId(101)
                .employeeName("Gunavanth Reddy")
                .basic(30000)
                .hra(10000)
                .da(5000)
                .otherAllowances(3000)
                .pf(2500)
                .tax(2000)
                .build();

        System.out.println(payslip);
    }
}