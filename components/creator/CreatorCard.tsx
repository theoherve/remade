'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    location: string;
    bio: string;
    followersCount: number;
    productsCount: number;
    rating: number;
    verified: boolean;
    pageSettings: {
      accentColor?: string;
    };
  };
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const accentStyle = {
    backgroundColor: creator.pageSettings.accentColor || '#9b87f5',
  };

  return (
    <Link href={`/creator/${creator.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-lg">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold">{creator.name}</h3>
              {creator.verified && (
                <Badge style={accentStyle}>Vérifié</Badge>
              )}
            </div>
            
            <span className="text-gray-500 mb-3">@{creator.username}</span>
            
            <div className="flex items-center gap-1 text-gray-500 mb-3">
              <MapPin size={16} />
              <span className="text-sm">{creator.location}</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{creator.bio}</p>
            
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-bold">{creator.followersCount}</span>
                <span className="text-gray-500">Abonnés</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{creator.productsCount}</span>
                <span className="text-gray-500">Créations</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{creator.rating}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CreatorCard; 