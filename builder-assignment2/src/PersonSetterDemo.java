public class PersonSetterDemo {

    static class MutablePerson {

        private String firstName;
        private String lastName;
        private int age;
        private String address;
        private String city;
        private String state;
        private String email;
        private String phoneNumber;
        private String gender;
        private String occupation;

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public void setState(String state) {
            this.state = state;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public void setOccupation(String occupation) {
            this.occupation = occupation;
        }

        @Override
        public String toString() {
            return "MutablePerson{" +
                    "firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    ", age=" + age +
                    ", address='" + address + '\'' +
                    ", city='" + city + '\'' +
                    ", state='" + state + '\'' +
                    ", email='" + email + '\'' +
                    ", phoneNumber='" + phoneNumber + '\'' +
                    ", gender='" + gender + '\'' +
                    ", occupation='" + occupation + '\'' +
                    '}';
        }
    }

    public static void demonstrateSetters() {
        MutablePerson person = new MutablePerson();

        person.setFirstName("Gunavanth");
        person.setLastName("Reddy");
        person.setAge(23);
        person.setAddress("Madhapur");
        person.setCity("Hyderabad");
        person.setState("Telangana");
        person.setEmail("gunavanth@example.com");
        person.setPhoneNumber("9876543210");
        person.setGender("Male");
        person.setOccupation("Software Engineer");

        System.out.println(person);

        person.setAge(24);

        System.out.println("After changing age:");
        System.out.println(person);
    }
}