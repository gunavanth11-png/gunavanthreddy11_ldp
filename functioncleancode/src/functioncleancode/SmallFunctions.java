package functioncleancode;

public class SmallFunctions {

    public static void processStudent() {
        String name = getStudentName();
        int marks = getStudentMarks();

        displayStudentResult(name, marks);
    }

    private static String getStudentName() {
        return "Gunavanth";
    }

    private static int getStudentMarks() {
        return 85;
    }

    private static void displayStudentResult(String name, int marks) {
        System.out.println("Student Name: " + name);
        System.out.println("Marks: " + marks);
    }
}