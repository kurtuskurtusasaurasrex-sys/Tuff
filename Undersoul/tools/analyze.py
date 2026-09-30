# python3 tools/analyze.py file.wav [...]  -> levels + spectrogram png
import sys, wave, numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
for fn in sys.argv[1:]:
    w = wave.open(fn)
    sr = w.getframerate(); n = w.getnframes(); ch = w.getnchannels()
    x = np.frombuffer(w.readframes(n), dtype=np.int16).reshape(-1, ch).astype(np.float32) / 32768
    mono = x.mean(axis=1)
    peak = np.abs(x).max()
    rms = np.sqrt((mono ** 2).mean())
    clip = (np.abs(x) > 0.99).sum()
    silent = (np.abs(mono) < 1e-4).mean()
    # per-second loudness
    secs = [20*np.log10(np.sqrt((mono[i*sr:(i+1)*sr]**2).mean())+1e-9) for i in range(n//sr)]
    print(f"{fn}: peak {peak:.3f} rms {20*np.log10(rms+1e-9):.1f} dBFS clipped {clip} silent {silent*100:.1f}%  sec-dB " + ' '.join(f"{s:.0f}" for s in secs[:40]))
    fig, ax = plt.subplots(figsize=(14, 5))
    ax.specgram(mono, NFFT=4096, Fs=sr, noverlap=2048, cmap='magma', vmin=-120)
    ax.set_ylim(0, 5000); ax.set_title(fn)
    fig.savefig(fn.replace('.wav', '.png'), dpi=70); plt.close(fig)
