import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select";
import { CustomEnum } from "./constants";
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";

interface CustomSelectProps extends FieldProps {
  options: OptionsType<CustomEnum>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {

  const { t } = useTranslation();

  const onChange = (option: ValueType<CustomEnum | CustomEnum[], boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as CustomEnum[]).map((item: CustomEnum) => item.value)
        : (option as CustomEnum).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      getOptionLabel={list => t(list.label)}
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
