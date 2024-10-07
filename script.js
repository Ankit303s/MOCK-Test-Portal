let name = prompt("Please Enter your Name!");
let welcome = document.getElementById('welcome');
welcome.innerText = `Welcome To Cognitive Test ${name}`;

// Timer logic: 20-minute countdown
let timeLeft = 20 * 60; // 50 minutes in seconds
let interval; // Declare interval variable

const timerElement = document.getElementById('timer');

// Start the exam and timer
function startExam() {
    document.getElementById('welcomePage').classList.add('hidden'); // Hide the welcome page
    document.getElementById('quizPage').classList.remove('hidden'); // Show the quiz page

    // Start the timer when the exam begins
    interval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            submitQuiz(); // Auto-submit when time runs out
        }
    }, 1000);
}

// Clear response function
function clearResponse(questionName) {
    const options = document.getElementsByName(questionName);
    options.forEach(option => option.checked = false);
}

// Submit quiz and calculate score
function submitQuiz() {
    clearInterval(interval); // Stop timer on submission

    const answers = {
        q1: "B", 
        q2: "A",
        q3: "A",
        q4: "B", 
        q5: "D",
        q6: "B",
        q7: "C", 
        q8: "B",
        q9: "A",
        q10: "D", 
        q11: "C",
        q12: "C",
        q13: "A", 
        q14: "D",
        q15: "B"
        // Add answers for all questions up to q50
    };

    let score = 0;
    let correctQuestions = [];
    let wrongQuestions = [];
    let unattemptedQuestions = [];

    // Check each answer
    for (const [question, correctAnswer] of Object.entries(answers)) {
        const userAnswer = document.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer) {
            if (userAnswer.value === correctAnswer) {
                score++;
                correctQuestions.push(question);
            } else {
                wrongQuestions.push({question, userAnswer: userAnswer.value, correctAnswer});
            }
        } else {
            unattemptedQuestions.push(question);
        }
    }

    // Display result
    document.getElementById('quizPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
    document.getElementById('scoreSummary').textContent = `${name} scored ${score} out of 15`;

    // Show correct, incorrect, and unattempted questions
    const correctList = document.getElementById('correctQuestions');
    const wrongList = document.getElementById('wrongQuestions');
    const unattemptedList = document.getElementById('unattemptedQuestions');

    correctList.innerHTML = "<h3>Correct Answers:</h3>";
    wrongList.innerHTML = "<h3>Wrong Answers:</h3>";
    unattemptedList.innerHTML = "<h3>Unattempted Questions:</h3>";

    correctQuestions.forEach(q => {
        correctList.innerHTML += `<li>Question ${q.slice(1)} is correct</li>`;
    });

    wrongQuestions.forEach(({question, userAnswer, correctAnswer}) => {
        wrongList.innerHTML += `<li>Question ${question.slice(1)}: You answered ${userAnswer}, Correct answer is ${correctAnswer}</li>`;
    });

    unattemptedQuestions.forEach(q => {
        unattemptedList.innerHTML += `<li>Question ${q.slice(1)} was not attempted</li>`;
    });
}
