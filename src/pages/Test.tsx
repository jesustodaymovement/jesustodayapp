import {
  ArrowRight, Users, CheckCircle, Play, Heart, MessageCircle, Send, Bookmark,
  ChevronLeft, ChevronRight, Sparkles, Ear, TrendingUp, Eye, Menu, X, Quote,
  Church, Calendar, ShieldX, HelpCircle, Instagram, Facebook, Youtube, Mail,
  Video, QrCode, Share2
} from 'lucide-react';

const icons = [
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'Users', Icon: Users },
  { name: 'CheckCircle', Icon: CheckCircle },
  { name: 'Play', Icon: Play },
  { name: 'Heart', Icon: Heart },
  { name: 'MessageCircle', Icon: MessageCircle },
  { name: 'Send', Icon: Send },
  { name: 'Bookmark', Icon: Bookmark },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'Sparkles', Icon: Sparkles },
  { name: 'Ear', Icon: Ear },
  { name: 'TrendingUp', Icon: TrendingUp },
  { name: 'Eye', Icon: Eye },
  { name: 'Menu', Icon: Menu },
  { name: 'X', Icon: X },
  { name: 'Quote', Icon: Quote },
  { name: 'Church', Icon: Church },
  { name: 'Calendar', Icon: Calendar },
  { name: 'ShieldX', Icon: ShieldX },
  { name: 'HelpCircle', Icon: HelpCircle },
  { name: 'Instagram', Icon: Instagram },
  { name: 'Facebook', Icon: Facebook },
  { name: 'Youtube', Icon: Youtube },
  { name: 'Mail', Icon: Mail },
  { name: 'Video', Icon: Video },
  { name: 'QrCode', Icon: QrCode },
  { name: 'Share2', Icon: Share2 },
];

const Test = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Website Iconen</h1>
      <p className="text-muted-foreground mb-8">Alle iconen gebruikt op de website — weergegeven op 1080×1080 schaal</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="aspect-square rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-4 p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300"
          >
            <Icon className="w-2/3 h-2/3 text-primary" />
            <span className="text-sm font-medium text-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
