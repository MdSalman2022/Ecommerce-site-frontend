import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  onGenerate?: () => Promise<void>;
  isGenerating?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function TagsInput({ 
  value = [], 
  onChange, 
  onGenerate, 
  isGenerating = false,
  placeholder = "Add a tag...", 
  label,
  className 
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleRunningInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      // If user pastes comma-separated values, split them
      const val = e.target.value;
      if (val.includes(',')) {
          const parts = val.split(',');
          // Last part stays in input, others become tags
          const lastPart = parts.pop(); 
          parts.forEach(part => addTag(part));
          setInputValue(lastPart || '');
      } else {
          setInputValue(val);
      }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
            <Label>{label}</Label>
            {onGenerate && (
                 <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="h-6 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                 >
                     {isGenerating ? (
                         <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                     ) : (
                         <Sparkles className="w-3 h-3 mr-1" />
                     )}
                     {isGenerating ? 'Generating...' : 'Auto-Generate Tags'}
                 </Button>
            )}
        </div>
      )}
      
      <div className="min-h-[2.5rem] p-2 rounded-md border border-input bg-background flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {value.map((tag, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1 bg-secondary text-secondary-foreground text-sm px-2.5 py-0.5 rounded-full animate-in fade-in zoom-in-50 duration-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </span>
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={handleRunningInput}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent outline-none text-sm min-w-[120px] h-7"
        />
      </div>
      <p className="text-[0.8rem] text-muted-foreground">
        Separate tags with commas or press Enter.
      </p>
    </div>
  );
}
