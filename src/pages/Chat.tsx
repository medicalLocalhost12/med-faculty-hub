
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, User, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isCurrentUser: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  unread: number;
  active: boolean;
}

const SAMPLE_CONTACTS: ChatContact[] = [
  {
    id: '1',
    name: 'دکتر سارا کریمی',
    role: 'گروه قلب',
    lastMessage: 'درباره جلسه هفته آینده...',
    unread: 2,
    active: true
  },
  {
    id: '2',
    name: 'دکتر محمد احمدی',
    role: 'معاون آموزشی',
    lastMessage: 'لطفا گزارش دوره را ارسال کنید',
    unread: 0,
    active: false
  },
  {
    id: '3',
    name: 'گروه آموزش بالینی قلب',
    role: 'گروه',
    lastMessage: 'تغییرات برنامه کارآموزی',
    unread: 3,
    active: false
  }
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'دکتر سارا کریمی',
    content: 'سلام استاد، وقت بخیر. میخواستم درباره جلسه هفته آینده سوالی داشته باشم.',
    time: '۱۰:۳۰',
    isCurrentUser: false
  },
  {
    id: '2',
    sender: 'شما',
    content: 'سلام، بفرمایید در خدمتم.',
    time: '۱۰:۳۲',
    isCurrentUser: true
  },
  {
    id: '3',
    sender: 'دکتر سارا کریمی',
    content: 'آیا ژورنال کلاب هفته آینده به قوت خود باقی است؟ یا با توجه به همایش روز سه‌شنبه لغو شده؟',
    time: '۱۰:۳۳',
    isCurrentUser: false
  },
  {
    id: '4',
    sender: 'شما',
    content: 'خیر، ژورنال کلاب برگزار می‌شود. همایش تاثیری در برنامه ما ندارد. لطفاً مقالات را آماده کنید.',
    time: '۱۰:۳۵',
    isCurrentUser: true
  },
  {
    id: '5',
    sender: 'دکتر سارا کریمی',
    content: 'بسیار عالی، ممنون از پاسخگویی شما. من مقالات را آماده خواهم کرد.',
    time: '۱۰:۳۶',
    isCurrentUser: false
  }
];

const Chat = () => {
  const [contacts, setContacts] = useState<ChatContact[]>(SAMPLE_CONTACTS);
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'شما',
      content: newMessage,
      time: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'}),
      isCurrentUser: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulating a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'دکتر سارا کریمی',
        content: 'پیام شما دریافت شد. به زودی پاسخ خواهم داد.',
        time: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'}),
        isCurrentUser: false
      };
      
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleAttachment = () => {
    toast({
      title: "پیوست فایل",
      description: "قابلیت پیوست فایل در نسخه بعدی در دسترس خواهد بود"
    });
  };

  const handleContactSelect = (id: string) => {
    setContacts(
      contacts.map(contact => ({
        ...contact,
        active: contact.id === id,
        unread: contact.id === id ? 0 : contact.unread
      }))
    );
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-125px)] flex flex-col">
        <h1 className="text-2xl font-bold mb-4">چت و گفتگو</h1>
        
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Contact list */}
          <div className="hidden md:block w-64 bg-card rounded-md border overflow-hidden">
            <div className="p-3 border-b">
              <Input placeholder="جستجوی مخاطب..." className="text-sm" />
            </div>
            <div className="overflow-y-auto h-[calc(100%-56px)]">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-3 cursor-pointer border-b hover:bg-muted/50 transition-colors ${contact.active ? 'bg-muted' : ''}`}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ml-3">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                        {contact.unread > 0 && (
                          <span className="h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{contact.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-card rounded-md border overflow-hidden">
            {/* Chat header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ml-3">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">دکتر سارا کریمی</h3>
                  <p className="text-xs text-muted-foreground">گروه قلب</p>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-10 w-10 shrink-0"
                  onClick={handleAttachment}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea 
                  placeholder="پیام خود را بنویسید..."
                  className="min-h-10 max-h-20"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="h-10 shrink-0" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4 ml-2" />
                  ارسال
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
