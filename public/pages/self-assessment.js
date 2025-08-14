const Assessment = {
  title: "Are you a good CTO?",
  questions: ["Do you understand the business side of your company?", "Can you effectively communicate with both technical and non-technical stakeholders?", "Are you able to make strategic decisions that align with the company’s goals?"],
  ratings: [
    { min: 0, max: 19, label: "Bad CTO" },
    { min: 20, max: 53, label: "OK CTO" },
    { min: 54, max: 88, label: "Good CTO" },
    { min: 89, max: 100, label: "Best CTO" },
  ],
};

function calculateScore(event) {
  event.preventDefault();
  // Assume each question has an input named "question-0", "question-1", etc.
  let totalScore = 0;
  Assessment.questions.forEach((_, idx) => {
    const val = parseInt(document.querySelector(`[name="question-${idx + 1}"]`)?.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 4) {
      totalScore += val;
    }
  });

  // Normalize score to 0-100 scale
  const maxPossible = Assessment.questions.length * 4;
  const normalizedScore = Math.round((totalScore / maxPossible) * 100);

  // Find rating label
  const rating = Assessment.ratings.find((r) => normalizedScore >= r.min && normalizedScore <= r.max);

  document.getElementById("result").innerHTML = `Your score: ${normalizedScore}\nAssessment: ${rating ? rating.label : "Unknown"}`;
}

const page = {
  title: "CTO Self-assessments",
  getData: function () {
    return { assessment: Assessment };
  },
  functions: { calculateScore: calculateScore },
};

export default page;
