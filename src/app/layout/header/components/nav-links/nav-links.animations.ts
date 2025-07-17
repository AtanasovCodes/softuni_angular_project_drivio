import { trigger, state, style, transition, animate } from '@angular/animations';

export const menuSlide = trigger('menuSlide', [
  state(
    'closed',
    style({
      height: '0',
      opacity: 0,
      overflow: 'hidden',
      transform: 'translateY(-100px)',
    })
  ),
  state(
    'open',
    style({
      opacity: 1,
      height: '100vh',
      overflow: 'hidden',
      transform: 'translateY(0)',
    })
  ),
  transition('closed => open', [animate('300ms ease-out')]),
  transition('open => closed', [animate('200ms ease-in')]),
]);
