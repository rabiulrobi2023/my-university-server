import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm || '';
    // if (this?.query?.searchTerm) {

    // }

    this.queryModel = this.queryModel.find({
      $or: searchableFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });
    return this;
  }

  filter() {
    const queryObj = { ...this?.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const fields =
      (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt';
    this.queryModel = this.queryModel.sort(fields as string);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = Number((page - 1) * limit);
    this.queryModel = this.queryModel.skip(skip);
    return this;
  }
  limit() {
    const limit = Number(this.query.limit) || 10;
    this.queryModel = this.queryModel.limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  async totalCount() {
    const totalQueries = this.queryModel.getFilter();
    const totalDocument =
      await this.queryModel.model.countDocuments(totalQueries);
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(totalDocument / limit);

    return {
      page,
      limit,
      totalPage,
      totalDocument,
    };
  }
}
export default QueryBuilder;
