import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select";

interface Option {
  name: string;
  id: number;
}

interface CustomObjSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
  isObject?: boolean;
  className?: string;
  placeholder?: string;
  isAddress?: boolean;
  setValueSelected(option: Option): void
}

export const CustomObjSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  isAddress,
  setValueSelected
}: CustomObjSelectProps) => {
  const onChange = (option: ValueType<Option | Option[],  boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.name)
        : (option as Option).name
    );
    if(isAddress){
      setValueSelected(option as Option);
    }
  };

  const getValue = () => {
    if (options) {      
      return isMulti
      //mudei de  field.value.indexOf(option.name)
        ? (field.value ? options.filter(option => field.value.find((valueItem: { name: string; }) => {
          return valueItem.name === option.name;
        })) : [])
        : options.find(option => option.name === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      getOptionLabel ={(option)=>option.name}
    />
  );
};

export default CustomObjSelect;
