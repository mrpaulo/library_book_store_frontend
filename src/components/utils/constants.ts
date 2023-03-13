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
