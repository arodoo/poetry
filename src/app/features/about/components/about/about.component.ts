import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AboutUsScrollAnimationLeavingDirective } from '../../../../shared/directives/about-us/about-us-scroll-animation-leaving.directive';
import { AboutUsScrollAnimationDirective } from '../../../../shared/directives/about-us/about-us-scroll-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, 
    AboutUsScrollAnimationDirective,
    AboutUsScrollAnimationLeavingDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private isBrowser: boolean;
  animationsEnabled = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  team = [
    {
      name: 'Leadership Team',
      description: 'Guiding the company vision and strategy.',
      icon: 'fa-users-cog'
    },
    {
      name: 'Community Team',
      description: 'Connecting with clients and fostering relationships.',
      icon: 'fa-handshake'
    },
    {
      name: 'Technical Team',
      description: 'Delivering reliable and innovative solutions.',
      icon: 'fa-laptop-code'
    }
  ];

  ngOnInit() {
    if (!this.isBrowser) return;
    this.animationsEnabled = true;
  }
}