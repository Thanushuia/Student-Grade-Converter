document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const students = document.querySelectorAll('.student');
    let results = '';

    students.forEach((student, studentIndex) => {
        const name = student.querySelector(`[name="name${studentIndex + 1}"]`).value;
        results += `<h3>${name}</h3>`;
        const subjects = student.querySelectorAll('.subject');

        subjects.forEach((subject, subjectIndex) => {
            const subjectName = subject.querySelector(`[name="subject${studentIndex + 1}_${subjectIndex + 1}"]`).value;
            const score = subject.querySelector(`[name="score${studentIndex + 1}_${subjectIndex + 1}"]`).value;
            let grade;

            if (score >= 90) {
                grade = 'A Grade';
            } else if (score >= 80) {
                grade = 'B Grade';
            } else if (score >= 70) {
                grade = 'C Grade';
            } else if (score >= 50) {
                grade = 'D Grade';
            } else {
                grade = 'Fail';
            }

            results += `<p>${subjectName}: ${grade}</p>`;
        });
    });

    document.getElementById('results').innerHTML = results;
});

document.getElementById('addStudent').addEventListener('click', function() {
    const studentsDiv = document.getElementById('students');
    const newStudentIndex = document.querySelectorAll('.student').length + 1;
    const newStudent = document.createElement('div');
    newStudent.className = 'student';
    newStudent.innerHTML = `
        <label for="name${newStudentIndex}">Student Name:</label>
        <input type="text" id="name${newStudentIndex}" name="name${newStudentIndex}" required>
        <div class="subjects">
            <div class="subject">
                <label for="subject${newStudentIndex}_1">Subject Name:</label>
                <input type="text" id="subject${newStudentIndex}_1" name="subject${newStudentIndex}_1" required>
                <label for="score${newStudentIndex}_1">Enter Score:</label>
                <input type="number" id="score${newStudentIndex}_1" name="score${newStudentIndex}_1" min="0" max="100" required>
            </div>
        </div>
        <button type="button" class="addSubject">Add Subject</button>
    `;
    studentsDiv.appendChild(newStudent);
    addSubjectButtonListener(newStudentIndex);
});

function addSubjectButtonListener(studentIndex) {
    document.querySelectorAll('.addSubject').forEach((button, index) => {
        if (index === studentIndex - 1) {
            button.addEventListener('click', function() {
                const subjectsDiv = this.previousElementSibling;
                const newSubjectIndex = subjectsDiv.querySelectorAll('.subject').length + 1;
                const newSubject = document.createElement('div');
                newSubject.className = 'subject';
                newSubject.innerHTML = `
                    <label for="subject${studentIndex}_${newSubjectIndex}">Subject Name:</label>
                    <input type="text" id="subject${studentIndex}_${newSubjectIndex}" name="subject${studentIndex}_${newSubjectIndex}" required>
                    <label for="score${studentIndex}_${newSubjectIndex}">Enter Score:</label>
                    <input type="number" id="score${studentIndex}_${newSubjectIndex}" name="score${studentIndex}_${newSubjectIndex}" min="0" max="100" required>
                `;
                subjectsDiv.appendChild(newSubject);
            });
        }
    });
}

// Initialize first student's addSubject button listener
addSubjectButtonListener(1);

