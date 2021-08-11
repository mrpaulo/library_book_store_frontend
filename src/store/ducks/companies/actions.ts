import { action } from 'typesafe-actions';
import { CompaniesTypes, Company, CompanyFilter, CompanyDTO } from './types';

export const loadRequest = () => action(CompaniesTypes.LOAD_REQUEST);
export const loadSuccess = (companiesData: Company[]) => action(CompaniesTypes.LOAD_SUCCESS,  { companiesData });

export const searchRequest = (filter: CompanyFilter) => action(CompaniesTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (companiesData: Company[]) => action(CompaniesTypes.SEARCH_SUCCESS,  { companiesData });

export const findByIdRequest = (id: number) => action(CompaniesTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (companyData: Company) => action(CompaniesTypes.FIND_BY_ID_SUCCESS,  { companyData });

export const findByNameRequest = (name: string) => action(CompaniesTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (companiesData: CompanyDTO) => action(CompaniesTypes.FIND_BY_NAME_SUCCESS,  { companiesData});

export const updateRequest = (company: Company) => action(CompaniesTypes.UPDATE_REQUEST,  { company });
export const updateSuccess = (companyData: Company) => action(CompaniesTypes.UPDATE_SUCCESS,  { companyData });

export const deleteByIdRequest = (id: number) => action(CompaniesTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(CompaniesTypes.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (company: Company) => action(CompaniesTypes.CREATE_REQUEST,  { company });
export const createSuccess = (companyData: Company) => action(CompaniesTypes.CREATE_SUCCESS,  { companyData });

export const changeFlagEditing = () => action(CompaniesTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(CompaniesTypes.CHANGE_FLAG_DETAIL);
export const cleanCompanyEdit = () => action(CompaniesTypes.CLEAN_BOOK_EDIT);
