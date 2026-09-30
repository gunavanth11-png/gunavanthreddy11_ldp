package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.junit.jupiter.api.*;
import org.mockito.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class StudentControllerTest {

    @Mock
    private StudentService studentService;

    @InjectMocks
    private StudentController studentController;

    @Captor
    private ArgumentCaptor<Student> studentCaptor;

    @BeforeEach
    void setUp() {

        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() {
        Mockito.reset(studentService);
    }

    @Test
    @DisplayName("Should create student")
    void createStudentTest() {

        Student student =
                new Student(
                        1,
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                );

        when(studentService.createStudent(any(Student.class)))
                .thenReturn(student);

        var response =
                studentController.createStudent(student);

        assertEquals(201, response.getStatusCode().value());

        assertNotNull(response.getBody());

        assertEquals(
                "Gunavanth",
                response.getBody().getName()
        );

        verify(studentService, times(1))
                .createStudent(student);
    }

    @Test
    @DisplayName("Should get all students")
    void getAllStudentsTest() {

        List<Student> students = List.of(
                new Student(
                        1,
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                ),
                new Student(
                        2,
                        "Rahul",
                        "CSE",
                        "rahul@gmail.com"
                )
        );

        when(studentService.getAllStudents())
                .thenReturn(students);

        var response =
                studentController.getAllStudents();

        assertEquals(200, response.getStatusCode().value());

        assertEquals(
                2,
                response.getBody().size()
        );

        verify(studentService)
                .getAllStudents();
    }

    @Test
    @DisplayName("Should get student by ID")
    void getStudentByIdTest() {

        Student student =
                new Student(
                        1,
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                );

        when(studentService.getStudentById(1))
                .thenReturn(student);

        var response =
                studentController.getStudentById(1);

        assertEquals(200, response.getStatusCode().value());

        assertEquals(
                "Gunavanth",
                response.getBody().getName()
        );

        verify(studentService)
                .getStudentById(1);
    }

    @Test
    @DisplayName("Should return 404 when student not found")
    void getStudentByIdNotFoundTest() {

        when(studentService.getStudentById(99))
                .thenReturn(null);

        var response =
                studentController.getStudentById(99);

        assertEquals(
                404,
                response.getStatusCode().value()
        );

        verify(studentService)
                .getStudentById(99);
    }

    @Test
    @DisplayName("Should update student")
    void updateStudentTest() {

        Student student =
                new Student(
                        1,
                        "Gunavanth Updated",
                        "CSE",
                        "updated@gmail.com"
                );

        when(
                studentService.updateStudent(
                        eq(1),
                        any(Student.class)
                )
        ).thenReturn(student);

        var response =
                studentController.updateStudent(
                        1,
                        student
                );

        assertEquals(200, response.getStatusCode().value());

        assertEquals(
                "Gunavanth Updated",
                response.getBody().getName()
        );

        verify(studentService)
                .updateStudent(
                        eq(1),
                        any(Student.class)
                );
    }

    @Test
    @DisplayName("Should delete student")
    void deleteStudentTest() {

        when(studentService.deleteStudent(1))
                .thenReturn("Student deleted successfully");

        var response =
                studentController.deleteStudent(1);

        assertEquals(200, response.getStatusCode().value());

        assertEquals(
                "Student deleted successfully",
                response.getBody()
        );

        verify(studentService)
                .deleteStudent(1);
    }

    @Test
    @DisplayName("Should return 404 when deleting unknown student")
    void deleteStudentNotFoundTest() {

        when(studentService.deleteStudent(99))
                .thenReturn("Student not found");

        var response =
                studentController.deleteStudent(99);

        assertEquals(
                404,
                response.getStatusCode().value()
        );

        verify(studentService)
                .deleteStudent(99);
    }

    @Test
    @DisplayName("Should verify service is never called with wrong ID")
    void verifyNeverTest() {

        when(studentService.getStudentById(1))
                .thenReturn(null);

        studentController.getStudentById(1);

        verify(studentService, never())
                .getStudentById(99);
    }

    @Test
    @DisplayName("Should capture student argument")
    void argumentCaptorTest() {

        Student student =
                new Student(
                        1,
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                );

        when(studentService.createStudent(any(Student.class)))
                .thenReturn(student);

        studentController.createStudent(student);

        verify(studentService)
                .createStudent(studentCaptor.capture());

        Student capturedStudent =
                studentCaptor.getValue();

        assertEquals(
                "Gunavanth",
                capturedStudent.getName()
        );

        assertEquals(
                "AIML",
                capturedStudent.getCourse()
        );
    }
}