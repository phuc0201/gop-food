import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import slugify from 'slugify';
import { ChatbotResponse } from 'src/app/core/models/chatbot/chatbot-response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatbotService } from 'src/app/core/services/chatbot.service';
import { selectProfile } from 'src/app/core/store/profile/profile.selectors';
@Component({
  selector: 'app-floating-chatbot',
  templateUrl: './floating-chatbot.component.html',
  styleUrls: ['./floating-chatbot.component.scss']
})
export class FloatingChatbotComponent {
  @ViewChild('chatBoxBody') chatBoxBody!: ElementRef<HTMLElement>;
  @ViewChild('chatInput') chatInput!: ElementRef<HTMLElement>;

  isOpenChatBox: boolean = false;
  newMessage: string = '';
  messages: ChatbotResponse[] = [];
  customerAvt: string = '';
  isThinking: boolean = false;
  dummyData = {
    sender: 'bot',
    message: "Ở Tạp hóa UTE có món xôi gà nấm mini, giá 45.000đ. Bạn có muốn thử không?",
    restaurants: [
      {
        restaurant_id: "6640631fc9edf07952c1683e",
        restaurant_avatar: "https://media.be.com.vn/bizops/image/9de765b8-f3b9-11ed-99ae-5e8316b9abf2/original",
        restaurant_name: "Tạp hóa UTE",
        foodItems: [
          {
            id: "66e99b0e50708d7a9dfa12c8",
            name: "Xôi gà nấm mini",
            price: 45000,
            image: "https://storage.googleapis.com/gop-system.appspot.com/66e99b0e50708d7a9dfa12c8"
          }
        ]
      },
      {
        restaurant_id: "6640631fc9edf07952c1683a",
        restaurant_avatar: "https://media.be.com.vn/bizops/image/9de765b8-f3b9-11ed-99ae-5e8316b9abf2/original",
        restaurant_name: "Tạp hóa UTE",
        foodItems: [
          {
            id: "66e99b0e50708d7a9dfa12c8",
            name: "Xôi gà nấm mini",
            price: 45000,
            image: "https://storage.googleapis.com/gop-system.appspot.com/66e99b0e50708d7a9dfa12c8"
          }
        ]
      },
      {
        restaurant_id: "6640631fc9edf07952c1683c",
        restaurant_avatar: "https://media.be.com.vn/bizops/image/9de765b8-f3b9-11ed-99ae-5e8316b9abf2/original",
        restaurant_name: "Tạp hóa UTE",
        foodItems: [
          {
            id: "66e99b0e50708d7a9dfa12c8",
            name: "Xôi gà nấm mini",
            price: 45000,
            image: "https://storage.googleapis.com/gop-system.appspot.com/66e99b0e50708d7a9dfa12c8"
          }
        ]
      }
    ]
  };
  constructor(
    private store: Store,
    private authService: AuthService,
    private ChatbotService: ChatbotService
  ) { }

  ngOnInit(): void {
    this.store.select(selectProfile)
      .subscribe({
        next: res => {
          if (res.profile._id !== '') {
            this.customerAvt = res.profile.avatar;
          }
        }
      });
  }

  toggleChatbot() {
    this.isOpenChatBox = !this.isOpenChatBox;
    if (this.isOpenChatBox) {
      if (this.messages.length <= 1) {
        this.messages = [];
        if (!this.authService.isLogged()) {
          this.messages.push({
            message: 'Đăng nhập đi rồi em hổ trợ cho',
            sender: 'bot',
          });
        }
        else {
          this.messages.push({
            message: 'Hôm nay bạn muốn ăn gì?',
            sender: 'bot',
          });
        }
      }

      this.scrollToBottom();
    }
  }

  sendMessage() {
    this.isThinking = true;
    this.scrollToBottom();

    if (!this.authService.isLogged()) {
      this.messages.push({
        message: this.newMessage,
        sender: 'user',
      });
      this.messages.push({
        message: 'Đăng nhập đi rồi em hổ trợ cho',
        sender: 'bot',
      });
      this.isThinking = false;
      this.newMessage = '';
      return;
    }

    if (this.newMessage.trim() !== '') {
      this.messages.push({
        message: this.newMessage,
        sender: 'user',
      });

      this.ChatbotService.sendMessage(this.newMessage).subscribe({
        next: (res) => {
          if (res.message !== '') {
            this.isThinking = false;
            this.messages.push({
              message: res.message,
              sender: 'bot',
              restaurants: res.restaurants,
            });

            this.scrollToBottom();
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (window.innerWidth > 768) {
        this.chatInput.nativeElement.focus();
      }
      this.chatBoxBody.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.chatBoxBody.nativeElement.scrollTop = this.chatBoxBody.nativeElement.scrollHeight;
      this.newMessage = '';
    }, 100);
  }

  convertToSlug(name: string, id: string): string {
    return slugify(name, {
      lower: true,
      strict: true,
      locale: 'vi'
    }) + '-' + id;
  }
}
