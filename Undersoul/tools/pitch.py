import sys, wave, numpy as np
w = wave.open(sys.argv[1]); sr = w.getframerate(); n = w.getnframes()
x = np.frombuffer(w.readframes(n), dtype=np.int16).reshape(-1, 2).astype(np.float32).mean(axis=1)
names = sys.argv[2].split(','); each = 1.5
for i, nm in enumerate(names):
    seg = x[int((0.12 + i*each)*sr): int((0.12 + i*each)*sr) + 16384]
    seg = seg * np.hanning(len(seg))
    sp = np.abs(np.fft.rfft(seg, 65536*2)); f = np.fft.rfftfreq(65536*2, 1/sr)
    band = (f > 100) & (f < 2000)
    # harmonic product spectrum for fundamental
    hps = sp.copy()
    for h in (2,3):
        d = sp[::h]; hps[:len(d)] *= d
    b2 = (f > 200) & (f < 1000)
    f0 = f[b2][np.argmax(hps[b2])]
    pk = f[band][np.argmax(sp[band])]
    print(f"{nm:10s} strongest {pk:7.1f} Hz   f0(hps) {f0:7.1f} Hz  cents vs 440: {1200*np.log2(f0/440):+.1f}")
