
import { CheckCircle } from "lucide-react";

interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${index < currentStep ? 'bg-green-500 text-white' : 
                index === currentStep ? 'bg-brand-blue-500 text-white' : 
                'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
              {index < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs mt-2 hidden md:block 
              ${index === currentStep ? 'text-brand-blue-500 font-medium' : 
                'text-slate-500 dark:text-slate-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-slate-200 dark:bg-slate-700 w-full rounded-full" />
        <div 
          className="absolute top-0 h-1 bg-brand-blue-500 rounded-full" 
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default StepIndicator;
