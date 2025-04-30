import zxcvbn from "zxcvbn";
import { checkPasswordBreach } from "../services/apiPasswords";

// Check if password is reused
export function isPasswordReused(password, existingPasswords = []) {
  return existingPasswords.some((p) => p === password);
}

// Basic character checks
export function analyzeCharacterVariety(password) {
  return {
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.trim().length,
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
  const hasCommonPassword = isCommonPassword(zxcvbnResult);
  const hasKeyboardPattern = usesKeyboardPattern(zxcvbnResult);

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
export function getStrength(score) {
  return score >= 85
    ? {
        strength: "Very Strong",
        description: "Quantum-resistant (10+ years)",
        background: "dark:bg-mint-600 bg-mint-500",
      }
    : score >= 70
      ? {
          strength: "Resilient",
          description: "Resist brute-force (~decade)",
          background: "bg-butter-500 dark:bg-butter-600",
        }
      : score >= 50
        ? {
            strength: "Moderate",
            description: "Vulnerable (<1 year)",
            background: "dark:bg-rust-600 bg-rust-500",
          }
        : {
            strength: "Weak",
            description: "Easily crackable (<1 hour)",
            background: "dark:bg-ruby-600 bg-ruby-500",
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
  // const strengthInfo = getStrength(score);

  return { isBreached, isReused, score };
}

export function isCommonPassword(zxcvbnResult) {
  if (!zxcvbnResult) return false;
  if (zxcvbnResult.password.length === 0) return false;

  return (
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
    )
  );
}

export function usesKeyboardPattern(zxcvbnResult) {
  if (!zxcvbnResult) return false;
  return zxcvbnResult.sequence.some((seq) => seq.pattern === "spatial");
}

export function generatePassword(
  symbols,
  digits,
  uppercase,
  length,
  setPassword,
) {
  const symbolChars = "!@#$%^&*()_+{}[]<>?";
  const digitChars = "0123456789";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

  let passwordArray = [];

  // Add symbols
  for (let i = 0; i < symbols; i++) {
    passwordArray.push(
      symbolChars[Math.floor(Math.random() * symbolChars.length)],
    );
  }

  // Add digits
  for (let i = 0; i < digits; i++) {
    passwordArray.push(
      digitChars[Math.floor(Math.random() * digitChars.length)],
    );
  }

  // Add uppercase characters
  for (let i = 0; i < uppercase; i++) {
    passwordArray.push(
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    );
  }

  // Fill the rest with lowercase characters
  for (let i = passwordArray.length; i < length; i++) {
    passwordArray.push(
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    );
  }

  // Shuffle the password to mix characters randomly
  passwordArray = passwordArray.sort(() => Math.random() - 0.5);

  // Set the generated password
  setPassword(passwordArray.join(""));
}

export function getMaxPasswordAge(passwords) {
  if (!Array.isArray(passwords) || passwords.length === 0) {
    return 0;
  }

  const today = new Date();
  const ages = passwords?.map((pwd) => {
    const updatedAt = new Date(pwd.last_updated);
    const diff = (today - updatedAt) / (1000 * 60 * 60 * 24);
    return Math.floor(diff);
  });

  if (ages.length === 0) {
    return 0; 
  }

  return Math.max(...ages); // longest age
}
