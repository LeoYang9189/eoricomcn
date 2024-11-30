import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { enUS, zhCN } from 'date-fns/locale';

// 注册语言包
registerLocale('en', enUS);
registerLocale('zh', zhCN);

export default function DatePicker({ value, onChange, className }) {
  const { t, i18n } = useTranslation();
  
  // 根据当前语言设置日期选择器的语言
  const locale = i18n.language === 'zh' ? 'zh' : 'en';
  
  return (
    <div className="relative">
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={date => onChange(date ? date.toISOString().split('T')[0] : '')}
        dateFormat="yyyy-MM-dd"
        locale={locale}
        maxDate={new Date()}
        placeholderText={t('application.fields.establishDatePlaceholder')}
        className={`block w-full px-4 py-3 text-base rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        isClearable
        popperProps={{
          strategy: "fixed"
        }}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex space-x-2">
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="text-gray-600 border-0 bg-transparent cursor-pointer hover:text-blue-500 focus:ring-0"
              >
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                className="text-gray-600 border-0 bg-transparent cursor-pointer hover:text-blue-500 focus:ring-0"
              >
                {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                  <option key={month} value={month}>
                    {i18n.language === 'zh' 
                      ? `${month + 1}月`
                      : new Date(0, month).toLocaleString(locale, { month: 'long' })
                    }
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      />
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      {...props}
    >
      <path 
        fillRule="evenodd" 
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      {...props}
    >
      <path 
        fillRule="evenodd" 
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );
} 