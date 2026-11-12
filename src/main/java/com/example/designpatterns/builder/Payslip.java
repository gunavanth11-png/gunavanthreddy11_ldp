
package com.example.designpatterns.builder;

public class Payslip {

    private final String employeeName;
    private final double basic;
    private final double hra;
    private final double da;

    public Payslip(String employeeName, double basic,
                   double hra, double da) {
        this.employeeName = employeeName;
        this.basic = basic;
        this.hra = hra;
        this.da = da;
    }

    public void display() {
        double total = basic + hra + da;

        System.out.println("Employee: " + employeeName);
        System.out.println("Basic Salary: " + basic);
        System.out.println("HRA: " + hra);
        System.out.println("DA: " + da);
        System.out.println("Total Salary: " + total);
    }
}
