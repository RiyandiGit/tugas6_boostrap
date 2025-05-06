// bagian 1: Pengambilan Data dari json dan buat Timer (meikal gina setiawan)
// Bagian ini bertanggung jawab mengambil soal dari file data.json dan mengatur waktu hitung mundur
let quizData = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 300;

fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
        quizData = data;
        startTimer();
        showQuestion();
    });

function startTimer() {
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}

// Bagian 2: menampilkan Pilihan Jawaban dan Menampilkan Soal (rahmad riyandi)
// Bagian ini bertanggung jawab menampilkan soal, menampilkan pilihan jawaban dan memproses jawaban user
function showQuestion() {
    const q = quizData[currentQuestion];
    const container = document.getElementById("question-container");
    container.innerHTML = `
        <h5>${currentQuestion + 1}. ${q.question}</h5>
        ${q.options
            .map(
                (opt) => `
            <div class="option" onclick="selectAnswer(this, '${opt.replace(/'/g, "\\'")}', '${q.answer.replace(/'/g, "\\'")}')">${opt}</div>
        `
            )
            .join("")}
    `;
    document.getElementById("question-counter").textContent = `${currentQuestion + 1} dari ${quizData.length} soal`;
    document.getElementById("next-btn").disabled = true;
}

function selectAnswer(element, selected, correct) {
    const options = document.querySelectorAll(".option");
    options.forEach((opt) => {
        opt.classList.add("disabled");
        if (opt.textContent === correct) {
            opt.classList.add("correct");
        } else if (opt.textContent === selected && selected !== correct) {
            opt.classList.add("incorrect");
        }
    });
    if (selected === correct) score++;
    document.getElementById("next-btn").disabled = false;
}

// Bagian 3: Navigasi Soal, Skor Akhir dan Restart (mohammad fauzi rahman)
// Bagian ini bertanggung jawab Menangani logika untuk pindah soal, menampilkan skor akhir, dan mengulang kuis
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        clearInterval(timer);
        showScore();
    }
}

function showScore() {
    const totalQuestions = quizData.length;
    const finalScore = ((score / totalQuestions) * 100).toFixed(2);
    const container = document.getElementById("question-container");
    container.innerHTML = `
        <h4 class="text-center">Kuis Selesai!</h4>
        <p class="text-center">Skor Anda: <strong>${score}</strong> dari <strong>${totalQuestions}</strong> soal.</p>
        <p class="text-center">Nilai Akhir: <strong id="final-score">${finalScore}</strong></p>
        <div class="text-center mt-3">
            <button class="btn-ulang" onclick="restartQuiz()">Ulang Kuis</button>
        </div>
    `;
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("question-counter").textContent = "";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 300;
    clearInterval(timer);
    startTimer();
    showQuestion();
    document.getElementById("next-btn").style.display = "inline-block";
}
