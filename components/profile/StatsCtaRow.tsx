"use client";
import React from "react";

export default function StatsCtaRow({ stats, activeTab, onTabChange }: {
  stats: { label: string, value: number, icon: string, tabValue: string }[],
  activeTab: string,
  onTabChange: (tab: string) => void
}) {
  return (
    <section className="max-w-4xl mx-auto flex flex-row justify-center my-8 px-4 h-[72px]">
      {stats.map((stat, i) => (
        <button
          key={stat.tabValue}
          onClick={() => onTabChange(stat.tabValue)}
          className={'flex-1 text-center py-5 px-2 text-lg md:text-xl font-unbounded font-bold border-black border-r last:border-r-0 hover:underline transition-all duration-700 cursor-pointer h-full flex flex-col items-center justify-center'}
          style={{ minWidth: 0 }}
          type="button"
        >
          <span className="text-2xl mb-1">{stat.icon} <span className="align-middle text-lg">{stat.value}</span></span>
          <span className="block text-base mt-1">{stat.label}</span>
        </button>
      ))}
    </section>
  );
} 