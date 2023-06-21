import moment from 'moment';

export const  formatCPF = (cpf: string) => {
  if(!cpf){
    return ""
  }
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const  formatCNPJ = (cnpj: string) => {
  if(!cnpj){
    return ""
  }
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export const formattedDate = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
}

export const maskCPFValue = (v: string) => {  
  v = v.replace(/\D/g, "")
  v = v.replace(/(\d{3})(\d)/, "$1.$2")
  v = v.replace(/(\d{3})(\d)/, "$1.$2")
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")  
  if (v.length > 11) 
  return v
}

export const maskCNPJValue = (v: string) => {
  v = v.replace(/\D/g, "")  
  v = v.replace(/^(\d{2})(\d)/, "$1.$2")
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
  v = v.replace(/(\d{4})(\d)/, "$1-$2")  
  return v
}