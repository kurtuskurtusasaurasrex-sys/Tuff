#!/usr/bin/env python3
"""Bit-crush an audio file (quantize + sample-and-hold), then encode to MP3.

ffmpeg's `acrusher` filter proved unreliable for the bit-depth part in the build we have
(identical output for bits=4 and bits=6), so we do the crush ourselves in numpy and use
ffmpeg only for decoding/encoding.

usage: bitcrush.py in.mp3 out.mp3 [bits=6] [hold=4]
"""
import subprocess, sys, tempfile, os, wave
import numpy as np

src, dst = sys.argv[1], sys.argv[2]
bits = int(sys.argv[3]) if len(sys.argv) > 3 else 6
hold = int(sys.argv[4]) if len(sys.argv) > 4 else 4

with tempfile.TemporaryDirectory() as td:
    raw, crushed = os.path.join(td, 'raw.wav'), os.path.join(td, 'crushed.wav')
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-vn',
                    '-ar', '44100', '-ac', '2', '-sample_fmt', 's16', raw], check=True)
    w = wave.open(raw)
    a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2).astype(np.float64) / 32768.0
    w.close()
    # sample-and-hold downsample (zero-order hold, no anti-alias filter => gritty aliasing)
    n = (len(a) // hold) * hold
    a = a[:n]
    held = np.repeat(a[::hold], hold, axis=0)
    # quantize to `bits` bits (signed => 2**bits levels)
    half = 2 ** (bits - 1)
    q = np.clip(np.round(held * (half - 1)), -(half - 1), half - 1) / (half - 1)
    out = (q * 32767 * 0.9).astype(np.int16)  # slight headroom so MP3 encode doesn't clip
    w = wave.open(crushed, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(44100)
    w.writeframes(out.tobytes()); w.close()
    print('levels per channel after crush:', [len(np.unique(out[:, c])) for c in (0, 1)], '(max', 2 ** bits, ')')
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', crushed,
                    '-c:a', 'libmp3lame', '-b:a', '192k', dst], check=True)
print('wrote', dst, os.path.getsize(dst), 'bytes')
