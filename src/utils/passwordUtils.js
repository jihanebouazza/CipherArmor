import zxcvbn from "zxcvbn";
import { checkPasswordBreach } from "../services/apiPasswords";

// Check if password is reused
export function isPasswordReused(password, existingPasswords = []) {
  return existingPasswords.some((p) => p === password);
}

// Basic character checks
function analyzeCharacterVariety(password) {
  return {
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[\W_]/.test(password),
    length: password.length,
  };
}

// Calculate password score
function calculateScore({ hasLower, hasUpper, hasNumber, hasSymbol, length }) {
  let score = Math.min(length * 3, 50); // Length score (max 50)
  let varietyScore = 0;
  if (hasLower) varietyScore += 5;
  if (hasUpper) varietyScore += 10;
  if (hasNumber) varietyScore += 7;
  if (hasSymbol) varietyScore += 13;

  score += varietyScore; // Variety score (max 40)

  // Entropy calculation
  const charsetSize =
    (hasLower ? 26 : 0) +
    (hasUpper ? 26 : 0) +
    (hasNumber ? 10 : 0) +
    (hasSymbol ? 32 : 0);
  const entropy = length * Math.log2(charsetSize || 1);
  score += entropy * 0.2;

  return score;
}

// Apply penalties to password score
function applyPenalties(password, score) {
  const zxcvbnResult = zxcvbn(password);
  const hasCommonPassword =
    zxcvbnResult.guesses < 1e6 ||
    zxcvbnResult.sequence.some(
      (seq) =>
        seq.pattern === "dictionary" &&
        [
          "passwords",
          "english_wikipedia",
          "male_names",
          "female_names",
        ].includes(seq.dictionary),
    );

  const hasKeyboardPattern = zxcvbnResult.sequence.some(
    (seq) => seq.pattern === "spatial",
  );

  if (hasKeyboardPattern) score -= 15;
  if (/(.{2})\1{2}/.test(password)) score -= 8; // Repeated 2-char patterns
  if (hasCommonPassword) score -= 25; // Common patterns
  if (/[a-z]{3,}|[A-Z]{3}/i.test(password)) score -= 10; // Sequences

  return score;
}

// Clamp score between 0 and 100
function clampScore(score) {
  return Math.ceil(Math.max(0, Math.min(score, 100)));
}

// Determine password strength
function getStrength(score) {
  return score >= 85
    ? {
        strength: "Very Strong",
        description: "Quantum-resistant (10+ years)",
        color: "dark:bg-mint-600 bg-mint-500",
      }
    : score >= 70
      ? {
          strength: "Strong",
          description: "Resist brute-force (~decade)",
          color: "dark:bg-mint-600 bg-mint-500",
        }
      : score >= 50
        ? {
            strength: "Moderate",
            description: "Vulnerable (<1 year)",
            color: "dark:bg-rust-600 bg-rust-500",
          }
        : {
            strength: "Weak",
            description: "Easily crackable (<1 hour)",
            color: "dark:bg-ruby-600 bg-ruby-500",
          };
}

// Main password analysis function
export async function analyzePassword(password, existingPasswords = []) {
  const charAnalysis = analyzeCharacterVariety(password);
  let score = calculateScore(charAnalysis);
  score = applyPenalties(password, score);

  const [isBreached, isReused] = await Promise.all([
    checkPasswordBreach(password),
    isPasswordReused(password, existingPasswords),
  ]);

  if (isBreached) score -= 30;
  if (isReused) score -= 20;

  score = clampScore(score);
  const strengthInfo = getStrength(score);

  return { strengthInfo, isBreached, isReused, score };
}
