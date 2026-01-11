"use client";
import React from "react";
import "../professorCSS.css";
import DoubtCard from "../DoubtCard/DoubtCard";
import { Duvida } from "@/services/mockDatabase";


interface DoubtQueueColumnProps {
  title: string;
  doubts: Duvida[];
}

export default function DoubtQueueColumn({ title, doubts }: DoubtQueueColumnProps) {
  return (
    <div className="column">
      <h2 className="column-title">
        {title} <span className="column-count">({doubts.length})</span>
      </h2>
      <div className="column-content">
        {doubts.map((doubt) => (
          <DoubtCard key={doubt.id} doubt={doubt} />
        ))}
      </div>
    </div>
  );
}