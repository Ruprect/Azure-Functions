module.exports = async function (context, req) {
    function findArrayDifferences(array1, array2, comparisonKey) {
        const differences = {
            newValues: [],
            deletions: [],
            changedElements: [],
            similarElements: []
        };
  
        const map1 = new Map(array1.map(obj => [obj[comparisonKey], obj]));
        const map2 = new Map(array2.map(obj => [obj[comparisonKey], obj]));
    
        for (const [key, obj2] of map2) {
        const obj1 = map1.get(key);
        if (!obj1) {
            differences.newValues.push(obj2);
        } else if (!isObjectEqual(obj1, obj2)) {
            differences.changedElements.push({ oldValue: obj1, newValue: obj2 });
        } else {
            differences.similarElements.push(obj2);
        }
        }
    
        for (const [key, obj1] of map1) {
        if (!map2.has(key)) {
            differences.deletions.push(obj1);
        }
        }
  
        return differences;
    }

  function isObjectEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  context.res = {
    body: findArrayDifferences(req.body.array1, req.body.array2, req.body.comparisonKey)
  };
};
