"use client";
import React, { useState } from "react";
import { HiPlus, HiOutlineX } from "react-icons/hi";
import SmartButton from "_components/SmartButton";
import SmartGroup from "_components/SmartGroup";
import { Query } from "_utils/types";
import useEscapeKeyListener from "_hooks/useEscapeListener";
import SmartSearch from "_components/SmartSearch";

interface SmartFormProps {
  minQueries?: number;
  maxQueries?: number;
  onSubmit?: (data: Query[]) => Promise<void>;
}

export const SmartForm: React.FC<SmartFormProps> = ({
  minQueries = 1,
  maxQueries = 1,
  onSubmit,
}) => {
  const [queries, setQueries] = useState<Query[]>([{ param: "" }]);

  useEscapeKeyListener();

  const handleAddQuery = () => {
    console.debug("Adding query");
    setQueries([...queries, { param: "" }]);
  };

  const handleRemoveQuery = (index: number) => {
    console.debug("Removing query at index: ", index);
    setQueries(queries.filter((_, i) => i !== index));
  };

  const handleClearQueries = () => {
    console.debug("Clearing queries");
    setQueries([]);
  };

  const handleChange = (index: number, data: Query) => {
    console.debug("Query changed at index", index, ": ", data);
    setQueries((prev) =>
      prev.map((query, idx) => (idx === index ? data : query)),
    );
  };

  return (
    <form className="panel-wrapper">
      <SmartGroup>
        {minQueries > 1 && (
          <SmartButton
            Icon={HiPlus}
            onClick={handleAddQuery}
            disabled={queries.length >= maxQueries}
          />
        )}
        {minQueries >= 1 && (
          <SmartButton
            Icon={HiOutlineX}
            onClick={handleClearQueries}
            disabled={queries.length <= maxQueries}
            colorTheme="minimal"
            className="place-self-end  self-end justify-self-end"
          />
        )}
      </SmartGroup>
      {queries.map((query, index) => {
        return (
          <SmartGroup key={index}>
            <SmartSearch
              onSelect={(query: Query) => handleChange(index, query)}
            />
          </SmartGroup>
        );
      })}
      {onSubmit && !!queries.length && (
        <SmartGroup>
          <SmartButton onClick={() => onSubmit(queries)} />
        </SmartGroup>
      )}
    </form>
  );
};

export default SmartForm;
