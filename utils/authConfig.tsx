type Passwordchecks = {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  }
 // Count how many rules passed
 
 export const getPassedRules = (passwordChecks: Passwordchecks) => {
    return Object.values(passwordChecks).filter(Boolean).length;
  };