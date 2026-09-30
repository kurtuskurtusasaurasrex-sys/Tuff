// The echo inside your SOUL: a child who fell long ago. They speak at key
// moments, in their own voice. On a genocide run they go quiet, and
// someone else answers instead.
import { S, flag } from '../core/save.js';

const L = {
  wake: {
    determination: ['...Hey. You\'re awake.', 'You fell. So did I, once. I\'m Rue. I\'m in here with you now, like it or not.'],
    patience: ['...Easy. Don\'t sit up too fast.', 'My name is Ivo. I think I live in your heart now. That\'s alright. I don\'t take up much room.'],
    bravery: ['WHOA, what a fall! You okay? You\'re okay!', 'I\'m Tamsin! I\'m, uh, kind of a voice in your chest now. We\'re gonna be great friends.'],
    integrity: ['Good. You\'re breathing. Stand up slowly, and keep your back straight.', 'I am Odette. I fell here a long time ago. I suppose I am your company now.'],
    perseverance: ['Oh! Oh, you\'re awake. Okay. Okay, good. I had a list of things to say and I forgot all of it.', 'I\'m Fenn. I, um. Fell too. A while back.'],
    kindness: ['There you are, sweetheart. Nothing broken? Good.', 'I\'m Juniper. I\'ll be right here with you. Right in here.'],
    justice: ['Easy there, partner. Took a heck of a tumble.', 'Name\'s Colt. Reckon I\'m riding along in that heart of yours.'],
  },
  sprig: {
    determination: ['Don\'t touch those.', 'I don\'t care what it says. Don\'t.'],
    patience: ['...Wait. Don\'t take anything it offers.'],
    bravery: ['Uh, I don\'t like this guy. Dodge! DODGE!'],
    integrity: ['That flower is lying. I can hear it in its voice. Stay away from the seeds.'],
    perseverance: ['I wrote about this flower. The notes say: DON\'T.'],
    kindness: ['Oh, honey, no. Don\'t take candy from that one.'],
    justice: ['That flower\'s got a mean draw. Keep clear of its bullets.'],
  },
  willow: {
    determination: ['...Willow.', 'She took care of me, back when I fell. I never said goodbye.'],
    patience: ['...It\'s her. She used to read to me. Every night.'],
    bravery: ['WILLOW! It\'s Willow! She made me pie, and I told her I\'d come back...'],
    integrity: ['That is Willow. She was very kind to me. I was not always kind back.'],
    perseverance: ['Willow. Page one of my notebook is about her. It says "safe."'],
    kindness: ['Willow. She taught me to bake. Oh, I\'ve missed her.'],
    justice: ['Willow. Best cook in the Underground. Kept me out of trouble for a while.'],
  },
  willow_spared: {
    determination: ['...Thanks. For not hurting her.'],
    patience: ['...She recognized me. After all this time.'],
    bravery: ['She HUGGED us! Did you feel that? I felt that.'],
    integrity: ['That was the right thing to do. Thank you.'],
    perseverance: ['I\'m writing that down. "She was okay."'],
    kindness: ['She\'ll be alright now. She\'ll bake again.'],
    justice: ['That\'s how you settle a standoff. Well done.'],
  },
  willow_killed: {
    determination: ['...', 'Why.'],
    patience: ['...', '...I can\'t talk right now.'],
    bravery: ['No. No no no. Why did you DO that?'],
    integrity: ['That was wrong. You know it was wrong.'],
    perseverance: ['I can\'t... I can\'t write that down.'],
    kindness: ['Oh... oh, Willow...'],
    justice: ['That wasn\'t a fair fight and you know it.'],
  },
  frost: {
    determination: ['Snow. I built a fort out here once. It didn\'t last.'],
    patience: ['...It\'s so quiet out here. I like it.'],
    bravery: ['SNOW! Snowball fight! Wait, I don\'t have hands. Ugh.'],
    integrity: ['Careful. The ice is slippery. Small steps.'],
    perseverance: ['Snow. I lost a whole page of notes out here. Ink runs.'],
    kindness: ['Button up, love. It\'s cold.'],
    justice: ['Cold country. Keep your wits about you.'],
  },
  wick: {
    determination: ['That candle is watching us. Closely.'],
    patience: ['...He seems tired. I know that kind of tired.'],
    bravery: ['Ha! The hand-candle thing! I\'m stealing that.'],
    integrity: ['He smiles all the time. I don\'t think he means it every time.'],
    perseverance: ['He knows something. Put a question mark next to him.'],
    kindness: ['What a sweet, sleepy thing. Somebody should tuck him in.'],
    justice: ['That one\'s quicker than he lets on. Mark my words.'],
  },
  taper_spared: {
    determination: ['He\'s alright. Loud. But alright.'],
    patience: ['...He tried so hard. It was nice to watch.'],
    bravery: ['We\'re gonna be in his CLUB. I\'ve always wanted a club.'],
    integrity: ['He fights honestly. I respect that.'],
    perseverance: ['He never gives up either. I think I like him.'],
    kindness: ['What a dear boy. I hope someone makes him soup.'],
    justice: ['Now THAT\'S a fella with a good heart.'],
  },
  wishing: {
    determination: ['They used to wish on these, you know. The monsters.', 'I wished to go home. I didn\'t make it. Maybe you will.'],
    patience: ['...I sat here for hours, once. Just looking.', 'I don\'t remember what I wished for. Maybe that\'s better.'],
    bravery: ['WOW. It\'s like the sky! It\'s not the sky. But it\'s like it.', 'I wished to be brave enough to go home. Bit ironic.'],
    integrity: ['They are only crystals. But they are beautiful anyway.', 'I wished to dance on a real stage. Just once.'],
    perseverance: ['I counted them once. I got to three thousand and lost my place.', 'I wished I\'d written more letters home.'],
    kindness: ['Oh, it\'s just as lovely as I remember.', 'I wished everyone down here could see the real stars. Still do.'],
    justice: ['Now that\'s a sky worth riding under.', 'I wished for a fair shake. For everybody.'],
  },
  maris: {
    determination: ['She\'s strong. Stronger than me. Keep moving.'],
    patience: ['...Run. Please run.'],
    bravery: ['She\'s SO COOL. Also she\'s trying to kill us. RUN!'],
    integrity: ['She believes she\'s right. That makes her dangerous.'],
    perseverance: ['My notes on her just say RUN in big letters.'],
    kindness: ['She\'s frightened for her people. That\'s all. Run now, dear.'],
    justice: ['She\'s the law around here. Law\'s not always right.'],
  },
  lab: {
    determination: ['A lab. I don\'t like labs.'],
    patience: ['...Quiet in here. Too quiet.'],
    bravery: ['Screens! Buttons! Don\'t touch the buttons. Okay touch ONE button.'],
    integrity: ['A scientist. She seems... nervous. Like she\'s hiding something.'],
    perseverance: ['Oh, I like her. She takes notes too.'],
    kindness: ['That poor thing hasn\'t slept in days. You can tell.'],
    justice: ['Watch what she\'s not saying.'],
  },
  capital: {
    determination: ['I remember this city. It was grey then too.'],
    patience: ['...We\'re close now. I can feel the others.'],
    bravery: ['The capital! We made it! Oh. Oh, it\'s really quiet.'],
    integrity: ['The King lives here. Stand up straight.'],
    perseverance: ['Last chapter. I think.'],
    kindness: ['So many empty houses. Everyone must be so scared.'],
    justice: ['End of the trail, partner. Let\'s see it through.'],
  },
  coffins: {
    determination: ['...That one has my ribbon on it.', 'So that\'s where I ended up. Huh.'],
    patience: ['...That one is mine.', 'It\'s alright. It was a long time ago.'],
    bravery: ['Hey. That one\'s... that\'s mine. Those are my gloves.', 'Weird. Don\'t look at it too long, okay?'],
    integrity: ['My slippers. On that one.', 'I suppose I should say something. I can\'t think of anything.'],
    perseverance: ['My notebook. They kept my notebook.', 'I wonder if they read it.'],
    kindness: ['My apron, folded so neatly.', 'Someone cared, at the end. That\'s something.'],
    justice: ['My hat. Well. That settles that.', 'Let\'s go, partner. Nothing left for me here.'],
  },
  hall: {
    determination: ['Whatever he asks you, answer it true.'],
    patience: ['...This is the place where everything gets weighed.'],
    bravery: ['It\'s so GOLD. And so scary.'],
    integrity: ['Stand straight. Tell the truth. That\'s all we can do.'],
    perseverance: ['I think this is the part where the book looks back at you.'],
    kindness: ['Whatever happens, I\'m proud of you.'],
    justice: ['Judgment day. Hold your head up.'],
  },
  king: {
    determination: ['He\'s the one who kept the others. In jars.', 'I don\'t hate him. I don\'t know why.'],
    patience: ['...He looks so sad.'],
    bravery: ['He\'s HUGE. Okay. Okay. We can do this.'],
    integrity: ['He is not a monster. Not like that. Remember that.'],
    perseverance: ['I never got to the end of his chapter. Let\'s find out.'],
    kindness: ['Oh, that poor, poor man.'],
    justice: ['He did what he thought was right. Doesn\'t make it right.'],
  },
  geno1: {
    determination: ['Stop. That\'s enough.'],
    patience: ['...Please don\'t do that again.'],
    bravery: ['Hey. HEY. That\'s not what being brave is.'],
    integrity: ['This is wrong. You know it is wrong.'],
    perseverance: ['I don\'t want to write this part.'],
    kindness: ['Sweetheart, please. Please stop.'],
    justice: ['This isn\'t justice. This is just killing.'],
  },
  geno2: {
    determination: ['I won\'t let you use me for this.'],
    patience: ['...I can\'t stay if you keep doing this.'],
    bravery: ['I\'m scared. I\'m actually scared of you.'],
    integrity: ['I am ashamed to be your SOUL.'],
    perseverance: ['I\'m closing the book. I\'m sorry.'],
    kindness: ['I love you. I can\'t watch this.'],
    justice: ['I\'m done riding with you, partner.'],
  },
  geno_gone: {
    all: ['...', '(The warmth in your chest goes cold.)', '(Someone else is there now.)'],
  },
};

const WREN = {
  frost: ['Snow. How nostalgic.'],
  wick: ['He knows. Good.'],
  wishing: ['People used to wish on these. How pointless.'],
  maris: ['Let her come.'],
  lab: ['...'],
  capital: ['Home.'],
  coffins: ['Six. Soon seven.'],
  hall: ['Let\'s finish this.'],
  king: ['Hello, father.'],
};

export function echoLine(key) {
  if (flag('echoGone')) {
    const w = WREN[key];
    return w ? { spk: 'wren', pages: w } : null;
  }
  const entry = L[key];
  if (!entry) return null;
  const pages = entry.all || entry[S.soul];
  return pages ? { spk: 'echo', pages } : null;
}
