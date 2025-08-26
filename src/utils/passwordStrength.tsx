"use client";
import { useAuth } from "../authContexts/context";
import { getPassedRules } from "./authConfig";

const PasswordStrength = () => {
  const { passwordChecks} = useAuth();
  const passedRules = getPassedRules(passwordChecks);
 


  return (
    <div className="mt-2 space-y-2 text-sm">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              passedRules === 0
                ? "w-0"
                : passedRules === 1
                ? "w-1/5 bg-red-500"
                : passedRules === 2
                ? "w-2/5 bg-orange-500"
                : passedRules === 3
                ? "w-3/5 bg-yellow-500"
                : passedRules === 4
                ? "w-4/5 bg-lime-500"
                : "w-full bg-green-500"
            }`}
          />
        </div>
        <p
          className={`text-xs ${
            passedRules === 0
              ? "text-gray-500"
              : passedRules === 1
              ? "text-red-500"
              : passedRules === 2
              ? "text-orange-500"
              : passedRules === 3
              ? "text-yellow-500"
              : passedRules === 4
              ? "text-lime-500"
              : "text-green-500"
          }`}
        >
          Password strength:{" "}
          {passedRules === 0
            ? "None"
            : passedRules === 1
            ? "Very Weak"
            : passedRules === 2
            ? "Weak"
            : passedRules === 3
            ? "Medium"
            : passedRules === 4
            ? "Strong"
            : "Very Strong"}
        </p>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-2">
        <RuleItem valid={passwordChecks.length} label="8+ characters" />
        <RuleItem valid={passwordChecks.uppercase} label="Uppercase letter" />
        <RuleItem valid={passwordChecks.lowercase} label="Lowercase letter" />
        <RuleItem valid={passwordChecks.number} label="Number" />
        <RuleItem valid={passwordChecks.special} label="Special character" />
      </div>

      
    </div>
  );
};

// Small subcomponent for each rule
const RuleItem = ({ valid, label }: { valid: boolean; label: string }) => (
  <div
    className={`flex items-center gap-2 ${
      valid ? "text-green-600" : "text-gray-500"
    }`}
  >
    <span>{valid ? "✔" : "✖"}</span>
    <span>{label}</span>
  </div>
);

export default PasswordStrength;
