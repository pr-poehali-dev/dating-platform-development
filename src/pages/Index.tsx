import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  bio: string;
  interests: string[];
  image: string;
  compatibility: number;
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 26,
    city: 'Москва',
    bio: 'Люблю путешествия, хорошую музыку и вечерние прогулки по городу',
    interests: ['Путешествия', 'Музыка', 'Фотография', 'Кофе'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
    compatibility: 87,
  },
  {
    id: 2,
    name: 'Максим',
    age: 29,
    city: 'Санкт-Петербург',
    bio: 'Увлекаюсь спортом, кино и технологиями. Ищу интересное общение',
    interests: ['Спорт', 'Кино', 'Технологии', 'Книги'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    compatibility: 92,
  },
  {
    id: 3,
    name: 'Екатерина',
    age: 24,
    city: 'Казань',
    bio: 'Творческая личность, обожаю искусство и танцы',
    interests: ['Искусство', 'Танцы', 'Йога', 'Природа'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
    compatibility: 78,
  },
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [animation, setAnimation] = useState('');

  const currentProfile = mockProfiles[currentIndex];

  const handleLike = () => {
    setAnimation('animate-scale-in');
    setTimeout(() => {
      setLiked([...liked, currentProfile.id]);
      if (Math.random() > 0.5) {
        setMatches([...matches, currentProfile.id]);
      }
      nextProfile();
      setAnimation('');
    }, 300);
  };

  const handlePass = () => {
    setAnimation('animate-fade-in');
    setTimeout(() => {
      nextProfile();
      setAnimation('');
    }, 300);
  };

  const nextProfile = () => {
    if (currentIndex < mockProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Dating Platform
          </h1>
          <p className="text-xl text-white/90 font-light">
            Найди свою половинку с умным алгоритмом совместимости
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="lg:w-2/3 animate-slide-up">
            <Card className={`overflow-hidden border-0 shadow-2xl ${animation}`}>
              <div className="relative h-[500px]">
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 right-4">
                  <Badge className="gradient-bg text-white text-lg px-4 py-2 shadow-lg">
                    <Icon name="Heart" size={16} className="mr-2" />
                    {currentProfile.compatibility}% совместимость
                  </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-4xl font-bold mb-2">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="MapPin" size={18} />
                    <span className="text-lg">{currentProfile.city}</span>
                  </div>
                  <p className="text-lg mb-4 text-white/90">{currentProfile.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProfile.interests.map((interest, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-16 h-16 border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-110 transition-all"
                      onClick={handlePass}
                    >
                      <Icon name="X" size={28} className="text-white" />
                    </Button>
                    <Button
                      size="lg"
                      className="rounded-full w-20 h-20 gradient-bg shadow-2xl hover:scale-110 transition-all"
                      onClick={handleLike}
                    >
                      <Icon name="Heart" size={32} className="text-white" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full w-16 h-16 border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-110 transition-all"
                    >
                      <Icon name="Star" size={28} className="text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:w-1/3 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6 border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Совместимость
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Общие интересы</span>
                    <span className="text-sm font-bold text-primary">{currentProfile.compatibility}%</span>
                  </div>
                  <Progress value={currentProfile.compatibility} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Активность</span>
                    <span className="text-sm font-bold text-secondary">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Цели знакомства</span>
                    <span className="text-sm font-bold text-accent">90%</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-xl bg-white/95 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Статистика
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gradient-magenta/10 to-gradient-purple/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                      <Icon name="Heart" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Лайков</p>
                      <p className="text-2xl font-bold">{liked.length}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gradient-purple/10 to-gradient-blue/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gradient-purple to-gradient-blue flex items-center justify-center">
                      <Icon name="Zap" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Совпадений</p>
                      <p className="text-2xl font-bold">{matches.length}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gradient-blue/10 to-gradient-magenta/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gradient-blue to-gradient-magenta flex items-center justify-center">
                      <Icon name="MessageCircle" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Сообщений</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-xl gradient-bg text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Icon name="Crown" size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Premium подписка</h4>
                  <p className="text-sm text-white/80 mb-4">
                    Получи неограниченные лайки и увеличь шансы на матчинг в 3 раза
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90 font-bold">
                    Попробовать Premium
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-center gap-8 text-white/80">
            <button className="flex flex-col items-center gap-2 hover:text-white transition-colors hover-scale">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Users" size={24} />
              </div>
              <span className="text-sm">Анкеты</span>
            </button>
            <button className="flex flex-col items-center gap-2 hover:text-white transition-colors hover-scale">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon name="MessageCircle" size={24} />
              </div>
              <span className="text-sm">Чаты</span>
            </button>
            <button className="flex flex-col items-center gap-2 hover:text-white transition-colors hover-scale">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Bookmark" size={24} />
              </div>
              <span className="text-sm">Избранное</span>
            </button>
            <button className="flex flex-col items-center gap-2 hover:text-white transition-colors hover-scale">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Settings" size={24} />
              </div>
              <span className="text-sm">Настройки</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
