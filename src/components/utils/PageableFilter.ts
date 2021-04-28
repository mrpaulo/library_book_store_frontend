export interface PageableFilter {
  currentPage: number,
  rowsPerPage: number,
  sortColumn?: String,
  sort?: String,
  offset?: number,
  id?: number,
  name?: String,
  startDate?: Date,
  finalDate?: Date  
}