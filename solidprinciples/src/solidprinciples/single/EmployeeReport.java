package solidprinciples.single;

public class EmployeeReport {

    public void generateReport(Employee employee) {
        System.out.println("Employee Name: " + employee.getName());
        System.out.println("Employee Salary: " + employee.getSalary());
    }
}
