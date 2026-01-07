import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

const interests = ['Путешествия', 'Музыка', 'Спорт', 'Кино', 'Технологии', 'Книги', 'Искусство', 'Танцы', 'Йога', 'Природа', 'Фотография', 'Кофе'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    city: '',
    bio: '',
    interests: [] as string[],
    goal: '',
  });

  const progress = (step / 4) * 100;

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Registration data:', formData);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Dating Platform
          </h1>
          <p className="text-xl text-white/80">Создай свой профиль за 4 шага</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-scale-in">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Шаг {step} из 4
                </span>
                <span className="text-sm font-bold gradient-text">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Основная информация
                  </h2>
                  <p className="text-muted-foreground">Расскажи нам о себе</p>
                </div>

                <div>
                  <Label htmlFor="name" className="text-base font-semibold">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Как тебя зовут?"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="твой@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-base font-semibold">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Минимум 8 символов"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-2 h-12"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full h-12 gradient-bg text-white text-lg hover-scale" onClick={nextStep}>
                    Продолжить
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Немного о тебе
                  </h2>
                  <p className="text-muted-foreground">Помоги нам подобрать подходящие анкеты</p>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Пол</Label>
                  <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'male' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <RadioGroupItem value="male" id="male" />
                        <Icon name="User" size={24} />
                        <span className="font-medium">Мужской</span>
                      </label>
                      <label className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.gender === 'female' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <RadioGroupItem value="female" id="female" />
                        <Icon name="User" size={24} />
                        <span className="font-medium">Женский</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-base font-semibold">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="18"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">Город</Label>
                    <Input
                      id="city"
                      placeholder="Москва"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-2 h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-base font-semibold">О себе</Label>
                  <Textarea
                    id="bio"
                    placeholder="Расскажи немного о себе, своих увлечениях..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-12" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                  <Button className="flex-1 h-12 gradient-bg text-white hover-scale" onClick={nextStep}>
                    Продолжить
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Твои интересы
                  </h2>
                  <p className="text-muted-foreground">Выбери то, что тебе нравится (минимум 3)</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <div key={interest}>
                      <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all hover-scale ${formData.interests.includes(interest) ? 'border-primary gradient-bg text-white' : 'border-border hover:border-primary/50'}`}>
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={() => toggleInterest(interest)}
                          className="hidden"
                        />
                        <span className="font-medium text-center">{interest}</span>
                      </label>
                    </div>
                  ))}
                </div>

                {formData.interests.length > 0 && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-gradient-magenta/10 to-gradient-purple/10 animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-2">Выбрано:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} className="gradient-bg text-white">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-12" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                  <Button 
                    className="flex-1 h-12 gradient-bg text-white hover-scale" 
                    onClick={nextStep}
                    disabled={formData.interests.length < 3}
                  >
                    Продолжить
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold gradient-text mb-2">
                    Цель знакомства
                  </h2>
                  <p className="text-muted-foreground">Что ты ищешь?</p>
                </div>

                <RadioGroup value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                  <div className="space-y-3">
                    <label className={`flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover-scale ${formData.goal === 'friendship' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <RadioGroupItem value="friendship" id="friendship" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Users" size={20} className="text-primary" />
                          <span className="font-semibold">Дружба и общение</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Ищу новых друзей для интересного времяпрепровождения</p>
                      </div>
                    </label>

                    <label className={`flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover-scale ${formData.goal === 'dating' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <RadioGroupItem value="dating" id="dating" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Heart" size={20} className="text-accent" />
                          <span className="font-semibold">Романтические отношения</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Ищу романтику и приятные встречи</p>
                      </div>
                    </label>

                    <label className={`flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover-scale ${formData.goal === 'serious' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <RadioGroupItem value="serious" id="serious" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="Sparkles" size={20} className="text-secondary" />
                          <span className="font-semibold">Серьёзные отношения</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Ищу вторую половинку для долгосрочных отношений</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>

                <div className="p-6 rounded-xl gradient-bg text-white animate-fade-in">
                  <div className="flex items-start gap-4">
                    <Icon name="CheckCircle" size={32} className="flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Почти готово!</h3>
                      <p className="text-sm text-white/80">
                        После регистрации мы подберём для тебя анкеты с высокой совместимостью на основе твоих интересов и предпочтений
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 h-12" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={20} className="mr-2" />
                    Назад
                  </Button>
                  <Button className="flex-1 h-12 gradient-bg text-white hover-scale" onClick={handleSubmit}>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Создать профиль
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-white/80">
            Уже есть аккаунт?{' '}
            <button className="font-semibold text-white hover:underline">
              Войти
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
