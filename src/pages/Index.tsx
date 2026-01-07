import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Profile {
  id: number;
  name: string;
  age: number;
  city: string;
  bio: string;
  interests: string[];
  image: string;
  compatibility: number;
  gender: string;
}

interface Filters {
  ageRange: [number, number];
  city: string;
  interests: string[];
  gender: string;
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
    gender: 'female',
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
    gender: 'male',
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
    gender: 'female',
  },
];

const allInterests = ['Путешествия', 'Музыка', 'Спорт', 'Кино', 'Технологии', 'Книги', 'Искусство', 'Танцы', 'Йога', 'Природа', 'Фотография', 'Кофе'];
const cities = ['Все города', 'Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<number[]>([]);
  const [matches, setMatches] = useState<number[]>([]);
  const [animation, setAnimation] = useState('');
  const [filters, setFilters] = useState<Filters>({
    ageRange: [18, 50],
    city: 'Все города',
    interests: [],
    gender: 'all',
  });
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);

  const applyFilters = () => {
    const filtered = mockProfiles.filter((profile) => {
      const ageMatch = profile.age >= filters.ageRange[0] && profile.age <= filters.ageRange[1];
      const cityMatch = filters.city === 'Все города' || profile.city === filters.city;
      const genderMatch = filters.gender === 'all' || profile.gender === filters.gender;
      const interestsMatch = filters.interests.length === 0 || 
        filters.interests.some((interest) => profile.interests.includes(interest));
      
      return ageMatch && cityMatch && genderMatch && interestsMatch;
    });
    setFilteredProfiles(filtered);
    setCurrentIndex(0);
  };

  const currentProfile = filteredProfiles[currentIndex] || mockProfiles[0];

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
    if (currentIndex < filteredProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const toggleInterest = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              Dating Platform
            </h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" className="rounded-full gradient-bg hover-scale shadow-xl">
                  <Icon name="SlidersHorizontal" size={24} className="text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle className="text-2xl gradient-text">Фильтры поиска</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Возраст: {filters.ageRange[0]} - {filters.ageRange[1]}</Label>
                    <Slider
                      min={18}
                      max={60}
                      step={1}
                      value={filters.ageRange}
                      onValueChange={(value) => setFilters({ ...filters, ageRange: value as [number, number] })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Город</Label>
                    <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Пол</Label>
                    <Select value={filters.gender} onValueChange={(value) => setFilters({ ...filters, gender: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="male">Мужской</SelectItem>
                        <SelectItem value="female">Женский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Интересы</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {allInterests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={filters.interests.includes(interest)}
                            onCheckedChange={() => toggleInterest(interest)}
                          />
                          <Label htmlFor={interest} className="text-sm cursor-pointer">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full gradient-bg text-white" onClick={applyFilters}>
                    <Icon name="Search" size={20} className="mr-2" />
                    Применить фильтры
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-xl text-white/90 font-light">
            Найди свою половинку с умным алгоритмом совместимости
          </p>
          {filters.interests.length > 0 || filters.city !== 'Все города' ? (
            <div className="mt-4 flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                Найдено: {filteredProfiles.length}
              </Badge>
            </div>
          ) : null}
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