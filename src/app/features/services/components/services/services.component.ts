import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ServicesCardsScrollAnimationDirective } from '../../../../shared/directives/services/services-cards-scroll-animation.directive';

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [CommonModule, ServicesCardsScrollAnimationDirective]
})
export class ServicesComponent implements OnInit {
  private isBrowser: boolean;
  animationsEnabled = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  serviceCards: ServiceCard[] = [
    {
      id: 1,
      title: 'Custom Software Solutions',
      description: 'Modern, scalable applications tailored for your business needs. From SaaS platforms to internal tools, we deliver robust solutions.',
      icon: 'fa-laptop-code',
      imageUrl: 'assets/images/services/web-fullstack.jpg'
    },
    {
      id: 2,
      title: 'Platform Engineering',
      description: 'Design and development of secure, reliable platforms with seamless integration and automated deployment pipelines.',
      icon: 'fa-cloud',
      imageUrl: 'assets/images/services/saas-development.jpg'
    },
    {
      id: 3,
      title: 'Data Management',
      description: 'Efficient database modeling, optimization, and management for data-driven organizations and business-critical systems.',
      icon: 'fa-database',
      imageUrl: 'assets/images/services/database.jpg'
    },
    {
      id: 4,
      title: 'Quality Assurance & Testing',
      description: 'Comprehensive testing strategies to ensure software reliability and performance, using industry-standard tools and practices.',
      icon: 'fa-shield-alt',
      imageUrl: 'assets/images/services/testing.jpg'
    },
    {
      id: 5,
      title: 'API & Systems Integration',
      description: 'Secure API development and integration for fast, scalable, and reliable communication across your business systems.',
      icon: 'fa-plug',
      imageUrl: 'assets/images/services/api-integration.jpg'
    },
    {
      id: 6,
      title: 'Business Process Automation',
      description: 'Automate recurring business operations to drive efficiency and growth through smart, reliable backend systems.',
      icon: 'fa-cogs',
      imageUrl: 'assets/images/services/automation.jpg'
    }
  ];


  ngOnInit() {
    if (!this.isBrowser) return;
    this.animationsEnabled = true;
  }
}