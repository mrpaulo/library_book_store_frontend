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
import Select,  { Options, OnChangeValue } from "react-select";
//Constants
import { CustomEnum } from "./constants";
//Tranlation
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";
//Third party
import { FieldProps } from "formik";

interface CustomSelectProps extends FieldProps {
  options: Options<CustomEnum>;
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

  const onChange = (option: OnChangeValue<CustomEnum | CustomEnum[], boolean>) => {
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
        ? options.filter((option: { value: any; }) => field.value.indexOf(option.value) >= 0)
        : options.find((option: { value: any; }) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <Select
      getOptionLabel={(list: CustomEnum) => t("enums." + list.value)}
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
