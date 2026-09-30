// CELL contacts. Willow gives you a whisperleaf; others add themselves.
import { S, flag, setFlag, onGenocide } from '../core/save.js';

const byRoom = () => S.room;

export const PHONE = [
  {
    id: 'willow', name: 'Willow',
    when: () => flag('hasPhone') && !flag('willowGone'),
    async call(w) {
      const r = byRoom();
      if (r.startsWith('h') && !flag('willowFought')) {
        const lines = flag('callWillow') ? ['Hello, little one. Are you being patient?', 'I will be back soon. Please do not wander.'] : ['Hello? This is Willow.', 'You called just to say hello? ...Oh, how lovely.', 'Remember: be kind to the monsters, and they will be kind to you. Mostly.'];
        setFlag('callWillow');
        return w.say('willow', lines);
      }
      if (flag('willowSpared') && !r.startsWith('h')) {
        return w.say('willow', ['...Hello? Is this... you?', 'I hope you are staying warm. Are you eating well?', 'I cannot follow you out there. But I think of you every day.']);
      }
      return w.narrate('* (No one answers. The leaf is quiet.)');
    },
  },
  {
    id: 'taper', name: 'Taper',
    when: () => flag('taperNumber'),
    async call(w) {
      if (onGenocide()) return w.narrate('* (No one answers.)');
      return w.say('taper', ['NYEH! HELLO, MY FRIEND! YOU CALLED THE GREAT TAPER!', 'I AM CURRENTLY WAXING MY BOOTS. IT IS A VERY IMPORTANT JOB.', 'CALL ME ANYTIME! I WILL ALWAYS PICK UP! (UNLESS I AM ASLEEP. OR COOKING. OR BRAVE.)']);
    },
  },
  {
    id: 'lotl', name: 'Dr. Lotl',
    when: () => flag('lotlNumber'),
    async call(w) {
      return w.say('lotl', ['o-oh! you called! um, hi!', 'i-i\'m watching the cameras. for your safety. not in a weird way!', 'if you get lost, uh, head for the big glowing pipes. probably.']);
    },
  },
];
