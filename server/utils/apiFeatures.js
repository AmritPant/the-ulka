class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.search
      ? { name: { $regex: this.queryString.search, $options: 'i' } }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    let queryObj = { ...this.queryString };
    if (queryObj) {
      // Removing the Feilds which we dont want
      const removeFeilds = ['search', 'sort', 'page', 'limit', 'feild'];
      removeFeilds.forEach(feild => delete queryObj[feild]);

      queryObj = JSON.stringify(queryObj);

      queryObj = JSON.parse(
        queryObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
      );
      this.query = this.query.find(queryObj);
      return this;
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort('-price');
    }
    return this;
  }

  paginate() {
    //  skip value, limit
    const skipValue = (+this.queryString.page - 1) * +this.queryString.limit;
    const limit = +this.queryString.limit;
    this.query = this.query.skip(skipValue).limit(limit);
    return this;
  }

  limit() {
    if (this.queryString.feilds) {
      this.query = this.query.select(this.queryString.feilds);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
}

module.exports = ApiFeatures;
