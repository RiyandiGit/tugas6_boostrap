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
