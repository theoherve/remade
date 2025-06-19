"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import StatsCtaRow from './StatsCtaRow';

export default function ProfileTabs({ stats }: { stats: { label: string, value: number, icon: string, tabValue: string }[] }) {
  const [activeTab, setActiveTab] = useState('favoris');

  return (
    <section className="max-w-4xl mx-auto px-4">
      <StatsCtaRow stats={stats} activeTab={activeTab} onTabChange={setActiveTab} />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex justify-center">
          <TabsTrigger value="favoris">Mes favoris</TabsTrigger>
          <TabsTrigger value="articles">Mes articles en vente</TabsTrigger>
          <TabsTrigger value="commandes">Mes commandes</TabsTrigger>
        </TabsList>
        <TabsContent value="favoris">
          <div className="py-6 text-neutral-700 font-unbounded">Vos articles favoris s'afficheront ici.</div>
        </TabsContent>
        <TabsContent value="articles">
          <div className="py-6 text-neutral-700 font-unbounded">Vos articles en vente s'afficheront ici.</div>
        </TabsContent>
        <TabsContent value="commandes">
          <div className="py-6 text-neutral-700 font-unbounded">Vos commandes s'afficheront ici.</div>
        </TabsContent>
      </Tabs>
    </section>
  );
} 