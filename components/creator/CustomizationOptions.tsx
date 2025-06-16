'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette, Brush, Sticker, Text } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface CustomizationOptionsProps {
  onUpdateSettings: (settings: any) => void;
  currentSettings: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontFamily: string;
    stickers: any[];
  };
}

const STICKER_OPTIONS = ['✨', '💖', '🌟', '🎨', '👕', '👚', '👗', '🧵', '✂️', '🧶', '🌈', '🦄', '🌻', '🌹', '🍃'];
const FONT_OPTIONS = ['Montserrat', 'Caveat', 'Indie Flower'];

const CustomizationOptions: React.FC<CustomizationOptionsProps> = ({
  onUpdateSettings,
  currentSettings
}) => {
  const [settings, setSettings] = useState(currentSettings);
  
  const handleColorChange = (type: string, color: string) => {
    const newSettings = { ...settings, [type]: color };
    setSettings(newSettings);
    onUpdateSettings(newSettings);
  };
  
  const handleFontChange = (font: string) => {
    const newSettings = { ...settings, fontFamily: font };
    setSettings(newSettings);
    onUpdateSettings(newSettings);
  };
  
  const addSticker = (emoji: string) => {
    const newSticker = {
      id: Date.now(),
      content: emoji,
      position: {
        x: Math.floor(Math.random() * 80) + 10, // 10-90%
        y: Math.floor(Math.random() * 80) + 10, // 10-90%
      },
      rotation: Math.floor(Math.random() * 40) - 20, // -20 to 20 degrees
      scale: 1,
    };
    
    const newSettings = {
      ...settings,
      stickers: [...settings.stickers, newSticker]
    };
    
    setSettings(newSettings);
    onUpdateSettings(newSettings);
  };
  
  const removeSticker = (id: number) => {
    const newSettings = {
      ...settings,
      stickers: settings.stickers.filter(s => s.id !== id)
    };
    
    setSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold mb-4">Personnaliser ma page</h3>
      
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette size={18} /> Couleurs
          </TabsTrigger>
          <TabsTrigger value="fonts" className="flex items-center gap-2">
            <Text size={18} /> Polices
          </TabsTrigger>
          <TabsTrigger value="stickers" className="flex items-center gap-2">
            <Sticker size={18} /> Stickers
          </TabsTrigger>
          <TabsTrigger value="styles" className="flex items-center gap-2">
            <Brush size={18} /> Styles
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bgColor">Couleur de fond</Label>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: settings.backgroundColor }}
                ></div>
                <Input 
                  id="bgColor"
                  type="color" 
                  value={settings.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="textColor">Couleur du texte</Label>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: settings.textColor }}
                ></div>
                <Input 
                  id="textColor"
                  type="color" 
                  value={settings.textColor}
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="accentColor">Couleur d'accent</Label>
              <div className="flex items-center gap-2 mt-2">
                <div 
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: settings.accentColor }}
                ></div>
                <Input 
                  id="accentColor"
                  type="color" 
                  value={settings.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <h4 className="font-medium mb-2">Préréglages de couleurs</h4>
            <div className="flex flex-wrap gap-2">
              {['#9b87f5', '#D6BCFA', '#4FD1C5', '#F56565', '#ECC94B', '#FEF7CD', '#38B2AC', '#ED64A6', '#9F7AEA', '#667EEA'].map((color) => (
                <button
                  key={color}
                  className="w-10 h-10 rounded-full border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange('accentColor', color)}
                ></button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="fonts" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium mb-2">Choisir une police</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FONT_OPTIONS.map((font) => (
                <Button
                  key={font}
                  variant={settings.fontFamily === font ? 'default' : 'outline'}
                  className={`h-20 text-xl ${font === 'Montserrat' ? 'font-modern' : font === 'Caveat' ? 'font-handwriting' : 'font-quirky'}`}
                  onClick={() => handleFontChange(font)}
                  style={settings.fontFamily === font ? { backgroundColor: settings.accentColor } : {}}
                >
                  {font}
                </Button>
              ))}
            </div>
            
            <div className="pt-4">
              <Label>Taille du texte</Label>
              <div className="pt-2">
                <Slider defaultValue={[100]} min={80} max={120} step={5} />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stickers" className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium mb-2">Ajouter des stickers à votre page</h4>
            <div className="emoji-selector">
              {STICKER_OPTIONS.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  className="text-2xl"
                  onClick={() => addSticker(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
            
            {settings.stickers.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Stickers ajoutés</h4>
                <div className="flex flex-wrap gap-2">
                  {settings.stickers.map((sticker: any) => (
                    <div key={sticker.id} className="relative">
                      <span className="text-2xl">{sticker.content}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center p-0"
                        onClick={() => removeSticker(sticker.id)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="styles" className="mt-4">
          <div className="space-y-4">
            <div>
              <Label>Bordures</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <Button variant="outline" className="h-20">Aucune</Button>
                <Button variant="outline" className="h-20 border-2 border-dashed">Pointillés</Button>
                <Button variant="outline" className="h-20 border-4">Épais</Button>
              </div>
            </div>
            
            <div>
              <Label>Arrière-plan</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <Button variant="outline" className="h-20">Uni</Button>
                <Button variant="outline" className="h-20 bg-gradient-to-r from-primary/30 to-upcycle-teal/30">Dégradé</Button>
                <Button variant="outline" className="h-20 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')]">Texture</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button 
          className="w-full md:w-auto"
          style={{ backgroundColor: settings.accentColor }}
        >
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};

export default CustomizationOptions;
