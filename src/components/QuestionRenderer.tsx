import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Basic types for Question and Options (can be expanded or imported)
interface Option {
  id: string;
  text: string;
  // other properties like 'value' for some question types
}

interface Question {
  id: string;
  type: 'single' | 'multi' | 'rank' | 'slider' | 'text'; // Added 'text' for completeness
  text_en: string; // Assuming English text for now
  text_ar: string;
  options_en?: Option[];
  options_ar?: Option[];
  // For slider
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

type AnswerValueType = string | string[] | number | undefined;

interface QuestionRendererProps {
  question: Question;
  onChange: (questionId: string, answer: AnswerValueType) => void;
  currentAnswer: AnswerValueType;
  lang?: 'en' | 'ar';
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onChange,
  currentAnswer,
  lang = 'en', // lang prop might become redundant if t function is used for all text
}) => {
  const { t } = useTranslation(); // Added
  const [rankedItems, setRankedItems] = useState<Option[]>([]);

  // text and options are already supposed to be pre-translated or handled by parent using its own t()
  const text = lang === 'ar' ? question.text_ar : question.text_en;
  const options = lang === 'ar' ? question.options_ar : question.options_en;


  useEffect(() => {
    if (question.type === 'rank' && options) {
      // Initialize with current answer or default options
      if (Array.isArray(currentAnswer) && currentAnswer.length > 0) {
          const orderedItems = currentAnswer
            .map((id: string) => options.find(opt => opt.id === id))
            .filter((opt): opt is Option => opt !== undefined);
          setRankedItems(orderedItems);
      } else {
        setRankedItems(options);
      }
    }
  }, [question, currentAnswer, options]);

  const handleRankChange = (newlyOrderedIds: string[]) => {
    // This function would be called by the DND library on drop
    onChange(question.id, newlyOrderedIds);
    // Update local state to reflect the change immediately for UI
    const newOrderedItems = newlyOrderedIds
        .map(id => options?.find(opt => opt.id === id))
        .filter((opt): opt is Option => opt !== undefined);
    setRankedItems(newOrderedItems);
  };

  // Placeholder for drag start and drop handlers if implementing manually or with simple DND
  const onDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData("draggedItemIndex", index.toString());
    // Basic styling for drag indication
    e.currentTarget.style.opacity = '0.4';

  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.opacity = '1'; // Reset opacity
  };

  const onDrop = (e: React.DragEvent<HTMLLIElement>, droppedOnIndex: number) => {
    e.preventDefault();
    const draggedItemIndex = parseInt(e.dataTransfer.getData("draggedItemIndex"), 10);
    e.currentTarget.style.opacity = '1';


    if (draggedItemIndex === droppedOnIndex) return;

    const items = [...rankedItems];
    const [draggedItem] = items.splice(draggedItemIndex, 1);
    items.splice(droppedOnIndex, 0, draggedItem);

    setRankedItems(items);
    onChange(question.id, items.map(item => item.id));
  };


  const isRTL = lang === 'ar';

  switch (question.type) {
    case 'single':
      return (
        <div dir={isRTL ? "rtl" : "ltr"}>
          <p className="mb-3">{text}</p>
          {options?.map(option => (
            <div key={option.id} className={cn("flex items-center gap-3 mb-2", isRTL ? "flex-row-reverse text-right" : "flex-row")}>
              <input
                type="radio"
                id={`${question.id}-${option.id}`}
                name={question.id}
                value={option.id}
                checked={currentAnswer === option.id}
                onChange={(e) => onChange(question.id, e.target.value)}
                className="flex-shrink-0"
              />
              <label htmlFor={`${question.id}-${option.id}`} className="cursor-pointer flex-1">{option.text}</label>
            </div>
          ))}
        </div>
      );
    case 'multi':
      return (
        <div dir={isRTL ? "rtl" : "ltr"}>
          <p className="mb-3">{text}</p>
          {options?.map(option => (
            <div key={option.id} className={cn("flex items-center gap-3 mb-2", isRTL ? "flex-row-reverse text-right" : "flex-row")}>
              <input
                type="checkbox"
                id={`${question.id}-${option.id}`}
                value={option.id}
                checked={Array.isArray(currentAnswer) && currentAnswer.includes(option.id)}
                onChange={(e) => {
                  const currentVal = Array.isArray(currentAnswer) ? currentAnswer : [];
                  if (e.target.checked) {
                    onChange(question.id, [...currentVal, option.id]);
                  } else {
                    onChange(question.id, currentVal.filter((id: string) => id !== option.id));
                  }
                }}
                className="flex-shrink-0"
              />
              <label htmlFor={`${question.id}-${option.id}`} className="cursor-pointer flex-1">{option.text}</label>
            </div>
          ))}
        </div>
      );
    case 'rank':
      return (
        <div dir={isRTL ? "rtl" : "ltr"}>
          <p className="mb-3">{text} {question.type === 'rank' && <span className={cn("text-sm text-gray-500", isRTL ? "mr-1" : "ml-1")}>{t('quiz.dragReorderHint')}</span>}</p>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {rankedItems.map((item, index) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                onDragEnd={onDragEnd}
                className={cn("flex items-center mb-2", isRTL ? "flex-row-reverse text-right" : "flex-row")}
                style={{
                    padding: '8px', border: '1px solid #ccc',
                    cursor: 'grab', backgroundColor: '#f9f9f9',
                    transition: 'opacity 0.2s ease-in-out'
                }}
              >
                <span className={cn("font-bold", isRTL ? "ml-3" : "mr-3")}>{index + 1}.</span>
                {item.text}
              </li>
            ))}
          </ul>
          <p style={{fontSize: '0.8em', color: '#555'}}>
            {t('quiz.simplifiedDragDropNote')}
          </p>
        </div>
      );
    case 'slider':
      return (
        <div className="py-4"> {/* Added padding for spacing, similar to AIMajorRecommender */}
          <div className="flex justify-between mb-2">
            {/* Display min/max if available, or remove if not desired */}
            {question.min !== undefined && <span>{question.min}</span>}
            <span className="text-lg font-semibold text-blue-600">
              {typeof currentAnswer === 'number' ? currentAnswer : (question.defaultValue ?? '')}
            </span>
            {question.max !== undefined && <span>{question.max}</span>}
          </div>
          <Slider
            id={question.id}
            min={question.min ?? 0}
            max={question.max ?? 100} // Default max if not provided, adjust as needed
            step={question.step ?? 1}
            defaultValue={[question.defaultValue ?? 0]} // Default value if not provided
            value={typeof currentAnswer === 'number' ? [currentAnswer] : [question.defaultValue ?? 0]}
            onValueChange={(valueArray) => onChange(question.id, valueArray[0])}
            className="w-full"
          />
           {/* The label for the question text itself. The values above are for min/max/current value display. */}
          <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mt-2">
            {text}
          </label>
        </div>
      );
    default:
      return <p>{t('quiz.unsupportedQuestionType', { type: question.type })}</p>;
  }
};

export default QuestionRenderer;
