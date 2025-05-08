'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Award } from 'lucide-react';

interface CreatorHeaderProps {
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    banner: string;
    location: string;
    since: string;
    bio: string;
    followersCount: number;
    productsCount: number;
    rating: number;
    verified: boolean;
    pageSettings: {
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      fontFamily?: string;
      stickers?: Array<{
        id: number;
        content: string;
        position: {
          x: number;
          y: number;
        };
        rotation: number;
        scale: number;
      }>;
    };
  };
}

const CreatorHeader: React.FC<CreatorHeaderProps> = ({ creator }) => {
  const { pageSettings } = creator;
  
  const headerStyle = {
    backgroundColor: pageSettings.backgroundColor || '#ffffff',
    color: pageSettings.textColor || '#000000',
    fontFamily: pageSettings.fontFamily || 'inherit',
  };
  
  const accentStyle = {
    backgroundColor: pageSettings.accentColor || '#9b87f5',
  };
  
  return (
    <header style={headerStyle}>
      <div className="relative">
        {/* Banner Image */}
        <div className="h-48 md:h-64 overflow-hidden">
          <img 
            src={creator.banner} 
            alt={`${creator.name} banner`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Profile Info Overlay */}
        <div className="container relative -mt-16 md:-mt-20">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold" style={{ color: pageSettings.textColor || 'inherit' }}>
                    {creator.name}
                    {creator.verified && (
                      <Award className="inline-block ml-2 text-blue-500" size={20} />
                    )}
                  </h1>
                  <span className="text-gray-500">@{creator.username}</span>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500">{creator.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    <span className="text-sm text-gray-500">Membre depuis {creator.since}</span>
                  </div>
                </div>
                
                <p className="mb-4 text-gray-700 max-w-2xl">{creator.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{creator.followersCount}</span>
                    <span className="text-gray-500 text-sm">Abonnés</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{creator.productsCount}</span>
                    <span className="text-gray-500 text-sm">Créations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{creator.rating}</span>
                    <span className="text-gray-500 text-sm">Note</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge style={accentStyle}>Vestes</Badge>
                  <Badge style={accentStyle}>Customisation</Badge>
                  <Badge style={accentStyle}>Vintage</Badge>
                  <Badge style={accentStyle}>Coloré</Badge>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button style={{ backgroundColor: pageSettings.accentColor || '#9b87f5' }}>
                  Suivre
                </Button>
                <Button variant="outline" style={{ borderColor: pageSettings.accentColor || '#9b87f5', color: pageSettings.accentColor || '#9b87f5' }}>
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CreatorHeader;
