const extractErrors = (error) => {
  const res = {};
  for (let item of error.details) res[item.path[0]] = item.message;

  console.log(res, error);
  return res;
};
module.exports = extractErrors;
