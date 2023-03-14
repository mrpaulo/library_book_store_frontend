export interface CustomEnum {
  label: String,
  value: String
}

export const SexList: CustomEnum[] = [
  {
    label: 'masculine',
    value: 'M'
  },
  {
    label: 'feminine',
    value: 'F'
  },
  {
    label: 'other',
    value: 'O'
  },
  {
    label: 'prefers_not_to_inform',
    value: 'N'
  },
]


export const MAX_SIZE_NAME: number = 100;
export const MAX_SIZE_SHORT_TEXT: number = 200;
export const MAX_SIZE_LONG_TEXT: number = 600;

export const MAX_SIZE_ADDRESS_NUMBER: number = 9;
export const MAX_SIZE_ADDRESS_CEP: number = 8;
export const MAX_SIZE_ADDRESS_ZIPCODE: number = 12;
export const MAX_SIZE_ADDRESS_COORDINATION: number = 20;

export const MAX_SIZE_CNPJ: number = 14;
export const MAX_SIZE_CPF: number = 11;