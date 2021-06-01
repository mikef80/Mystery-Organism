// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// FACTORY FUNCTION
const pAequorFactory = (number, dnaArr) => {
  return {
    specimenNum : number,
    dna : dnaArr,

    // MUTATE A SINGLE BASE IN DNA STRAND
    mutate() {
      let bRand = Math.floor(Math.random() * 15);      
      let mutation = '';
      //console.log(bRand);
      
      // Keep mutating whilst same base is returned
      do {
        mutation = returnRandBase();
      } 
      while (mutation === this.dna[bRand]);
      
      // Assign mutation to DNA string
      this.dna.splice(bRand, 1, mutation);
    },

    // COMPARE DNA STRANDS
    compareDNA(object) {
      // Match percentage
      let matchCount = 0;
      for (let i = 0; i < 15; i++) {
        if (object.dna[i] === this.dna[i]) {
          matchCount++;
        }
      }

      let match = ((matchCount / 15) * 100).toFixed(0);
      
      //console.log(`specimen #${object.specimenNum} and specimen #${this.specimenNum} have ${match}% DNA in common`);

      return match;
    },

    // CHECKS FOR STRAINS THAT WILL LIKELY SURVIVE
    willLikelySurvive() {
      let surviveR = 0;
      this.dna.forEach(item => {
        if (item === 'C' || item === 'G') {
          surviveR++;
        }
      });
      return surviveR / 15 >= 0.6 ? true : false;
    },

    // RETURN COMPLEMENTARY DNA STRAND
    complementStrand() {
      const complement = [];
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'A') {
          complement[i] = 'T';
        } else if (this.dna[i] === 'T') {
          complement[i] = 'A';
        } else if (this.dna[i] === 'C') {
          complement[i] = 'G';
        } else if (this.dna[i] === 'G') {
          complement[i] = 'C';
        }
      }
      return complement;
    }
  }
}

// CREATE ARRAY OF 30 VIABLE DNA STRANDS
  let studyArr = [];
    let n = 0;
    do {
      let temp  = pAequorFactory(n,mockUpStrand());
      if (temp.willLikelySurvive()) {
        studyArr.push(temp);
        n++;
      }
    } while (studyArr.length < 30);






//************************TESTS*************************************
/*console.log(studyArr)
studyArr.forEach(item => {
  console.log(item.willLikelySurvive());
})*/
/*
let test1 = studyArr[Math.floor(Math.random() * 30)];
let test2 = studyArr[Math.floor(Math.random() * 30)];

console.log(test1)
test1.mutate()
console.log(test1)

console.log(test1);
console.log(test2);
test1.compareDNA(test2)
console.log(test1.willLikelySurvive());
console.log(test2.willLikelySurvive());*/

/*console.log(studyArr)
studyArr.forEach(item => {
  console.log(item.willLikelySurvive());
})*/

//console.log(test1.complementStrand())
/*
studyArr.forEach(item => {
  console.log(item.dna);
})
*/
//************************END TESTS*************************************

//FIND MOST RELATED SEQUENCES

let mostRelated = [];
let mostRelScore = 0;
let score = 0;
for (let i = 0; i < studyArr.length; i++) {
  for (let j = 0; j < studyArr.length; j++) {
    if (i != j) {
      score = studyArr[i].compareDNA(studyArr[j]);
    } else {
      continue;
    }
    if (score > mostRelScore) {
      mostRelScore = score;
      mostRelated[0] = i;
      mostRelated[1] = j;
    };
  }
}

console.log(`The most related pair of samples are ${mostRelated[0]} and ${mostRelated[1]}`)

//END FIND SEQUENCE