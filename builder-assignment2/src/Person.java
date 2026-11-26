public final class Person {

    private final String firstName;
    private final String lastName;
    private final int age;
    private final String address;
    private final String city;
    private final String state;
    private final String email;
    private final String phoneNumber;
    private final String gender;
    private final String occupation;

    Person(PersonBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.address = builder.address;
        this.city = builder.city;
        this.state = builder.state;
        this.email = builder.email;
        this.phoneNumber = builder.phoneNumber;
        this.gender = builder.gender;
        this.occupation = builder.occupation;
    }

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getAge() { return age; }
    public String getAddress() { return address; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getGender() { return gender; }
    public String getOccupation() { return occupation; }

    @Override
    public String toString() {
        return "Person{" +
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