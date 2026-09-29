import re, sys, subprocess, tempfile, os
html = open(sys.argv[1], encoding='utf-8').read()
blocks = re.findall(r'<script>(.*?)</script>', html, re.S)
game = blocks[-1]
fd, path = tempfile.mkstemp(suffix='.js'); os.write(fd, game.encode()); os.close(fd)
r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
print('syntax OK' if r.returncode == 0 else r.stderr[:3000])
os.unlink(path)
