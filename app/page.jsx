"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  const [limit, setLimit] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(1000);

  const handleTextChange = (e) => {
    let inputText = e.target.value;
    if (setLimit && inputText.length > characterLimit) return;
    setText(inputText);
  };

  const getWordCount = () => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const words = getWordCount();
    const minutes = words / wordsPerMinute;

    return minutes < 1 ? "Less than a minute" : `${Math.ceil(minutes)} min`;
  };

  const getCharacterCount = () => {
    return excludeSpaces ? text.replace(/\s/g, "").length : text.length;
  };

  const getSentenceCount = () => {
    return text.split(/[.!?]+/).filter(Boolean).length;
  };

  const getLetterDensity = () => {
    const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, "");
    const frequency = {};

    for (let char of lettersOnly) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    return frequency;
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex w-full max-w-2xl flex-wrap items-center justify-between">
        <h1 className="text-3xl font-bold">Character Counter</h1>
        {/* Dark mode toggle */}
      </div>

      <Textarea
        placeholder="Start typing..."
        value={text}
        onChange={handleTextChange}
        className="h-40 w-full border border-neutral-800 p-4 focus-visible:ring-neutral-700"
      />

      <div className="grid gap-4 sm:flex">
        <Label>
          <Switch checked={excludeSpaces} onCheckedChange={setExcludeSpaces} />
          Exclude Spaces
        </Label>

        <Label>
          <Switch checked={limit} onCheckedChange={setLimit} />
          Set character limit
        </Label>

        {limit && (
          <Input
            type="number"
            value={characterLimit}
            min="1"
            onChange={(e) => setCharacterLimit(Number(e.target.value))}
            className="w-20"
          />
        )}

        {limit && text.length >= characterLimit && (
          <CardDescription className="text-rose-500">
            Character limit reached!
          </CardDescription>
        )}

        <CardDescription>{getReadingTime()} read</CardDescription>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Characters</CardTitle>
            <CardDescription>{getCharacterCount()}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Word Count</CardTitle>
            <CardDescription>{getWordCount()}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentence Count</CardTitle>
            <CardDescription>{getSentenceCount()}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="w-full">
        <h2 className="text-lg font-semibold">Letter Density</h2>

        {Object.keys(getLetterDensity()).length > 0 ? (
          <div className="mt-3 flex flex-wrap items-center justify-start gap-4">
            {Object.entries(getLetterDensity()).map(([letter, number]) => (
              <div
                key={letter}
                className="w-20 rounded-md bg-neutral-200 p-2 text-center"
              >
                <span className="font-bold text-neutral-900">
                  {letter.toUpperCase()}
                </span>
                <CardDescription>{number}</CardDescription>
              </div>
            ))}
          </div>
        ) : (
          <CardDescription>
            No characters found. Start typing to see letter density
          </CardDescription>
        )}
      </div>
    </div>
  );
}
