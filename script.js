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
