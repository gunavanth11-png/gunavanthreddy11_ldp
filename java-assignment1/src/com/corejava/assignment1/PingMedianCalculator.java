//Write a java function that will ping any host ( given as input ) and computes the median of the time taken to ping.
//Use the system ping utility, do not use any deprecated methods.

package com.corejava.assignment1;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PingMedianCalculator {

    public static double getMedianPingTime(String host) throws Exception {
        boolean isWindows = System.getProperty("os.name").toLowerCase().contains("win");

        List<String> command = new ArrayList<>();
        command.add("ping");
        command.add(isWindows ? "-n" : "-c");
        command.add("4");
        command.add(host);

        Process process = new ProcessBuilder(command).start();

        List<Double> times = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;

        while ((line = reader.readLine()) != null) {
            int index = line.indexOf("time=");
            if (index == -1) {
                index = line.indexOf("time<");
            }

            if (index != -1) {
                String rest = line.substring(index + 5);
                String numberPart = rest.split("ms")[0].trim();
                try {
                    times.add(Double.parseDouble(numberPart));
                } catch (NumberFormatException e) {
                }
            }
        }

        process.waitFor();

        if (times.isEmpty()) {
            return -1;
        }

        Collections.sort(times);
        int middle = times.size() / 2;

        if (times.size() % 2 == 0) {
            return (times.get(middle - 1) + times.get(middle)) / 2.0;
        } else {
            return times.get(middle);
        }
    }

    public static void main(String[] args) throws Exception {
        String host = "google.com";
        System.out.println("Pinging " + host + "...");

        double median = getMedianPingTime(host);

        if (median == -1) {
            System.out.println("No response from " + host);
        } else {
            System.out.println("Median ping time: " + median + " ms");
        }
    }
}