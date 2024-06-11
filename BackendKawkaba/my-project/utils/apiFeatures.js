class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // Apply filtering using [gt, gte, lt, lte]
    // {price: {$gte: 50}, ratingAverage: {$gte: 4}}
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // matching query string with mongoDB
      // price, -sold => [price, -sold] => price -sold
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search() {
    console.log("Keyword received:", this.queryString.keyword);
    if (this.queryString.keyword) {
      const query = {};
      query.$or = [
        { name: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
        { company: { $regex: this.queryString.keyword, $options: "i" } },
      ];
      console.dir(query, { depth: null });
      this.mongooseQuery = this.mongooseQuery.find(query);
      // Temporarily log the output for debugging
      this.mongooseQuery.exec((err, docs) => {
        if (err) console.error("Error executing query:", err);
        else console.log("Query results:", docs);
      });
    }
    console.log(this);
    return this;
  }

  pagenate(countDocuments) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 400;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    // pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    this.paginationResult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
