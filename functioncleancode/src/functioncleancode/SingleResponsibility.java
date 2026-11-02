package functioncleancode;

public class SingleResponsibility {

    public static double calculateAverage(
            int firstMark,
            int secondMark,
            int thirdMark) {

        return (firstMark + secondMark + thirdMark) / 3.0;
    }

    public static void displayAverage(double average) {
        System.out.println("Average marks: " + average);
    }
}