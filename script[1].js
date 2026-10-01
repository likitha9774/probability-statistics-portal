const modules = [
["I","Introduction to Statistics","Frequency tables, histograms, ogives, stem-and-leaf plots, central tendency, variability, Chebyshev's inequality, normal data, skewness and scatter plots."],
["II","Introduction to Probability","Probability basics, axioms, conditional probability, Bayes' theorem, independent and dependent events."],
["III","Random Variables","Random variables, discrete and continuous types, probability functions, mean, variance and standard deviation."],
["IV","Discrete Probability Distributions","Binomial and Poisson distributions, moment generating function, mean and variance, and their relationship."],
["V","Continuous Probability Distributions","Normal distribution and tables, uniform, gamma, exponential and beta distributions."],
["VI","Sampling & Estimation","Sampling methods, sampling distributions, central limit theorem, t, chi-square and F distributions, point and interval estimation."],
["VII","Testing of Hypothesis – I","Null and alternative hypotheses, Type I and Type II errors, significance level and tests for a mean."],
["VIII","Testing of Hypothesis – II","Hypothesis testing for proportions and numerical problems across hypothesis-testing models."],
["IX","Correlation","Covariance, types of correlation, coefficient of correlation and Spearman's rank correlation."],
["X","Regression","Simple linear regression, multiple linear regression, nonlinear regression and polynomial regression."]
];

const topics = [
["I","Introduction to Statistics",["Frequency tables","Histograms and ogives","Stem-and-leaf plots","Mean, median and mode","Measures of variability","Chebyshev's inequality","Skewness","Scatter plots"]],
["II","Introduction to Probability",["Axioms of probability","Conditional probability","Bayes' theorem","Independent events","Dependent events"]],
["III","Random Variables",["Discrete random variables","Continuous random variables","PMF / PDF","Expectation","Variance","Standard deviation"]],
["IV","Discrete Probability Distributions",["Binomial distribution","Poisson distribution","MGF","Mean and variance","Binomial–Poisson relationship"]],
["V","Continuous Probability Distributions",["Normal distribution","Normal table","Uniform distribution","Gamma distribution","Exponential distribution","Beta distribution"]],
["VI","Sampling & Estimation",["Sampling methods","Sampling distributions","Central Limit Theorem","t-distribution","Chi-square distribution","F-distribution","Point estimation","Interval estimation"]],
["VII","Testing of Hypothesis – I",["Null hypothesis","Alternative hypothesis","Type I error","Type II error","Significance level","Test for a mean"]],
["VIII","Testing of Hypothesis – II",["Tests for proportions","Large-sample tests","Small-sample ideas","Numerical problems"]],
["IX","Correlation",["Covariance","Pearson correlation","Types of correlation","Spearman rank correlation"]],
["X","Regression",["Simple linear regression","Multiple linear regression","Nonlinear regression","Polynomial regression"]]
];

const formulas = [
["Mean","x̄ = Σx / n"],["Variance (population)","σ² = Σ(x − μ)² / N"],["Standard deviation","σ = √σ²"],["Conditional probability","P(A|B) = P(A∩B) / P(B)"],["Bayes' theorem","P(A|B) = P(B|A)P(A) / P(B)"],["Binomial","P(X=x) = C(n,x)pˣ(1−p)ⁿ⁻ˣ"],["Poisson","P(X=x) = e⁻λ λˣ / x!"],["Z-score","z = (x − μ) / σ"],["Correlation","r = Cov(X,Y) / (σx σy)"],["Regression line","y = a + bx"],["Slope","b = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)²"],["Coefficient of variation","CV = (σ / μ) × 100%"]
];

const grid = document.getElementById("moduleGrid");
function renderModules(filter=""){
  grid.innerHTML="";
  modules.filter(m => (m[0]+" "+m[1]+" "+m[2]).toLowerCase().includes(filter.toLowerCase())).forEach((m,i)=>{
    const card=document.createElement("article");
    card.className="module";
    card.innerHTML=`<div class="module-num">M${m[0]}</div><div><h3>Module ${m[0]}: ${m[1]}</h3><p>${m[2]}</p></div><button class="view" data-index="${modules.indexOf(m)}">View →</button>`;
    grid.appendChild(card);
  });
}
renderModules();
document.getElementById("search").addEventListener("input",e=>renderModules(e.target.value));

const fgrid=document.getElementById("formulaGrid");
formulas.forEach(f=>{fgrid.innerHTML += `<div class="formula-card"><h4>${f[0]}</h4><code>${f[1]}</code></div>`});

const modal=document.getElementById("modal");
grid.addEventListener("click",e=>{
  if(!e.target.classList.contains("view")) return;
  const i=Number(e.target.dataset.index), m=modules[i], t=topics[i];
  document.getElementById("modalCode").textContent=`MODULE ${m[0]}`;
  document.getElementById("modalTitle").textContent=m[1];
  document.getElementById("modalDesc").textContent=m[2];
  document.getElementById("modalTopics").innerHTML=t[2].map(x=>`<li>${x}</li>`).join("");
  modal.classList.remove("hidden");
});
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};

document.getElementById("themeBtn").onclick=()=>{
  document.body.classList.toggle("dark");
  document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾";
};

const questions=[
["Which distribution is commonly used for the number of events occurring in a fixed interval?","Poisson","Normal","Uniform","Beta"],
["What does P(A|B) represent?","Conditional probability of A given B","Probability of B only","Variance of A","Covariance of A and B"],
["Which measure describes the strength and direction of a linear relationship?","Correlation coefficient","Median","Mode","Range"],
["What is the first step in hypothesis testing?","State the null and alternative hypotheses","Calculate variance","Draw a histogram","Find the regression line"],
["For a binomial distribution, what are the two main parameters?","n and p","μ and σ","λ and μ","a and b"]
];
let q=0,score=0,answered=false;
const quiz=document.getElementById("quiz");
function showQuestion(){
  answered=false;
  const x=questions[q];
  quiz.innerHTML=`<div class="question">${q+1}. ${x[0]}</div><div class="options">${x.slice(1).map((o,i)=>`<button class="option" data-i="${i}">${o}</button>`).join("")}</div><div class="score">Score: ${score}/${questions.length}</div>`;
}
quiz.addEventListener("click",e=>{
  if(!e.target.classList.contains("option")||answered)return;
  answered=true;
  const opts=[...quiz.querySelectorAll(".option")];
  opts[0].classList.add("correct");
  if(Number(e.target.dataset.i)===0)score++; else e.target.classList.add("wrong");
  quiz.querySelector(".score").textContent=`Score: ${score}/${questions.length} — ${Number(e.target.dataset.i)===0?"Correct!":"Review the highlighted answer."}`;
});
document.getElementById("nextBtn").onclick=()=>{
  if(q<questions.length-1){q++;showQuestion();}
  else{quiz.innerHTML=`<div class="question">Quiz complete 🎉</div><p class="muted">Final score: <strong>${score}/${questions.length}</strong></p>`;document.getElementById("nextBtn").textContent="Restart Quiz";q=0;score=0;}
};
document.getElementById("nextBtn").addEventListener("click",()=>{
  if(document.getElementById("nextBtn").textContent==="Restart Quiz"){document.getElementById("nextBtn").textContent="Next Question";showQuestion();}
});
showQuestion();
