import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqs = [
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept major credit and debit cards, PayPal, and other secure payment methods.'
    },
    // Add more FAQs here
  ];
}
