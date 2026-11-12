
package com.example.designpatterns.builder;

public class PayslipBuilder {

    private String employeeName;
    private double basic;
    private double hra;
    private double da;

    public PayslipBuilder setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
        return this;
    }

    public PayslipBuilder setBasic(double basic) {
        this.basic = basic;
        return this;
    }

    public PayslipBuilder setHra(double hra) {
        this.hra = hra;
        return this;
    }

    public PayslipBuilder setDa(double da) {
        this.da = da;
        return this;
    }

    public Payslip build() {
        return new Payslip(employeeName, basic, hra, da);
    }
}
