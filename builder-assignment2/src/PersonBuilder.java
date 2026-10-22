public class PersonBuilder {

    String firstName;
    String lastName;
    int age;
    String address;
    String city;
    String state;
    String email;
    String phoneNumber;
    String gender;
    String occupation;

    public PersonBuilder firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public PersonBuilder lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public PersonBuilder age(int age) {
        this.age = age;
        return this;
    }

    public PersonBuilder address(String address) {
        this.address = address;
        return this;
    }

    public PersonBuilder city(String city) {
        this.city = city;
        return this;
    }

    public PersonBuilder state(String state) {
        this.state = state;
        return this;
    }

    public PersonBuilder email(String email) {
        this.email = email;
        return this;
    }

    public PersonBuilder phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public PersonBuilder gender(String gender) {
        this.gender = gender;
        return this;
    }

    public PersonBuilder occupation(String occupation) {
        this.occupation = occupation;
        return this;
    }

    public Person build() {
        return new Person(this);
    }
}