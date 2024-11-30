import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function StepProgress({ steps, currentStep, onStepClick }) {
  const { t } = useTranslation();

  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* 背景线条 */}
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        
        {/* 进度线条 */}
        <motion.div 
          className="absolute top-1/2 h-0.5 bg-blue-600 -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* 步骤点 */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = index <= currentStep;
            
            return (
              <div key={step} className="flex flex-col items-center">
                <motion.button
                  onClick={() => isClickable && onStepClick?.(index)}
                  disabled={!isClickable}
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-blue-600' : isCurrent ? 'bg-blue-600' : 'bg-white'}
                    ${!isCompleted && !isCurrent ? 'border-2 border-gray-300' : ''}
                    ${isClickable ? 'cursor-pointer hover:shadow-lg' : 'cursor-not-allowed'}
                    transition-all duration-200
                  `}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted || isCurrent ? '#2563eb' : '#fff'
                  }}
                  whileHover={isClickable ? { scale: 1.15 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {isCompleted ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckIcon className="w-6 h-6 text-white" />
                      </motion.div>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-500'}`}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* 悬停提示 */}
                  {isClickable && (
                    <motion.div
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 pointer-events-none"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCompleted ? t('application.steps.revisit') : step}
                    </motion.div>
                  )}
                </motion.button>

                {/* 步骤标题 */}
                <motion.div 
                  className="mt-2 text-center"
                  animate={{
                    scale: isCurrent ? 1.05 : 1,
                    color: isCurrent ? '#2563eb' : '#6b7280'
                  }}
                >
                  <div className={`
                    text-sm font-medium
                    ${isCurrent ? 'text-blue-600' : 'text-gray-500'}
                    ${isClickable ? 'hover:text-blue-700' : ''}
                    transition-colors duration-200
                  `}>
                    {step}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 