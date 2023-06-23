module.exports = async function (context, req) {
    const mergeArrays = (arr1 = [], arr2 = [], comparisonKey) => {
      const map = new Map(arr2.map(obj => [obj[comparisonKey], obj]));
      return arr1.map(obj => ({ ...obj, ...map.get(obj[comparisonKey]) }));
    };
  
    context.res = {
      body: mergeArrays(req.body.array1, req.body.array2, req.body.comparisonKey)
    };
  };
  