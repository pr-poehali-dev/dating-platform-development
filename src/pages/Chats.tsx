import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  timestamp: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    lastMessage: 'Привет! Как дела? 😊',
    timestamp: '5 мин',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Максим',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    lastMessage: 'Отличная идея! Давай встретимся',
    timestamp: '1 час',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Екатерина',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    lastMessage: 'Спасибо за вчерашний вечер!',
    timestamp: '3 часа',
    unread: 1,
    online: false,
  },
];

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как твои дела?', sent: false, timestamp: '14:32' },
  { id: 2, text: 'Привет! Всё отлично, спасибо 😊', sent: true, timestamp: '14:33' },
  { id: 3, text: 'Хочешь сходить куда-нибудь на выходных?', sent: false, timestamp: '14:35' },
  { id: 4, text: 'Да, с удовольствием! Может в кино?', sent: true, timestamp: '14:37' },
  { id: 5, text: 'Отличная идея! В какой кинотеатр пойдём?', sent: false, timestamp: '14:40' },
];

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sent: true,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Сообщения
          </h1>
          <p className="text-white/80">Общайся с теми, кто тебе интересен</p>
        </header>

        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm animate-scale-in">
            <div className="flex h-[700px]">
              <div className="w-1/3 border-r border-border">
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск чатов..."
                      className="pl-10 bg-muted/50"
                    />
                  </div>
                </div>

                <ScrollArea className="h-[calc(700px-73px)]">
                  {mockChats.map((chat, index) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-all border-b border-border animate-slide-up ${
                        selectedChat.id === chat.id ? 'bg-muted' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={chat.avatar} />
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 text-left overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <Badge className="gradient-bg text-white">{chat.unread}</Badge>
                      )}
                    </button>
                  ))}
                </ScrollArea>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={selectedChat.avatar} />
                          <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                        </Avatar>
                        {selectedChat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{selectedChat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.online ? 'онлайн' : 'был(а) недавно'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="hover-scale">
                        <Icon name="Phone" size={20} />
                      </Button>
                      <Button size="icon" variant="ghost" className="hover-scale">
                        <Icon name="Video" size={20} />
                      </Button>
                      <Button size="icon" variant="ghost" className="hover-scale">
                        <Icon name="MoreVertical" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex items-end gap-2 animate-slide-up ${
                          message.sent ? 'flex-row-reverse' : 'flex-row'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {!message.sent && (
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={selectedChat.avatar} />
                            <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.sent
                              ? 'gradient-bg text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <span
                            className={`text-xs ${
                              message.sent ? 'text-white/70' : 'text-muted-foreground'
                            }`}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <Icon name="Image" size={20} />
                    </Button>
                    <Input
                      placeholder="Напишите сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" variant="ghost" className="hover-scale">
                      <Icon name="Smile" size={20} />
                    </Button>
                    <Button
                      size="icon"
                      className="gradient-bg hover-scale"
                      onClick={handleSendMessage}
                    >
                      <Icon name="Send" size={20} className="text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            onClick={() => window.history.back()}
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад к анкетам
          </Button>
        </div>
      </div>
    </div>
  );
}
