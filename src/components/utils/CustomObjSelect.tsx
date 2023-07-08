/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React from "react";
import Select, { Options, OnChangeValue } from "react-select";
//Third party
import { FieldProps } from "formik";

interface Option {
  name: string;
  id: number;
}

interface CustomObjSelectProps extends FieldProps {
  options: Options<Option>;
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

  const onChange = (option: OnChangeValue<Option | Option[],  boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item)
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
        ? (field.value ? options.filter((option: { name: string; }) => field.value.find((valueItem: { name: string; }) => {
          return valueItem.name === option.name;
        })) : [])
        : options.find((option: { name: any; }) => option.name === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <>
    {/**console.log(options)*/}
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      getOptionLabel ={(option: Option)=>option.name}      
    />
    </>
  );
};

export default CustomObjSelect;
