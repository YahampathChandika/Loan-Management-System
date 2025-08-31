import { Check } from "lucide-react";

interface OnboardingWorkflowProps {
  steps: string[];
  currentStep?: number;
}

export function OnboardingWorkflow({
  steps,
  currentStep = 3,
}: OnboardingWorkflowProps) {
  return (
    <div className="space-y-1">
      <h4 className="font-semibold text-gray-900 mb-4">Onboarding Workflow</h4>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;
          const isCurrent = stepNumber === currentStep + 1;

          return (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? <Check className="w-3 h-3" /> : stepNumber}
              </div>

              <span
                className={`text-sm ${
                  isCompleted || isCurrent
                    ? "text-gray-900 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
