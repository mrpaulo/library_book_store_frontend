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