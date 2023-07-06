const paginateResults = (results, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = results.slice(startIndex, endIndex);
  return paginatedResults;
};

module.exports = { paginateResults };
