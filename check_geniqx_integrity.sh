#!/bin/bash
echo "🧠 Validating GENIQX Integrity..."
for mod in AdminCore MusicAI NeuroMatch PayCoreX Tutorium Nuvexa ForgetMe CreatorAI VaultX; do
  echo "📦 Checking $mod..."
  [ -d "$mod/frontend" ] && echo "✅ Frontend found for $mod"
  [ -d "$mod/backend" ] && echo "✅ Backend found for $mod"
done
echo "🎯 Full GENIQX structure checked."
chmod +x check_geniqx_integrity.sh
./check_geniqx_integrity.sh
pkg install golang
go install github.com/digitalocean/doctl@latest
cp ~/go/bin/doctl $PREFIX/bin

